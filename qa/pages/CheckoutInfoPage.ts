import { BasePage } from './BasePage'
import { ShippingInfo } from '../types/checkout.types'

class CheckoutInfoPage extends BasePage {
    get title()         { return $(this.id('checkoutTitleTV')) }
    get fullNameInput() { return $(this.id('fullNameET')) }
    get address1Input() { return $(this.id('address1ET')) }
    get address2Input() { return $(this.id('address2ET')) }
    get cityInput()     { return $(this.id('cityET')) }
    get stateInput()    { return $(this.id('stateET')) }
    get zipInput()      { return $(this.id('zipET')) }
    get countryInput()  { return $(this.id('countryET')) }
    get paymentBtn()    { return $(this.id('paymentBtn')) }
    get fullNameError() { return $(this.id('fullNameErrorTV')) }
    get zipError()      { return $(this.id('zipErrorTV')) }

    async waitForPage(): Promise<void> {
        await this.fullNameInput.waitForExist()
    }

    async fillShippingInfo(info: ShippingInfo): Promise<void> {
        await this.typeText(this.fullNameInput, info.fullName)
        await this.typeText(this.address1Input, info.address1)
        if (info.address2) {
            await this.typeText(this.address2Input, info.address2)
        }
        await this.typeText(this.cityInput, info.city)
        await this.typeText(this.stateInput, info.state)
        await this.typeText(this.zipInput, info.zip)
        await this.typeText(this.countryInput, info.country)
    }

    async goToPayment(): Promise<void> {
        await this.tap(this.paymentBtn)
    }
}

export default new CheckoutInfoPage()
