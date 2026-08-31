import { BasePage } from './BasePage'

class CatalogPage extends BasePage {
    get productsTitle() { return $(this.id('productTV')) }
    get productsRV()    { return $(this.id('productRV')) }
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
