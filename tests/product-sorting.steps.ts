
import { createBdd } from 'playwright-bdd';
import { test, expect } from '../src/fixtures/pages-fixture.js';

const { Given, When, Then } = createBdd(test);

Given('the user is logged in to SauceDemo', async ({ loginPage }) => {
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
});

When('the user sorts products by {string}', async ({ productsPage }, sortOption: string) => {
    await productsPage.sortProducts(sortOption);
});

Then('all products should be sorted correctly by {string}', async ({ productsPage }, sortOption: string) => {
    if (sortOption.startsWith('Name')) {
        const actualNames = await productsPage.getProductNames();
        const expectedNames = [...actualNames].sort((a, b) => a.localeCompare(b));

        expect(actualNames.length).toBeGreaterThan(1);
        expect(actualNames).toEqual(sortOption === 'Name (A to Z)' ? expectedNames : expectedNames.reverse());
    } else if (sortOption.startsWith('Price')) {
        const actualPrices = await productsPage.getProductPrices();
        const expectedPrices = [...actualPrices].sort((a, b) => a - b);

        expect(actualPrices.length).toBeGreaterThan(1);
        expect(actualPrices).toEqual(sortOption === 'Price (low to high)' ? expectedPrices : expectedPrices.reverse());
    } else {
        throw new Error(`Unsupported sorting option: ${sortOption}`);
    }
});
