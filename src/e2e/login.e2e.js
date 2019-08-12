import puppeteer from 'puppeteer';

describe('Login', () => {
  it('should login with failure', async () => {
    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      defaultViewport: { width: 1920, height: 960 },
    });
    const page = await browser.newPage();
    await page.goto('http://localhost:8000/user/login');
    await page.type('#username', 'admin');
    await page.type('#password', 'wrong12_password');
    await page.click('button[type="submit"]');
    await page.waitForSelector('.ant-notification-notice-with-icon'); // should display error
    await page.waitFor(100).then(async () => {
      // 截图
      await page.screenshot({ path: 'edit.png' });
    });
    await page.close();
    browser.close();
  });
});
