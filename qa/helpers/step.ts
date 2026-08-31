import AllureReporter from '@wdio/allure-reporter'
import { Status } from 'allure-js-commons'

export async function step<T>(name: string, fn: () => Promise<T>): Promise<T> {
    AllureReporter.startStep(name)
    try {
        const result = await fn()
        AllureReporter.endStep(Status.PASSED)
        return result
    } catch (e) {
        AllureReporter.endStep(Status.FAILED)
        if (e instanceof Error && e.stack) {
            // Strip allure-internal frames so the spec reporter shows the real error location
            e.stack = e.stack.split('\n').filter(line => !line.includes('allure')).join('\n')
        }
        throw e
    }
}
