import { test, expect } from '@playwright/test';

test('Exam Taker Login Flow with Email and Password Correction', async ({ page }) => {
  // Step 1: Open the login page
  await page.goto('https://digiscreener-staging.gcp.digivalitsolutions.com/fullscreenexam/index.html');
  await page.waitForLoadState('networkidle'); // Wait for page fully loaded (better than fixed 2000ms)

  // Step 2: Toggle language switch twice (optional)
  await page.locator('#login-form > .toggle-switch-lang > .slider').click();
  await page.locator('#login-form > .toggle-switch-lang > .slider').click();

  // Step 3: Click Go Send without entering college code (to test validation)
  await page.getByRole('button', { name: 'Go Send' }).click();
  await page.waitForTimeout(500); // reduced from 1000ms

  // Step 4: Enter incorrect college code first
  await page.getByRole('textbox', { name: 'College Code' }).fill('enter the college code');
  await page.getByRole('button', { name: 'Go Send' }).click();
  await page.waitForTimeout(500);

  // Step 5: Correct the college code
  await page.getByRole('textbox', { name: 'College Code' }).fill('digi');
  // wait for dropdown to appear - better than fixed wait
  await page.getByText('digi - digiVal').waitFor({ state: 'visible' });
  await page.getByText('digi - digiVal').click();

  // Step 6: Click Go Send again
  await page.getByRole('button', { name: 'Go Send' }).click();
  await page.getByRole('button', { name: 'Login' }).waitFor({ state: 'visible' }); // wait for next form

  // Step 7: Toggle language switch again twice (optional)
  await page.locator('#login-form > .toggle-switch-lang > .slider').click();
  await page.locator('#login-form > .toggle-switch-lang > .slider').click();

  // Step 8: Try login without entering details (to test validation)
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForTimeout(500);

  // Step 9: Enter incorrect email
  await page.getByRole('textbox', { name: 'Email address' }).fill('karthickgmail.com');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForTimeout(500);

  // Step 10: Correct the email
  await page.getByRole('textbox', { name: 'Email address' }).fill('karthick13758@gmail.com');
  await page.waitForTimeout(300);

  // Step 11: Click Login (still missing password)
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForTimeout(500);

  // Step 12: Enter incorrect password
  await page.getByRole('textbox', { name: 'Password' }).fill('12345@#$');
  await page.waitForTimeout(300);

  // Step 13: Toggle password visibility twice
  await page.locator('#step2 i').nth(2).click();
  await page.locator('#step2 i').nth(2).click();
  await page.waitForTimeout(300);

  // Step 14: Try login with wrong password
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForTimeout(1000);

  // Step 15: Enter correct password
  await page.getByRole('textbox', { name: 'Password' }).fill('123');
  await page.getByRole('button', { name: 'Login' }).click();
  // wait for some indicator of login success if possible here, else small wait
  await page.waitForTimeout(1500);

  // Step 16: Click agreement checkbox twice
  await page.locator('label span').click();
  await page.locator('label span').click();
  await page.waitForTimeout(500);

  // Step 17: Confirm checkbox selection
  await page.locator('.bx').first().click();
  await page.waitForTimeout(500);

  // Step 18: Logout
  await page.locator('#logout-button').click();
  // Wait for "Back" button to appear instead of fixed timeout
  await page.getByRole('button', { name: 'Back' }).waitFor({ state: 'visible' });

  // Step 19: Click "Back" after logout
  await page.getByRole('button', { name: 'Back' }).click();
  await page.waitForTimeout(500);
}, { timeout: 60000 });

