import type { Options, Capabilities } from '@wdio/types'
import { baseCapabilities, baseConfig } from './wdio.base.conf'

export const config: Options.Testrunner & Capabilities.WithRequestedTestrunnerCapabilities = {
    ...baseConfig,
    capabilities: [{
        ...baseCapabilities,
        'appium:deviceName': 'Pixel_7_API_34',
        'appium:avd': 'Pixel_7_API_34',
    }],
}