// src/api.js

import mockData from './mock-data';

export const getAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token');

  const checkToken = async (accessToken) => {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
    );
    const result = await response.json();
    return result?.error ? null : accessToken;
  };

  const getToken = async (code) => {
    const encodeCode = encodeURIComponent(code);
    const response = await fetch(
      'https://atik9avc2l.execute-api.us-east-1.amazonaws.com/dev/api/token' + '/' + encodeCode
    );
    const { access_token } = await response.json();
    if (access_token) {
      localStorage.setItem("access_token", access_token);
    }
    return access_token;
  };

  // Check if accessToken is valid
  if (accessToken) {
    const validToken = await checkToken(accessToken);
    if (validToken) return validToken;
  }

  // Get token from OAuth process if no valid token
  const code = new URLSearchParams(window.location.search).get('code');
  if (code) {
    return await getToken(code);
  }

  // Redirect to OAuth if no token and no code
  if (!accessToken && !code) {
    const authUrl = 'https://atik9avc2l.execute-api.us-east-1.amazonaws.com/dev/api/get-auth-url';
    window.location.href = authUrl;
  }
};

/**
 * Extracts unique locations from events.
 */
export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};

/**
 * Fetches the list of all events.
 */
export const getEvents = async () => {
  if (window.location.href.startsWith('http://localhost')) {
    return mockData;
  }

  const token = await getAccessToken();

  const removeQuery = () => {
    if (window.history.pushState && window.location.pathname) {
      const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
      window.history.pushState("", "", newUrl);
    }
  };

  if (token) {
    removeQuery();
    const url = "https://atik9avc2l.execute-api.us-east-1.amazonaws.com/dev/api/get-events" + "/" + token;
    const response = await fetch(url);
    const result = await response.json();
    console.log("API fetch result:", result);  
    return result?.events || [];
  } else {
    console.error("Failed to retrieve token for events");
    return [];
  }
};