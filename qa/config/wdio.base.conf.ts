import type { Options } from '@wdio/types'
import { rmSync, mkdirSync } from 'fs'
import { resolve } from 'path'
import './environment.config'
import { APP_PACKAGE, APP_ACTIVITY, APP_WAIT_ACTIVITY } from './app.config'

export const baseCapabilities = {
    platformName: 'Android' as const,
    'appium:automationName': 'UiAutomator2',
    'appium:avdArgs': process.env.HEADLESS === 'true'
        ? '-no-snapshot-load -no-window'
        : '-no-snapshot-load',
    'appium:avdLaunchTimeout': 300000,
    'appium:avdReadyTimeout': 300000,
    'appium:app': resolve(__dirname, '../../app/build/outputs/apk/debug/app-debug.apk'),
    'appium:appPackage': APP_PACKAGE,
    'appium:appActivity': APP_ACTIVITY,
    'appium:appWaitActivity': APP_WAIT_ACTIVITY,
    'appium:appWaitDuration': 60000,
    'appium:noReset': true,
    'appium:forceAppLaunch': true,
    'appium:adbExecTimeout': 60000,
}

export const baseConfig: Omit<Options.Testrunner, 'capabilities'> = {
    runner: 'local',
    port: 4723,

    specs: ['../tests/**/*.ts'],
    exclude: [],

    maxInstances: 1,

    services: [['appium', {
        logPath: 'logs',
    }]],

    logLevel: 'error',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 300000,
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