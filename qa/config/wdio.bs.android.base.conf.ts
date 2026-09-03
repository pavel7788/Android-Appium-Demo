import { APP_PACKAGE, APP_ACTIVITY, APP_WAIT_ACTIVITY } from './app.config'
import { BROWSERSTACK_ANDROID_APP_ID } from './environment.config'

export const browserStackAndroidCapabilities = {
	platformName: 'Android' as const,
	'appium:automationName': 'UiAutomator2',
	'appium:app': BROWSERSTACK_ANDROID_APP_ID,
	'appium:appPackage': APP_PACKAGE,
	'appium:appActivity': APP_ACTIVITY,
	'appium:appWaitActivity': APP_WAIT_ACTIVITY,
	'appium:appWaitDuration': 60000,
	'appium:noReset': false,
	'appium:forceAppLaunch': true,
	'bstack:options': {
		projectName: 'My Demo App Android',
		buildName: `local-${new Date().toISOString()}`,
		debug: true,
	},
}