import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly finishButton: Locator;
    readonly itemTotalLabel: Locator;
    readonly taxLabel: Locator;
    readonly errorMessage: Locator;
    readonly successTitle: Locator;
    readonly successMessage: Locator;
    readonly cartBadge: Locator;
    readonly menuButton: Locator;
    readonly allItemsLink: Locator;
    readonly logoutLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.itemTotalLabel = page.locator('[data-test="subtotal-label"]');
        this.taxLabel = page.locator('[data-test="tax-label"]');
        this.errorMessage = page.locator('[data-test="error"]');
        this.successTitle = page.locator('[data-test="complete-header"]');
        this.successMessage = page.locator('[data-test="complete-text"]');
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.menuButton = page.locator('#react-burger-menu-btn');
        this.allItemsLink = page.locator('#inventory_sidebar_link');
        this.logoutLink = page.locator('#logout_sidebar_link');
    }

    /**
     * Enters checkout information and attempts to continue to the overview.
     * @param firstName - Customer's first name.
     * @param lastName - Customer's last name.
     * @param postalCode - Customer's postal code.
     */
    async enterCheckoutInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
        await this.continueButton.click();
    }

    /**
     * Retrieves the displayed item total from the checkout overview.
     * @returns The item total excluding tax.
     */
    async getItemTotal(): Promise<number> {
        const totalText = await this.itemTotalLabel.innerText();
        return Number(totalText.replace('Item total: $', ''));
    }

    /**
     * Retrieves the tax amount displayed on the checkout overview.
     * @returns The displayed tax amount.
     */
    async getTaxAmount(): Promise<number> {
        const taxText = await this.taxLabel.innerText();
        return Number(taxText.replace('Tax: $', ''));
    }

    /**
     * Completes the checkout process by selecting Finish.
     */
    async completeCheckout(): Promise<void> {
        await this.finishButton.click();
    }

    /**
     * Opens the navigation menu if closed and selects the requested option.
     * @param menuOption - The navigation option to select.
     */
    private async selectMenuOption(menuOption: Locator): Promise<void> {
        const menu = this.page.locator('.bm-menu-wrap');
        const menuState = await menu.getAttribute('aria-hidden');

        if (menuState === 'true') {
            await this.menuButton.click();
        }

        await expect(menu).toHaveAttribute('aria-hidden', 'false');
        await menuOption.click();
    }

    /**
     * Navigates to the Products page using the All Items menu option.
     */
    async navigateToAllItems(): Promise<void> {
        await this.selectMenuOption(this.allItemsLink);
    }

    /**
     * Logs the user out using the navigation menu.
     */
    async logout(): Promise<void> {
        await this.selectMenuOption(this.logoutLink);
    }
}