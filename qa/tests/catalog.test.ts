import LoginPage from '../pages/LoginPage'
import CatalogPage from '../pages/CatalogPage'
import ProductDetailPage from '../pages/ProductDetailPage'
import { USERS, PRODUCTS, PATTERNS } from '../data/testData'
import { Tag } from '../types/Tags'
import { step } from '../helpers/step'

describe('Product Catalog', () => {
    before(async () => {
        await LoginPage.navigateToLogin()
        await LoginPage.login(USERS.standard.email, USERS.standard.password)
        await CatalogPage.waitForPage()
    })

    it(`${Tag.Smoke} CAT-01 should display the product catalog`, async () => {
        await step('Verify catalog page is displayed', async () => {
            await CatalogPage.waitForPage()
        })
    })

    it(`${Tag.Smoke} CAT-02 should open product detail on tap`, async () => {
        await step('Tap product from catalog', async () => {
            await CatalogPage.tapProduct(PRODUCTS.backpack)
            await ProductDetailPage.waitForPage()
        })
        await step('Verify product title is correct', async () => {
            await expect(ProductDetailPage.title).toHaveText(PRODUCTS.backpack)
        })
    })

    it(`${Tag.Regression} CAT-03 should display product price`, async () => {
        await step('Verify price format is correct', async () => {
            await expect(ProductDetailPage.price).toHaveText(PATTERNS.price)
        })
    })

    it(`${Tag.Regression} CAT-04 should increase product quantity`, async () => {
        await step('Increase quantity by one', async () => {
            await ProductDetailPage.increaseQuantity()
        })
        await step('Verify quantity is greater than 1', async () => {
            const qty = await ProductDetailPage.getQuantity()
            expect(parseInt(qty)).toBeGreaterThan(1)
        })
    })
})
