import { existsSync } from 'fs'
import { resolve } from 'path'

const envPath = resolve(__dirname, '../.env')

if (existsSync(envPath)) {
	process.loadEnvFile(envPath)
}

export const {
	ANDROID_HOME,
	ANDROID_SDK_ROOT,
	BROWSERSTACK_USERNAME,
	BROWSERSTACK_ACCESS_KEY,
	BROWSERSTACK_IOS_APP_ID,
	BROWSERSTACK_ANDROID_APP_ID,
} = process.env
