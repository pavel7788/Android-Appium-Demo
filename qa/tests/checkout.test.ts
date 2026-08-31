import LoginPage from '../pages/LoginPage'
import CatalogPage from '../pages/CatalogPage'
import ProductDetailPage from '../pages/ProductDetailPage'
import CartPage from '../pages/CartPage'
import CheckoutInfoPage from '../pages/CheckoutInfoPage'
import CheckoutPaymentPage from '../pages/CheckoutPaymentPage'
import PlaceOrderPage from '../pages/PlaceOrderPage'
import CheckoutCompletePage from '../pages/CheckoutCompletePage'
import { USERS, CHECKOUT, PRODUCTS } from '../data/testData'
import { Tag } from '../types/Tags'
import { step } from '../helpers/step'

describe('Checkout Flow', () => {
    before(async () => {
        await LoginPage.navigateToLogin()
        await LoginPage.login(USERS.standard.email, USERS.standard.password)
        await CatalogPage.waitForPage()
        await CatalogPage.tapProduct(PRODUCTS.backpack)
        await ProductDetailPage.waitForPage()
        await ProductDetailPage.addToCart()
        await ProductDetailPage.openCart()
        await CartPage.waitForPage()
    })

    it(`${Tag.Smoke} CHK-01 should navigate to checkout from cart`, async () => {
        await step('Tap proceed to checkout', async () => {
            await CartPage.proceedToCheckout()
        })
        await step('Verify shipping info page is displayed', async () => {
            await CheckoutInfoPage.waitForPage()
        })
    })

    it(`${Tag.Smoke} CHK-02 should fill in shipping info and go to payment`, async () => {
        await step('Fill in shipping info', async () => {
            await CheckoutInfoPage.fillShippingInfo(CHECKOUT.shipping)
        })
        await step('Navigate to payment page', async () => {
            await CheckoutInfoPage.goToPayment()
            await CheckoutPaymentPage.waitForPage()
        })
    })

    it(`${Tag.Smoke} CHK-03 should fill in payment info and go to order review`, async () => {
        await step('Fill in payment info', async () => {
            await CheckoutPaymentPage.fillPaymentInfo(CHECKOUT.payment)
        })
        await step('Navigate to order review page', async () => {
            await CheckoutPaymentPage.goToReview()
            await PlaceOrderPage.waitForPage()
        })
    })

    it(`${Tag.Regression} CHK-04 should display correct name on order review`, async () => {
        await step('Verify full name matches shipping info', async () => {
            await expect(PlaceOrderPage.fullName).toHaveText(CHECKOUT.shipping.fullName)
        })
    })

    it(`${Tag.Smoke} CHK-05 should complete the order successfully`, async () => {
        await step('Place the order', async () => {
            await PlaceOrderPage.placeOrder()
        })
        await step('Verify order confirmation is shown', async () => {
            await CheckoutCompletePage.waitForPage()
            await expect(CheckoutCompletePage.thankYouTitle).toBeDisplayed()
        })
    })
})
