import { swipeUp } from '../helpers/gestures'
import {
    androidId,
    containsText,
    exactText,
    iosId,
    platformSelector,
} from '../helpers/selectors'

export class BasePage {
    protected id = androidId
    protected text = exactText
    protected containsText = containsText

    get menuBtn()           { return $(platformSelector({ android: androidId('menuIV'), ios: iosId('More-tab-item') })) }
    get cartBtn()           { return $(platformSelector({ android: androidId('cartIV'), ios: iosId('Cart-tab-item') })) }
    get cartCountLabel()    { return $(this.id('cartTV')) }
    // XPath searches across all windows (including system dialogs unlike UiSelector)
    get dialogDontShowBtn() { return $('//android.widget.Button[contains(@text, "Show Again")]') }

    async tap(el: ChainablePromiseElement, timeout?: number): Promise<void> {
        await el.waitForExist({ timeout })
        await el.click()
    }

    async typeText(el: ChainablePromiseElement, value: string): Promise<void> {
        await el.waitForExist()
        await el.clearValue()
        await el.setValue(value)
    }

    async getText(el: ChainablePromiseElement): Promise<string> {
        await el.waitForExist()
        return el.getText()
    }

    async scrollToVisible(el: ChainablePromiseElement): Promise<void> {
        for (let i = 0; i < 5; i++) {
            if (await el.isExisting()) return
            await swipeUp()
        }
    }

    async openCart(): Promise<void> {
        await this.tap(this.cartBtn)
    }

    async getCartCount(): Promise<string> {
        return this.getText(this.cartCountLabel)
    }

    async openMenu(): Promise<void> {
        if (driver.isAndroid && await this.dialogDontShowBtn.isExisting()) {
            await this.dialogDontShowBtn.click()
            await this.dialogDontShowBtn.waitForDisplayed({ reverse: true })
        }
        await this.tap(this.menuBtn, 30000)
    }
}