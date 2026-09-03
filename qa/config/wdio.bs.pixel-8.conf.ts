import type { Options, Capabilities } from '@wdio/types'
import { browserStackConfig } from './wdio.bs.base.conf'
import { browserStackAndroidCapabilities } from './wdio.bs.android.base.conf'

export const config: Options.Testrunner & Capabilities.WithRequestedTestrunnerCapabilities = {
	...browserStackConfig,
	specs: ['../tests/*.test.ts'],
	capabilities: [{
		...browserStackAndroidCapabilities,
		'appium:deviceName': 'Google Pixel 8',
		'appium:platformVersion': '14.0',
		'bstack:options': {
			...browserStackAndroidCapabilities['bstack:options'],
			sessionName: 'Google Pixel 8 / Android 14',
		},
	}],
}