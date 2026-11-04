import { test as base } from 'playwright-bdd';
import { LoginPage } from '../pages/login-page.js';
import { ProductsPage } from '../pages/products-page.js';
import { CartPage } from '../pages/cart-page.js';
import { CheckoutPage } from '../pages/checkout-page.js';

type Pages = {
    loginPage: LoginPage;
    productsPage: ProductsPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
};

export const test = base.extend<Pages>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    productsPage: async ({ page }, use) => {
        await use(new ProductsPage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },
});

export { expect } from '@playwright/test';