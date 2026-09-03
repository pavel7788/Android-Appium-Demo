import { ShippingInfo, PaymentInfo } from '../types/checkout.types'

export const PRODUCTS = {
    backpack: 'Sauce Labs Backpack',
}

export const PATTERNS = {
    price: /\$\s*\d+\.\d{2}/,
}

export const USERS = {
    standard: {
        get email(): string { return driver.isIOS ? 'bob@example.com' : 'bod@example.com' },
        password: '10203040',
    },
    locked: {
        email: 'alice@example.com',
        password: '10203040',
    },
    visual: {
        email: 'visual@example.com',
        password: '10203040',
    },
    john: {
        email: 'john@example.com',
        password: '10203040',
    },
}

export const CHECKOUT: { shipping: ShippingInfo, payment: PaymentInfo } = {
    shipping: {
        fullName: 'John Doe',
        address1: '123 Main St',
        address2: '',
        city: 'San Francisco',
        state: 'CA',
        zip: '94105',
        country: 'United States',
    },
    payment: {
        cardholderName: 'John Doe',
        cardNumber: '4111111111111111',
        expirationDate: '12/25',
        securityCode: '123',
    },
}

export const ERRORS = {
    lockedOut: 'Sorry this user has been locked out.',
    invalidCredentials: 'Provided credentials do not match any user in this service.',
}
