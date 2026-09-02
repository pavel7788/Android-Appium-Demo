import type { Options, Capabilities } from '@wdio/types'
import { baseCapabilities, baseConfig } from './wdio.base.conf'

export const config: Options.Testrunner & Capabilities.WithRequestedTestrunnerCapabilities = {
    ...baseConfig,
    capabilities: [{
        ...baseCapabilities,
        'appium:deviceName': 'Medium_Phone',
        'appium:avd': 'Medium_Phone',
    }],
}