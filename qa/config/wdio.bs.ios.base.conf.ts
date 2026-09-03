import { BROWSERSTACK_IOS_APP_ID } from './environment.config'

export const browserStackIosCapabilities = {
	platformName: 'iOS' as const,
	'appium:automationName': 'XCUITest',
	'appium:app': BROWSERSTACK_IOS_APP_ID,
	'appium:noReset': false,
	'bstack:options': {
		projectName: 'My Demo App iOS',
		buildName: `local-${new Date().toISOString()}`,
		debug: true,
	},
}