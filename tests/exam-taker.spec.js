import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  // Open the exam landing page
  await page.goto('https://digiscreener-staging.gcp.digivalitsolutions.com/fullscreenexam/app-landing/');

  // Click the initial two span elements (likely to start or continue the flow)
  await page.locator('span').click();
  await page.locator('span').click();

  // Click and fill the email textbox
  await page.getByRole('textbox', { name: 'Email ID' }).click();
  await page.getByRole('textbox', { name: 'Email ID' }).fill('tester016@gmail.com');

  // Click the Verify button
  await page.getByRole('button', { name: 'Verify' }).click();

  // Select the college name (via a label's span inside a div)
  await page.locator('div').filter({ hasText: 'College Name Search exams by' }).locator('label span').click();

  // Agree to terms by clicking the slider
  await page.locator('.slider').click();

  // Click on search bar and clear (or keep) the input
  await page.getByRole('textbox', { name: 'Search exams by name, time,' }).click();
  await page.getByRole('textbox', { name: 'Search exams by name, time,' }).fill('');

  // Start the exam
  await page.getByRole('button', { name: 'Start Exam' }).click();

  // Fill National ID
  await page.locator('#national-id').click();
  await page.locator('#national-id').fill('123');

  // Click to log in and start the exam
  await page.getByRole('button', { name: 'Login and Start Exam' }).click();

  // Acknowledge the instructions
  await page.getByRole('button', { name: 'Acknowledge and Start Exam' }).click();

  // Open menu and switch to Arabic
  await page.locator('#hamburger-icon path').click();
  await page.locator('#menu-container div').filter({ hasText: 'English Arabic' }).locator('label span').click();

  // Switch back to English
  await page.locator('#hamburger-icon path').click();
  await page.locator('#menu-container div').filter({ hasText: 'English العربية' }).locator('label span').click();

  // Open menu and enable calculator
  await page.locator('#hamburger-icon path').click();
  await page.locator('#calculator-toggle-item label span').click();

  // Close calculator popup
  await page.getByRole('button', { name: '×' }).first().click();

  // --------- Question 1 ---------
  await page.locator('#question-0').getByText('🔍').click(); // Open attachment
  await page.getByRole('button', { name: 'X', exact: true }).click(); // Close attachment image
  await page.locator('#question-0').getByText('▼ Close Attachment').click(); // Collapse attachment section
  await page.getByText('What is the importance of education?(MCQ)▶ Open Attachment 1 A Knowledge B').click(); // Click to open question
  await page.locator('#question-0 div').filter({ hasText: 'A Knowledge' }).nth(2).click(); // Select option A
  await page.getByRole('button', { name: 'Next >>' }).click(); // Go to next question

  // --------- Question 2 ---------
  await page.locator('#question-1').getByText('🔍').click();
  await page.getByRole('button', { name: 'X', exact: true }).click();
  await page.locator('#question-1').getByText('▼ Close Attachment').click();
  await page.getByText('Which of the following is a type of education?(MCQ)▶ Open Attachment 1 A Formal').click();
  await page.locator('#question-1 div').filter({ hasText: 'B Informal' }).nth(2).click();
  await page.getByRole('button', { name: 'Next >>' }).click();

  // --------- Question 3 ---------
  await page.locator('#question-2').getByText('🔍').click();
  await page.getByRole('button', { name: 'X', exact: true }).click();
  await page.locator('#question-2').getByText('▼ Close Attachment').click();
  await page.getByText('which is not be a contributed consumption▶ Open Attachment 1 A Bills payable B').click();
  await page.locator('#question-2 div').filter({ hasText: 'B Bank overdraft' }).nth(2).click();
  await page.getByRole('button', { name: 'Next >>' }).click();

  // --------- Question 4 ---------
  await page.locator('#question-3').getByText('🔍').click();
  await page.getByRole('button', { name: 'X', exact: true }).click();
  await page.locator('#question-3').getByText('▼ Close Attachment').click();
  await page.getByText('Which of the following is an example of a service?▶ Open Attachment 1 A').click();
  await page.locator('#question-3 div').filter({ hasText: 'C Internet' }).nth(2).click();
  await page.getByRole('button', { name: 'Next >>' }).click();

  // --------- Question 5 ---------
  await page.locator('#question-4').getByText('🔍').click();
  await page.getByRole('button', { name: 'X' }).click();
  await page.getByText('▼ Close Attachment').click();
  await page.getByText('what is the benefits of buying the e-commerce ▶ Open Attachment 1 A marketing B').click(); // <== 🔍 Important line restored
  await page.locator('#question-4 div').filter({ hasText: 'B Commerce' }).nth(2).click();

  // Navigate between questions
  await page.getByRole('button', { name: '<< Previous' }).click();
  await page.getByRole('button', { name: 'Next >>' }).click();

  // Submit the exam
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByLabel('Alert').getByRole('button', { name: 'Submit' }).click();

  // Go to exam completed message page
  await page.goto('https://digiscreener-staging.gcp.digivalitsolutions.com/fullscreenexam/exam-portal/message.html?status=completed');

  // Toggle language once again
  await page.getByRole('button', { name: ' العربية' }).click();
  await page.getByRole('button', { name: ' English' }).click();

  // Return to app landing page
  await page.getByRole('button', { name: 'Go to App Landing' }).click();
});
