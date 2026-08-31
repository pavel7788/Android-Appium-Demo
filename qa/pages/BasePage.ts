import { APP_PACKAGE } from '../config/app.config'

export class BasePage {
    protected id = (resourceId: string): string =>
        `android=new UiSelector().resourceId("${APP_PACKAGE}:id/${resourceId}")`

    protected text = (value: string): string =>
        `android=new UiSelector().text("${value}")`

    protected containsText = (value: string): string =>
        `android=new UiSelector().textContains("${value}")`

    get menuBtn()           { return $(this.id('menuIV')) }
    get cartBtn()           { return $(this.id('cartIV')) }
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
        const { width, height } = await driver.getWindowSize()
        for (let i = 0; i < 5; i++) {
            if (await el.isExisting()) return
            await driver.execute('mobile: swipeGesture', {
                left: 0, top: Math.round(height * 0.3),
                width, height: Math.round(height * 0.4),
                direction: 'up', percent: 0.8,
            })
        }
    }

    async openCart(): Promise<void> {
        await this.tap(this.cartBtn)
    }

    async getCartCount(): Promise<string> {
        return this.getText(this.cartCountLabel)
    }

    async openMenu(): Promise<void> {
        if (await this.dialogDontShowBtn.isExisting()) {
            await this.dialogDontShowBtn.click()
            await this.dialogDontShowBtn.waitForDisplayed({ reverse: true })
        }
        await this.tap(this.menuBtn, 30000)
    }
}