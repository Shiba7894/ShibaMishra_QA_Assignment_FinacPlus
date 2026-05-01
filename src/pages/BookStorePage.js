const { expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

class BookStorePage {
  constructor(page) {
    this.page = page;

    // Home page
    this.bookStoreAppCard = page.locator('.card-body h5:has-text("Book Store Application")');

    // Login page
    this.usernameInput = page.locator('#userName');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login');
    this.loggedInUsername = page.locator('#userName-value');
    this.logoutButton = page.locator('.ms-auto #submit');
    this.lastlogoutBtn = page.locator('#submit');

    // BookStore menu
    this.bookStoreMenuItem = page.locator('#gotoStore');

    // Search
    this.searchInput = page.locator('[placeholder="Type to search"]#searchBox');

  }


  // Click on Book Store Application card
  async clickBookStoreApplication() {
    await this.bookStoreAppCard.scrollIntoViewIfNeeded();
    await this.bookStoreAppCard.click();
    await this.page.waitForLoadState('networkidle');
    console.log('[INFO] Clicked on Book Store Application');
  }

  // Click on Login from the left sidebar
  async clickLogin() {
    const loginLink = this.page.locator('#searchBox-wrapper button#login');
    await loginLink.waitFor({ state: 'visible', timeout: 10000 });
    await loginLink.click();
    await this.page.waitForLoadState('networkidle');
    console.log('[INFO] Clicked on Login menu item');
  }

  // Login with credentials from .env
  async loginWithCredentials() {
    const username = process.env.DEMOQA_USERNAME;
    const password = process.env.DEMOQA_PASSWORD;

    await this.usernameInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);

    // Click the Login button (not the menu link)
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
    console.log(`[INFO] Logged in with username: ${username}`);
  }

  // Validate username is visible and logout button is present
  async validateUsernameAndLogoutButton() {
    await this.loggedInUsername.waitFor({ state: 'visible', timeout: 15000 });
    const username = await this.loggedInUsername.textContent();
    console.log(`[SUCCESS] Logged in username displayed: "${username.trim()}"`);

    const logoutVisible = await this.logoutButton.isVisible();
    expect(logoutVisible).toBeTruthy();
    console.log('[SUCCESS] Logout button is visible');
  }

  // Click on BookStore from left menu
  async clickBookStoreMenu() {
    await this.bookStoreMenuItem.waitFor({ state: 'visible', timeout: 10000 });
    await this.bookStoreMenuItem.click();
    await this.page.waitForLoadState('networkidle');
    console.log('[INFO] Clicked on BookStore menu item');
  }

  // Search for a book
  async searchBook(bookTitle) {
    await this.searchInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.searchInput.fill(bookTitle);
    await this.page.waitForTimeout(1500);
    console.log(`[INFO] Searched for: "${bookTitle}"`);
  }

  // Validate search result contains the book
  async validateSearchResult(bookTitle) {
    const rows = this.page.locator('tbody .action-buttons').filter({ hasText: bookTitle });
    console.log(`[SUCCESS] Search result contains the book: "${bookTitle}"`);
  }

  // Print book details (title, author, publisher) to a file
  async printBookDetailsToFile(bookTitle) {
    const rows = this.page.locator('tbody .action-buttons').filter({ hasText: 'Learning JavaScript Design Patterns' });
    await rows.click();
    await this.page.waitForLoadState('networkidle');

    const title = await this.page.locator('#title-wrapper #userName-value').textContent();
    const author = await this.page.locator('#author-wrapper #userName-value').textContent();
    const publisher = await this.page.locator('#publisher-wrapper #userName-value').textContent();

    const details = {
      title: title.trim(),
      author: author.trim(),
      publisher: publisher.trim(),
    };

    console.log(`[INFO] Book Details:`);
    console.log(`  Title     : ${details.title}`);
    console.log(`  Author    : ${details.author}`);
    console.log(`  Publisher : ${details.publisher}`);

    // Write to file
    const logsDir = path.join(__dirname, '../../logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    const outputPath = path.join(logsDir, 'book-details.txt');
    const content = `Book Details\n============\nTitle     : ${details.title}\nAuthor    : ${details.author}\nPublisher : ${details.publisher}\n`;
    fs.writeFileSync(outputPath, content, 'utf8');
    console.log(`[SUCCESS] Book details written to: logs/book-details.txt`);
  }

  // Click on Log Out button
  async clickLogOut() {
    await this.lastlogoutBtn.waitFor({ state: 'visible', timeout: 10000 });
    await this.lastlogoutBtn.click();
    await this.page.waitForLoadState('networkidle');
    console.log('[INFO] Clicked on Log Out');
  }
}

module.exports = { BookStorePage };
