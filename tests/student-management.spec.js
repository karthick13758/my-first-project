import { test, expect } from '@playwright/test';

test('Login, Add Student, and Delete Student in Exam Maker', async ({ page }) => {
  // 1. Go to Fullscreen Exam login page
  await page.goto('https://digiscreener-staging.gcp.digivalitsolutions.com/fullscreenexam/');
  await page.waitForTimeout(1000);

  // 2. Enter College Code and click Go
  await page.getByRole('textbox', { name: 'College Code' }).fill('digi');
  await page.waitForTimeout(500);
  await page.getByRole('button', { name: 'Go Send' }).click();

  // 3. Enter Email and Password
  await page.getByRole('textbox', { name: 'Email address' }).fill('karthick13758@gmail.com');
  await page.waitForTimeout(500);
  await page.getByRole('textbox', { name: 'Password' }).fill('123');
  await page.waitForTimeout(300);

  // 4. Toggle password visibility (optional)
  await page.locator('#step2 i').nth(2).click();
  await page.waitForTimeout(200);
  await page.locator('#step2 i').nth(2).click();
  await page.waitForTimeout(500);

  // 5. Click Login
  await page.getByRole('button', { name: 'Login' }).click();

  // 6. Wait for popup and switch to Exam Maker window
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: ' Exam Maker For faculty to' }).click();
  const page1 = await page1Promise;
  await page1.waitForLoadState();

  // 7. Navigate to Student Management
  await page1.locator('#menu-list').click();
  await page1.waitForTimeout(500);
  await page1.getByRole('link', { name: ' Student Management ' }).click();
  await page1.waitForTimeout(1000);

  // 8. Click Add Student
  await page1.getByRole('button', { name: ' ADD STUDENT' }).click();
  await page1.waitForTimeout(500);

  // 9. Fill Student Form
  await page1.locator('#firstName').fill('karthick');
  await page1.locator('#lastName').fill('natarajan');
  await page1.locator('#email').fill('karthick0987@gmail.com');
  await page1.locator('#studentForm').getByRole('textbox').nth(3).fill('123');
  await page1.locator('#registrationStatus').selectOption('APPROVED');
  await page1.waitForTimeout(500);

  // 10. Select group (e.g. tech-fe)
  await page1.locator('#studentGroupsContainer div')
    .filter({ hasText: 'tech-fe' })
    .locator('i')
    .click();
  await page1.waitForTimeout(500);

  // 11. Save Student
  await page1.getByRole('button', { name: 'Save Changes' }).click();
  await page1.waitForTimeout(2000);

  // 12. Open Dropdown for Action
  await page1.locator('.dropdown-header').click();
  await page1.waitForTimeout(300);
  await page1.locator('.dropdown-options > div:nth-child(2)').click(); // Open delete menu
  await page1.waitForTimeout(500);

  // 13. Click delete icon (trash)
  await page1.getByRole('button', { name: '' }).nth(1).click();
  await page1.waitForTimeout(500);

  // 14. Confirm delete
  await page1.getByRole('textbox', { name: "Type 'delete' here" }).fill('delete');
  await page1.waitForTimeout(300);
  await page1.getByRole('button', { name: ' Confirm Delete' }).click();

  // 15. Final wait for UI to complete
  await page1.waitForTimeout(2000);
});
