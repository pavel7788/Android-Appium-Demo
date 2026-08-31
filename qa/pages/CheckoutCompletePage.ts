import { BasePage } from './BasePage'

class CheckoutCompletePage extends BasePage {
    get thankYouTitle()       { return $(this.id('thankYouTV')) }
    get orderNumber()         { return $(this.id('orderNumberTV')) }
    get continueShoppingBtn() { return $(this.id('continueBt')) }

    async waitForPage(): Promise<void> {
        await this.thankYouTitle.waitForExist()
    }
}

export default new CheckoutCompletePage()
