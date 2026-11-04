import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly productNames: Locator;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  calculatedCartTotal: number | null = null;

  constructor(page: Page) {
    this.page = page;
    this.productNames = page.locator('[data-test="inventory-item-name"]');
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  /**
   * Retrieves the names of all products displayed in the shopping cart.
   * @returns An array containing the product names.
   */
  async getProductNames(): Promise<string[]> {
    return await this.productNames.allTextContents();
  }

  /**
   * Calculates the total price of all products in the cart before checkout.
   * Accounts for the quantity and unit price of each product.
   * @returns The calculated cart total excluding tax.
   */
  async calculateCartTotal(): Promise<number> {
    await this.cartItems.first().waitFor({ state: 'visible' });

    const productCount = await this.cartItems.count();

    if (productCount === 0) {
      throw new Error('Cannot calculate the total of an empty cart.');
    }

    let total = 0;

    for (let i = 0; i < productCount; i++) {
      const item = this.cartItems.nth(i);
      const quantity = Number(await item.locator('.cart_quantity').innerText());
      const priceText = await item.locator('.inventory_item_price').innerText();
      const price = Number(priceText.replace('$', ''));

      total += quantity * price;
    }

    this.calculatedCartTotal = Number(total.toFixed(2));
    return this.calculatedCartTotal;
  }

  /**
   * Navigates from the shopping cart to the checkout information page.
   */
  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}