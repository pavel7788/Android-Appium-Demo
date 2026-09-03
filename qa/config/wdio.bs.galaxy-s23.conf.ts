import type { Options, Capabilities } from '@wdio/types'
import { browserStackConfig } from './wdio.bs.base.conf'
import { browserStackAndroidCapabilities } from './wdio.bs.android.base.conf'

export const config: Options.Testrunner & Capabilities.WithRequestedTestrunnerCapabilities = {
	...browserStackConfig,
	specs: ['../tests/*.test.ts'],
	capabilities: [{
		...browserStackAndroidCapabilities,
		'appium:deviceName': 'Samsung Galaxy S23',
		'appium:platformVersion': '13.0',
		'bstack:options': {
			...browserStackAndroidCapabilities['bstack:options'],
			sessionName: 'Samsung Galaxy S23 / Android 13',
		},
	}],
}