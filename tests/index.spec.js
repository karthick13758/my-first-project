import { test, expect } from '@playwright/test';

test('Login, Verify Dashboard, and Logout - Exam Taker Flow', async ({ page }) => {
  // Step 1: Open the exam login page
  await page.goto('https://digiscreener-staging.gcp.digivalitsolutions.com/fullscreenexam/index.html');
  await page.waitForTimeout(2000); // Wait for the page to fully load

  // Step 2: Toggle the language switch twice (optional)
  await page.locator('#login-form > .toggle-switch-lang > .slider').click();
  await page.waitForTimeout(500);
  await page.locator('#login-form > .toggle-switch-lang > .slider').click();
  await page.waitForTimeout(500);

  // Step 3: Enter and select College Code
  await page.getByRole('textbox', { name: 'College Code' }).click();
  await page.getByRole('textbox', { name: 'College Code' }).fill('digi');
  await page.waitForTimeout(1000); // Wait for dropdown to appear
  await page.getByText('digi - digiVal').click();
  await page.waitForTimeout(1000);

  // Step 4: Click "Go Send" to proceed
  await page.getByRole('button', { name: 'Go Send' }).click();
  await page.waitForTimeout(2000); // Wait for next form

  // Step 5: Toggle language switch again (optional)
  await page.locator('#login-form > .toggle-switch-lang > .slider').click();
  await page.waitForTimeout(500);
  await page.locator('#login-form > .toggle-switch-lang > .slider').click();
  await page.waitForTimeout(500);

  // Step 6: Enter Email Address
  await page.getByRole('textbox', { name: 'Email address' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('karthick13758@gmail.com');
  await page.waitForTimeout(500);
  await page.getByRole('textbox', { name: 'Email address' }).press('Tab');
  await page.waitForTimeout(500);

  // Step 7: Enter Password
  await page.getByRole('textbox', { name: 'Password' }).fill('123');
  await page.waitForTimeout(500);

  // Step 8: Toggle password visibility (eye icon)
  await page.locator('#step2 i').nth(2).click();
  await page.waitForTimeout(300);
  await page.locator('#step2 i').nth(2).click();
  await page.waitForTimeout(300);

  // Step 9: Click "Login"
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForTimeout(3000); // Wait for login to complete

  // Step 10: Click checkbox (maybe terms agreement)
  await page.locator('label span').click();
  await page.waitForTimeout(500);
  await page.locator('label span').click();
  await page.waitForTimeout(1000);

  // Step 11: Verify that dashboard (Exam Maker link) is visible
  await expect(page.getByRole('link', { name: ' Exam Maker For faculty to' })).toBeVisible();
  await page.waitForTimeout(1000);

  // Step 12: Click checkbox (maybe confirmation)
  await page.locator('.bx').first().click();
  await page.waitForTimeout(1000);

  // Step 13: Logout
await page.waitForSelector('#logout-button', { state: 'visible', timeout: 10000 });
await page.locator('#logout-button').click();
await page.waitForTimeout(3000);

  // Step 14: Click "Back" button after logout
  await page.getByRole('button', { name: 'Back' }).click();
  await page.waitForTimeout(1000);
},{ timeout: 60000 });
