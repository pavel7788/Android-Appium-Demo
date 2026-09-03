import type { Options } from '@wdio/types'
import { baseConfig } from './wdio.base.conf'
import {
    BROWSERSTACK_USERNAME,
    BROWSERSTACK_ACCESS_KEY,
} from './environment.config'

export const browserStackConfig: Omit<Options.Testrunner, 'capabilities'> = {
    ...baseConfig,
    hostname: 'hub-cloud.browserstack.com',
    port: 443,
    protocol: 'https',
    path: '/wd/hub',
    user: BROWSERSTACK_USERNAME,
    key: BROWSERSTACK_ACCESS_KEY,
    services: [],
}