import type { Options, Capabilities } from '@wdio/types'
import { rmSync, mkdirSync } from 'fs'
import './config/environment.config'
import { APP_PACKAGE, APP_ACTIVITY } from './config/app.config'

export const config: Options.Testrunner & Capabilities.WithRequestedTestrunnerCapabilities = {
    runner: 'local',
    port: 4723,

    specs: ['./tests/**/*.ts'],
    exclude: [],

    maxInstances: 1,

    capabilities: [{
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': 'emulator-5554',
        'appium:avd': 'Medium_Phone',
        'appium:avdArgs': '-no-snapshot-load',
        'appium:avdLaunchTimeout': 120000,
        'appium:avdReadyTimeout': 120000,
        'appium:appPackage': APP_PACKAGE,
        'appium:appActivity': APP_ACTIVITY,
        'appium:noReset': true,
        'appium:forceAppLaunch': true,
        'appium:adbExecTimeout': 60000,
    }],

    services: [['appium', {
        logPath: 'logs',
    }]],

    logLevel: 'error',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    framework: 'mocha',
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: true,
        }],
    ],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
    },

    onPrepare(): void {
        rmSync('allure-results', { recursive: true, force: true })
        mkdirSync('allure-results')
    },

}
