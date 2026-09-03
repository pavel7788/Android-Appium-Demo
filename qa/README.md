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

## iOS on BrowserStack
The iOS application runs on a remote BrowserStack device, so macOS and Xcode
are not required locally.

1. Copy `.env.example` to `.env` and fill in the BrowserStack credentials
   and uploaded application ID.
2. Run on the primary device: `npm run test:iphone-15:bs`.
3. Run the compatibility profile: `npm run test:iphone-12:bs`.

The shared Page Objects only have iOS locators for the login flow so far, and
only LOGIN-01 has been verified on iOS. Run just that test with:
```bash
npm run test:iphone-15:bs -- --spec ./tests/login.test.ts --mochaOpts.grep "LOGIN-01"
```
The rest of the suite still needs iOS locators before it can run there.

## Android on BrowserStack
The Android suite can also run on real BrowserStack devices:

1. Set `BROWSERSTACK_ANDROID_APP_ID` in `.env` to the uploaded APK app URL.
2. Run on Samsung Galaxy S23 / Android 13: `npm run test:galaxy-s23:bs`.
3. Run on Google Pixel 8 / Android 14: `npm run test:pixel-8:bs`.

Android app uploads are currently blocked by `BROWSERSTACK_UNPROCESSABLE_ENTITY`
(HTTP 422), so the Android BrowserStack scripts cannot run yet.

BrowserStack Support confirmed that the Sauce Labs demo APK is restricted by
their platform. Its upload requires BrowserStack to approve an exception for
this account. The locally built application APK is under separate review by
BrowserStack Support after the APK was provided to them for investigation.

The iOS BrowserStack configuration is unaffected: the iPhone 15 `LOGIN-01`
test has completed successfully. Keep `BROWSERSTACK_ANDROID_APP_ID` empty
until BrowserStack accepts an Android APK, then set it to the returned app URL.

## Test Users
| Email | Password | Type |
|---|---|---|
| bod@example.com | 10203040 | Standard |
| alice@example.com | 10203040 | Locked Out |
| visual@example.com | 10203040 | Visual Testing |
