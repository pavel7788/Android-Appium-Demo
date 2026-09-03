import { APP_PACKAGE } from '../config/app.config'

type PlatformSelector = {
	android: string
	ios: string
}

type IosElementType =
	| 'Button'
	| 'Other'
	| 'SecureTextField'
	| 'StaticText'
	| 'TextField'

const escapePredicateValue = (value: string): string =>
	value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')

export const platformSelector = ({ android, ios }: PlatformSelector): string =>
	driver.isIOS ? ios : android

export const androidId = (resourceId: string): string =>
	`android=new UiSelector().resourceId(${JSON.stringify(`${APP_PACKAGE}:id/${resourceId}`)})`

export const iosId = (accessibilityId: string): string => `~${accessibilityId}`

export const iosType = (type: IosElementType): string =>
	`-ios class chain:**/XCUIElementType${type}`

export const iosElement = (type: IosElementType, value: string): string => {
	const escapedValue = escapePredicateValue(value)
	return `-ios predicate string:type == "XCUIElementType${type}" AND (name == "${escapedValue}" OR label == "${escapedValue}" OR value == "${escapedValue}")`
}

export const exactText = (value: string): string => {
	const escapedValue = escapePredicateValue(value)
	return platformSelector({
		android: `android=new UiSelector().text(${JSON.stringify(value)})`,
		ios: `-ios predicate string:name == "${escapedValue}" OR label == "${escapedValue}" OR value == "${escapedValue}"`,
	})
}

export const containsText = (value: string): string => {
	const escapedValue = escapePredicateValue(value)
	return platformSelector({
		android: `android=new UiSelector().textContains(${JSON.stringify(value)})`,
		ios: `-ios predicate string:name CONTAINS "${escapedValue}" OR label CONTAINS "${escapedValue}" OR value CONTAINS "${escapedValue}"`,
	})
}

export const iosAlertMessage =
	'//XCUIElementTypeAlert//XCUIElementTypeStaticText[last()]'