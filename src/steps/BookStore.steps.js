require('dotenv').config();
const { Given, When, Then, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const { BookStorePage } = require('../pages/BookStorePage');

setDefaultTimeout(60000);

let browser;
let page;
let bookStorePage;

Before(async function () {
  browser = await chromium.launch({
    headless: process.env.HEADLESS !== 'false',
    channel: 'chrome',
    args: ['--start-maximized'],
  });
  const context = await browser.newContext({ viewport: null });
  page = await context.newPage();

  // ← ADD THIS BLOCK HERE
  await page.route('**/*', (route) => {
    const url = route.request().url();
    const blockedDomains = [
      'googlesyndication.com',
      'googletagmanager.com',
      'doubleclick.net',
      'adnxs.com',
      'amazon-adsystem.com',
      'scorecardresearch.com',
      'google-analytics.com',
    ];
    if (blockedDomains.some((domain) => url.includes(domain))) {
      route.abort();
    } else {
      route.continue();
    }
  });
  // ← END OF BLOCK

  bookStorePage = new BookStorePage(page);
});

After(async function (scenario) {
  if (scenario.result.status === 'FAILED') {
    const screenshot = await page.screenshot();
    this.attach(screenshot, 'image/png');
  }
  if (browser) {
    await browser.close();
  }
});

// ====================== STEP DEFINITIONS ======================

Given('I navigate to {string} home page', async function (url) {
  await page.goto(url);
  await page.waitForLoadState('networkidle');
  console.log(`[INFO] Navigated to: ${url}`);
});

When('I click on Book Store Application', async function () {
  await bookStorePage.clickBookStoreApplication();
});

When('I click on Login', async function () {
  await bookStorePage.clickLogin();
});

When('I login with valid credentials', async function () {
  await bookStorePage.loginWithCredentials();
});

Then('the username and logout button should be visible', async function () {
  await bookStorePage.validateUsernameAndLogoutButton();
});

When('I click on the BookStore menu item', async function () {
  await bookStorePage.clickBookStoreMenu();
});

When('I search for {string}', async function (bookTitle) {
  await bookStorePage.searchBook(bookTitle);
});

Then('the search results should contain the book {string}', async function (bookTitle) {
  await bookStorePage.validateSearchResult(bookTitle);
});

Then('I print the book title, author and publisher to a file', async function () {
  await bookStorePage.printBookDetailsToFile('Learning JavaScript Design Patterns');
});

When('I click on Log Out', async function () {
  await bookStorePage.clickLogOut();
});