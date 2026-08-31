import { BasePage } from './BasePage'

class LoginPage extends BasePage {
    get usernameInput()    { return $(this.id('nameET')) }
    get passwordInput()    { return $(this.id('passwordET')) }
    get loginBtn()         { return $(this.id('loginBtn')) }
    get usernameError()    { return $(this.id('nameErrorTV')) }
    get passwordError()    { return $(this.id('passwordErrorTV')) }
    // Prefilled test users shown on login screen
    get user1()            { return $(this.id('username1TV')) }
    get user2()            { return $(this.id('username2TV')) }
    get user3()            { return $(this.id('username3TV')) }
    get logOutMenuItem()   { return $(this.text('Log Out')) }
    get logoutConfirmBtn() { return $(this.text('LOGOUT')) }
    get logInMenuItem()    { return $(this.text('Log In')) }

    async waitForPage(): Promise<void> {
        await this.loginBtn.waitForExist()
    }

    async navigateToLogin(): Promise<void> {
        if (await this.loginBtn.isExisting()) return
        await this.openMenu()
        if (await this.logOutMenuItem.isExisting()) {
            await this.tap(this.logOutMenuItem)
            await this.tap(this.logoutConfirmBtn)
            await this.openMenu()
        }
        await this.tap(this.logInMenuItem)
        await this.waitForPage()
    }

    async login(email: string, password: string): Promise<void> {
        await this.typeText(this.usernameInput, email)
        await this.typeText(this.passwordInput, password)
        await this.tap(this.loginBtn)
    }
}

export default new LoginPage()
