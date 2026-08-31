import LoginPage from '../pages/LoginPage'
import CatalogPage from '../pages/CatalogPage'
import ProductDetailPage from '../pages/ProductDetailPage'
import CartPage from '../pages/CartPage'
import { USERS, PRODUCTS, PATTERNS } from '../data/testData'
import { Tag } from '../types/Tags'
import { step } from '../helpers/step'

describe('Shopping Cart', () => {
    before(async () => {
        await LoginPage.navigateToLogin()
        await LoginPage.login(USERS.standard.email, USERS.standard.password)
        await CatalogPage.waitForPage()
    })

    it(`${Tag.Smoke} CART-01 should show empty cart initially`, async () => {
        await step('Open cart from catalog', async () => {
            await CatalogPage.openCart()
            await CartPage.waitForPage()
        })
        await step('Verify cart is empty', async () => {
            await expect(CartPage.emptyCartTitle).toBeDisplayed()
        })
    })

    it(`${Tag.Smoke} CART-02 should add item to cart`, async () => {
        await step('Navigate back to catalog', async () => {
            await driver.back()
            await CatalogPage.waitForPage()
        })
        await step('Open product detail', async () => {
            await CatalogPage.tapProduct(PRODUCTS.backpack)
            await ProductDetailPage.waitForPage()
        })
        await step('Add product to cart', async () => {
            await ProductDetailPage.addToCart()
        })
        await step('Verify cart count increased', async () => {
            const count = await ProductDetailPage.getCartCount()
            expect(parseInt(count)).toBeGreaterThan(0)
        })
    })

    it(`${Tag.Smoke} CART-03 should display item in cart`, async () => {
        await step('Open cart', async () => {
            await ProductDetailPage.openCart()
            await CartPage.waitForPage()
        })
        await step('Verify cart is not empty', async () => {
            await expect(CartPage.emptyCartTitle).not.toBeDisplayed()
        })
    })

    it(`${Tag.Regression} CART-04 should display total price in cart`, async () => {
        await step('Get total price', async () => {
            await expect(CartPage.totalPrice).toHaveText(PATTERNS.price)
        })
    })
})
