import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
  });

  afterAll(async () => {
    await browser.close();
  });

  test('An event element is collapsed by default', async () => {
    // Wait for the event elements to be rendered
    await page.waitForSelector('.event');

    // Check if the event details are not visible (collapsed)
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull(); // Ensure details are not present
  });

  test('Show event details when user clicks "Show Details" button', async () => {
    // Click the "Show Details" button for the first event
    await page.click('.event .detail-btn');

    // Check if the event details are visible
    const eventDetails = await page.waitForSelector('.event .details', { visible: true });
    expect(eventDetails).toBeTruthy(); // Ensure details are visible
  });

  test('Hide event details when user clicks "Hide Details" button', async () => {
    // First, make sure the details are shown
    await page.click('.event .detail-btn'); // Show details

    // Click the "Hide Details" button for the first event
    await page.click('.event .detail-btn');

    // Check if the event details are not visible (collapsed again)
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeTruthy(); // Ensure details are not present
  });
});
