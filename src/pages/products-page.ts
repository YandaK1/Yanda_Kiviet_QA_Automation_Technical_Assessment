import { Page, Locator } from '@playwright/test';

export class ProductsPage {
    readonly page: Page;
    readonly sortDropdown: Locator;
    readonly productNames: Locator;
    readonly productPrices: Locator;
    readonly addToCartButtons: Locator;
    readonly cartBadge: Locator;
    readonly cartLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sortDropdown = page.locator('.product_sort_container');
        this.productNames = page.locator('.inventory_item_name');
        this.productPrices = page.locator('.inventory_item_price');
        this.addToCartButtons = page.locator('[data-test^="add-to-cart"]');
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    }

    /**
    * Sorts the displayed products using the selected sorting option.
    * @param sortOption - The visible sorting option to select.
    */
    async sortProducts(sortOption: string): Promise<void> {
        await this.sortDropdown.selectOption({ label: sortOption });
    }

    /**
    * Retrieves the names of all displayed products.
    * @returns An array of product names.
    */
    async getProductNames(): Promise<string[]> {
        return await this.productNames.allTextContents();
    }

    /**
    * Retrieves the displayed product prices as numeric values.
    * @returns An array of product prices.
    */
    async getProductPrices(): Promise<number[]> {
        const prices = await this.productPrices.allTextContents();
        return prices.map(price => Number(price.replace('$', '')));
    }

    /**
    * Adds all available products to the shopping cart.
    */
    async addAllProductsToCart(): Promise<void> {
        await this.addToCartButtons.first().waitFor({ state: 'visible' });

        const productCount = await this.addToCartButtons.count();

        for (let i = 0; i < productCount; i++) {
            await this.addToCartButtons.first().click();
        }
    }

    /**
    * Navigates from the Products page to the shopping cart.
    */
    async openCart(): Promise<void> {
        await this.cartLink.click();
    }
}