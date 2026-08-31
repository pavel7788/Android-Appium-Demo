import { BasePage } from './BasePage'

class CartPage extends BasePage {
    get cartTitle()      { return $(this.id('productTV')) }
    get cartRV()         { return $(this.id('productRV')) }
    get totalPrice()     { return $(this.id('totalPriceTV')) }
    get checkoutBtn()    { return $(this.id('cartBt')) }
    get emptyCartTitle() { return $(this.id('noItemTitleTV')) }
    get shoppingBtn()    { return $(this.id('shoppingBt')) }

    async waitForPage(): Promise<void> {
        await driver.waitUntil(async () => {
            const empty = await this.emptyCartTitle.isExisting()
            const items = await this.cartTitle.isExisting()
            return empty || items
        }, { timeout: 10000 })
    }

    async proceedToCheckout(): Promise<void> {
        await this.tap(this.checkoutBtn)
    }
}

export default new CartPage()
