import { createBdd } from 'playwright-bdd';
import { test, expect } from '../src/fixtures/pages-fixture.js';

const { When, Then } = createBdd(test);

//#region Add All Products to Cart

When('the user adds all available products to the cart', async ({ productsPage }) => {
    await productsPage.addAllProductsToCart();
});

Then('the cart badge should display the correct product count', async ({ productsPage }) => {
    const expectedCount = await productsPage.productNames.count();

    await expect(productsPage.cartBadge).toHaveText(expectedCount.toString());
});

Then('the cart should contain all added products', async ({ productsPage, cartPage, page }) => {
    const expectedProducts = await productsPage.getProductNames();

    await productsPage.openCart();
    await expect(page).toHaveURL(/cart\.html$/);

    const actualProducts = await cartPage.getProductNames();

    expect([...actualProducts].sort()).toEqual([...expectedProducts].sort());
});

//#endregion