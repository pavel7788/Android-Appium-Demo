import { BasePage } from './BasePage'

class ProductDetailPage extends BasePage {
    get title()        { return $(this.id('productTV')) }
    get price()        { return $(this.id('priceTV')) }
    get addToCartBtn() { return $(this.id('cartBt')) }
    get plusBtn()      { return $(this.id('plusIV')) }
    get minusBtn()     { return $(this.id('minusIV')) }
    get quantity()     { return $(this.id('noTV')) }
    get description()  { return $(this.id('descTV')) }

    async waitForPage(): Promise<void> {
        await this.addToCartBtn.waitForExist()
    }

    async increaseQuantity(): Promise<void> {
        // Swipe up to scroll down and reveal the quantity picker
        await browser.action('pointer', { parameters: { pointerType: 'touch' } })
            .move({ duration: 0, origin: 'viewport', x: 540, y: 1400 })
            .down({ button: 0 })
            .pause(100)
            .move({ duration: 800, origin: 'viewport', x: 540, y: 400 })
            .up({ button: 0 })
            .perform()
        // pause needed: no DOM event signals scroll animation complete
        await browser.pause(500)
        await this.tap(this.plusBtn)
    }

    async addToCart(): Promise<void> {
        await this.tap(this.addToCartBtn)
    }

    async getQuantity(): Promise<string> {
        return this.getText(this.quantity)
    }
}

export default new ProductDetailPage()
