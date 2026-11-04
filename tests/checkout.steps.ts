
import { createBdd } from 'playwright-bdd';
import { test, expect } from '../src/fixtures/pages-fixture.js';

const { Given, When, Then } = createBdd(test);

//#region Checkout Preconditions and Navigation

Given('the user is on the checkout overview with all products', async ({ productsPage, cartPage, checkoutPage }) => {
    await productsPage.addAllProductsToCart();
    await productsPage.openCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.enterCheckoutInformation('Test', 'User', '8001');
});

Given('the user is on the checkout information page with products in the cart', async ({ productsPage, cartPage }) => {
    await productsPage.addAllProductsToCart();
    await productsPage.openCart();
    await cartPage.proceedToCheckout();
});

When('the user opens the cart', async ({ productsPage }) => {
    await productsPage.openCart();
});

When('the user proceeds to checkout', async ({ cartPage }) => {
    await cartPage.proceedToCheckout();
});

//#endregion

//#region Positive Checkout - Item Total and Tax

When('the user calculates the cart total', async ({ cartPage }) => {
    await cartPage.calculateCartTotal();
});

When('the user enters valid checkout information', async ({ checkoutPage }) => {
    await checkoutPage.enterCheckoutInformation('Test', 'User', '8001');
});

Then('the displayed item total should match the calculated cart total', async ({ cartPage, checkoutPage }) => {
    const expectedTotal = cartPage.calculatedCartTotal;

    if (expectedTotal === null) {
        throw new Error('The cart total must be calculated before checkout.');
    }

    const actualTotal = await checkoutPage.getItemTotal();

    expect(actualTotal).toBe(expectedTotal);
});

Then('the checkout tax should be displayed', async ({ checkoutPage }) => {
    await expect(checkoutPage.taxLabel).toBeVisible();

    const taxAmount = await checkoutPage.getTaxAmount();

    expect(taxAmount).toBeGreaterThan(0);
});

//#endregion

//#region Positive Checkout - Order Completion

When('the user completes checkout', async ({ checkoutPage }) => {
    await checkoutPage.completeCheckout();
});

Then('the checkout success title should be displayed', async ({ checkoutPage }) => {
    await expect(checkoutPage.successTitle).toHaveText('Thank you for your order!');
});

Then('the checkout success message should be displayed', async ({ checkoutPage }) => {
    await expect(checkoutPage.successMessage).toContainText('Your order has been dispatched');
});

Then('the cart badge should not display a number', async ({ checkoutPage }) => {
    await expect(checkoutPage.cartBadge).toHaveCount(0);
});

//#endregion

//#region Positive Checkout - Navigation and Logout

When('the user navigates to All Items using the menu', async ({ checkoutPage }) => {
    await checkoutPage.navigateToAllItems();
});

Then('the cart should be empty', async ({ cartPage }) => {
    await expect(cartPage.cartItems).toHaveCount(0);
});

When('the user logs out', async ({ checkoutPage }) => {
    await checkoutPage.logout();
});

Then('the login page should be displayed', async ({ loginPage }) => {
    await expect(loginPage.loginButton).toBeVisible();
});

//#endregion

//#region Negative Checkout - Required Fields

When('the user enters {string}, {string} and {string}', async ({ checkoutPage }, firstName: string, lastName: string, postalCode: string) => {
    await checkoutPage.enterCheckoutInformation(firstName, lastName, postalCode);
});

Then('the checkout error message should be {string}', async ({ checkoutPage }, expectedMessage: string) => {
    await expect(checkoutPage.errorMessage).toHaveText(expectedMessage);
    await expect(checkoutPage.continueButton).toBeVisible();
});

//#endregion