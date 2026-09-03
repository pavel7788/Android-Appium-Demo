import { BasePage } from './BasePage'
import { androidId, iosId, platformSelector } from '../helpers/selectors'

class CatalogPage extends BasePage {
    get productsTitle() { return $(platformSelector({ android: androidId('productTV'), ios: iosId('Product Name') })) }
    get productsRV()    { return $(platformSelector({ android: androidId('productRV'), ios: iosId('Product Name') })) }
    get sortIcon()      { return $(this.id('sortIV')) }
    get titleTV()   { return this.id('titleTV') }
    get productIV() { return this.id('productIV') }

    readonly productByName = (name: string) => $(this.containsText(name))

    async waitForPage(): Promise<void> {
        await this.productsRV.waitForExist()
        // Wait for product items to actually load
        await this.productsTitle.waitForExist()
    }

    async tapProduct(productName: string): Promise<void> {
        await this.productByName(productName).waitForExist()
        // await $$ so elements have elementId before getText() is called
        const titles   = $$(this.titleTV)
        const products = $$(this.productIV)
        const count = await titles.length
        for (let i = 0; i < count; i++) {
            await titles[i].waitForExist()
            if ((await titles[i].getText()).includes(productName)) {
                await products[i].click()
                return
            }
        }
    }
}

export default new CatalogPage()
