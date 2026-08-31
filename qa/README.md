# QA — WebdriverIO + TypeScript Test Automation Framework

## Structure
```
qa/
├── data/
│   └── testData.ts          # Test credentials and test data
├── helpers/
│   └── selectors.ts         # UiAutomator2 selector helpers
├── pages/                   # Page Object Model
│   ├── BasePage.ts
│   ├── LoginPage.ts
│   ├── CatalogPage.ts
│   ├── ProductDetailPage.ts
│   ├── CartPage.ts
│   ├── CheckoutInfoPage.ts
│   ├── CheckoutPaymentPage.ts
│   ├── PlaceOrderPage.ts
│   └── CheckoutCompletePage.ts
├── tests/
│   ├── login.test.ts
│   ├── catalog.test.ts
│   ├── cart.test.ts
│   └── checkout.test.ts
├── wdio.conf.ts
└── package.json
```

## Setup
1. Start Android emulator
2. Start Appium server: `npm run appium`
3. Run all tests: `npm test`

## Test Users
| Email | Password | Type |
|---|---|---|
| bod@example.com | 10203040 | Standard |
| alice@example.com | 10203040 | Locked Out |
| visual@example.com | 10203040 | Visual Testing |
