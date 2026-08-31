import LoginPage from '../pages/LoginPage'
import CatalogPage from '../pages/CatalogPage'
import { USERS, ERRORS } from '../data/testData'
import { Tag } from '../types/Tags'
import { step } from '../helpers/step'

describe('Login', () => {
    beforeEach(async () => {
        await LoginPage.navigateToLogin()
    })

    it(`${Tag.Smoke} LOGIN-01 should login successfully with valid credentials`, async () => {
        await step('Enter valid credentials and submit', async () => {
            await LoginPage.login(USERS.standard.email, USERS.standard.password)
        })
        await step('Verify catalog page is displayed', async () => {
            await CatalogPage.waitForPage()
        })
    })

    it(`${Tag.Regression} LOGIN-02 should show error for locked out user`, async () => {
        await step('Login with locked out user credentials', async () => {
            await LoginPage.login(USERS.locked.email, USERS.locked.password)
        })
        await step('Verify locked out error message', async () => {
            await expect(LoginPage.passwordError).toHaveText(ERRORS.lockedOut)
        })
    })

    it(`${Tag.Regression} LOGIN-03 should show error when username is empty`, async () => {
        await step('Submit login with empty username', async () => {
            await LoginPage.login('', USERS.standard.password)
        })
        await step('Verify username error is shown', async () => {
            await expect(LoginPage.usernameError).toBeDisplayed()
        })
    })

    it(`${Tag.Regression} LOGIN-04 should show error when password is empty`, async () => {
        await step('Submit login with empty password', async () => {
            await LoginPage.login(USERS.standard.email, '')
        })
        await step('Verify password error is shown', async () => {
            await expect(LoginPage.passwordError).toBeDisplayed()
        })
    })
})
