import { createBdd } from 'playwright-bdd';
import { test, expect } from '../src/fixtures/pages-fixture.js';

const { Given, When, Then } = createBdd(test);

Given('the user is on the SauceDemo login page', async ({ loginPage }) => {
    await loginPage.navigate();
});

When('the user logs in using valid credentials', async ({ loginPage }) => {
    await loginPage.login('standard_user', 'secret_sauce');
});

Then('the products page should be displayed', async ({ page }) => {
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
});

When('the user logs in with {string} and {string}', async ({ loginPage }, username: string, password: string) => {
  await loginPage.login(username, password);
});

Then('the login error message should be {string}', async ({ loginPage }, expectedMessage: string) => {
  await expect(loginPage.errorMessage).toHaveText(expectedMessage);
  await expect(loginPage.loginButton).toBeVisible();
});
