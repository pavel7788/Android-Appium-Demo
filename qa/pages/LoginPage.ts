import { BasePage } from './BasePage'
import { dismissKeyboard } from '../helpers/gestures'
import { USERS } from '../data/testData'
import {
    androidId,
    exactText,
    iosAlertMessage,
    iosElement,
    iosId,
    iosType,
    platformSelector,
} from '../helpers/selectors'

class LoginPage extends BasePage {
    get usernameInput()    { return $(platformSelector({ android: androidId('nameET'), ios: iosType('TextField') })) }
    get passwordInput()    { return $(platformSelector({ android: androidId('passwordET'), ios: iosType('SecureTextField') })) }
    get loginBtn()         { return $(platformSelector({ android: androidId('loginBtn'), ios: iosElement('Button', 'Login') })) }
    get usernameError()    { return $(platformSelector({ android: androidId('nameErrorTV'), ios: exactText('Username is required') })) }
    get passwordError()    { return $(platformSelector({ android: androidId('passwordErrorTV'), ios: iosAlertMessage })) }
    // Prefilled test users shown on login screen
    get user1()            { return $(platformSelector({ android: androidId('username1TV'), ios: exactText(USERS.standard.email) })) }
    get user2()            { return $(platformSelector({ android: androidId('username2TV'), ios: exactText(USERS.locked.email) })) }
    get user3()            { return $(platformSelector({ android: androidId('username3TV'), ios: exactText(USERS.john.email) })) }
    get logOutMenuItem()   { return $(platformSelector({ android: exactText('Log Out'), ios: iosId('LogOut-menu-item') })) }
    get logoutConfirmBtn() { return $(platformSelector({ android: exactText('LOGOUT'), ios: exactText('Log Out') })) }
    get logInMenuItem()    { return $(platformSelector({ android: exactText('Log In'), ios: iosId('Login Button') })) }

    async waitForPage(): Promise<void> {
        await this.loginBtn.waitForExist()
    }

    async navigateToLogin(): Promise<void> {
        if (await this.loginBtn.isExisting()) return
        await this.openMenu()
        if (await this.logOutMenuItem.isExisting()) {
            await this.tap(this.logOutMenuItem)
            if (driver.isIOS) {
                await this.waitForPage()
                return
            }
            await this.tap(this.logoutConfirmBtn)
            await this.openMenu()
        }
        await this.tap(this.logInMenuItem)
        await this.waitForPage()
    }

    async login(email: string, password: string): Promise<void> {
        if (driver.isIOS && email === USERS.standard.email && password === USERS.standard.password) {
            await this.tap(this.user1)
            await this.tap(this.loginBtn)
            return
        }
        await this.typeText(this.usernameInput, email)
        await this.typeText(this.passwordInput, password)
        await dismissKeyboard()
        await this.tap(this.loginBtn)
    }
}

export default new LoginPage()
