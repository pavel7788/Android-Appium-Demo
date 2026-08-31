import { BasePage } from './BasePage'

class PlaceOrderPage extends BasePage {
    get title()         { return $(this.id('checkoutTitleTV')) }
    get totalPrice()    { return $(this.id('totalAmountTV')) }
    get placeOrderBtn() { return $(this.id('paymentBtn')) }
    get fullName()      { return $(this.id('fullNameTV')) }
    get address()       { return $(this.id('addressTV')) }

    async waitForPage(): Promise<void> {
        await this.title.waitForExist()
    }

    async placeOrder(): Promise<void> {
        await this.scrollToVisible(this.placeOrderBtn)
        await this.tap(this.placeOrderBtn)
    }
}

export default new PlaceOrderPage()
