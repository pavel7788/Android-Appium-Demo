import type { Options, Capabilities } from '@wdio/types'
import { browserStackConfig } from './wdio.bs.base.conf'
import { browserStackIosCapabilities } from './wdio.bs.ios.base.conf'

export const config: Options.Testrunner & Capabilities.WithRequestedTestrunnerCapabilities = {
	...browserStackConfig,
	capabilities: [{
		...browserStackIosCapabilities,
		'appium:deviceName': 'iPhone 12',
		'appium:platformVersion': '17',
		'bstack:options': {
			...browserStackIosCapabilities['bstack:options'],
			sessionName: 'iPhone 12 / iOS 17',
		},
	}],
}