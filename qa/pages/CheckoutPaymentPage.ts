import { BasePage } from './BasePage'
import { PaymentInfo } from '../types/checkout.types'

class CheckoutPaymentPage extends BasePage {
    get nameInput()         { return $(this.id('nameET')) }
    get cardNumberInput()   { return $(this.id('cardNumberET')) }
    get expirationInput()   { return $(this.id('expirationDateET')) }
    get securityCodeInput() { return $(this.id('securityCodeET')) }
    get billingCheckbox()   { return $(this.id('billingAddressCB')) }
    get reviewBtn()         { return $(this.id('paymentBtn')) }

    async waitForPage(): Promise<void> {
        await this.cardNumberInput.waitForExist()
    }

    async fillPaymentInfo(info: PaymentInfo): Promise<void> {
        await this.typeText(this.nameInput, info.cardholderName)
        await this.typeText(this.cardNumberInput, info.cardNumber)
        await this.typeText(this.expirationInput, info.expirationDate)
        await this.typeText(this.securityCodeInput, info.securityCode)
    }

    async goToReview(): Promise<void> {
        try { await driver.hideKeyboard() } catch {}
        if ((await this.billingCheckbox.getAttribute('checked')) !== 'true') {
            await this.billingCheckbox.click()
        }
        await this.scrollToVisible(this.reviewBtn)
        await this.tap(this.reviewBtn)
    }
}

export default new CheckoutPaymentPage()
