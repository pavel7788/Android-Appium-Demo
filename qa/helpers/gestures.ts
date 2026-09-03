export async function swipeUp(): Promise<void> {
	if (driver.isIOS) {
		await driver.execute('mobile: swipe', { direction: 'up' })
		return
	}

	const { width, height } = await driver.getWindowSize()
	await driver.execute('mobile: swipeGesture', {
		left: 0,
		top: Math.round(height * 0.3),
		width,
		height: Math.round(height * 0.4),
		direction: 'up',
		percent: 0.8,
	})
}

export async function dismissKeyboard(): Promise<void> {
	if (!driver.isIOS) return

	const returnKey = $('-ios predicate string:type == "XCUIElementTypeButton" AND (name == "Done" OR name == "Return" OR name == "return")')
	if (await returnKey.isExisting()) {
		await returnKey.click()
		return
	}

	await driver.keys(['\uE007'])
}