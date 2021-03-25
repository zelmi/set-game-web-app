const TESTING = true

if (TESTING) {
	// Test dummy data
	const cardOne = new Card(1, 'purple', 'oval', 'striped')
	const cardTwo = new Card(2, 'green', 'diamond', 'solid')
	const cardThree = new Card(3, 'red', 'squiggly', 'empty')

	// Tests
	const tests = {
		isSet: () => {
			return isSet(cardOne, cardTwo, cardThree) === true
		},
		removeCardsFromAvailableAddThemToDisplayed: () => {
			const cardsAvailable = [cardOne, cardTwo, cardThree]
			const cardsDisplayed = []

			const removedCards = removeCardsFromAvailableAddThemToDisplayed(cardsAvailable, cardsDisplayed, 3)

			return removedCards.length === 3 && cardsAvailable.length === 0 && cardsDisplayed.length === 3
		},
		removeCardsFromDisplayedAddThemToUsed: () => {
			const cardsDisplayed = [cardOne, cardTwo, cardThree]
			const cardsUsed = []

			removeCardsFromDisplayedAddThemToUsed([cardOne, cardTwo, cardThree], cardsDisplayed, cardsUsed)

			return cardsDisplayed.length === 0 && cardsUsed.length === 3
		}
	}

	// Does the testing functionality

	let numFailures = 0

	const testKeys = Object.keys(tests)

	testKeys
		.map(key => [key, tests[key]])
		.forEach(([name, test]) => {
			if (test()) {
				console.log(`Test "${test.name}" passed`)
			} else {
				numFailures++
				console.error(`Test "${test.name}" failed`)
			}
		})

	if (numFailures === 0) {
		console.log(`All ${testKeys.length} tests passed`)
	} else {
		console.error(`${numFailures} tests failed!`)
	}
}
