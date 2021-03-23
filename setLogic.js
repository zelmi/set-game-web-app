/**
 *
 * @typedef {HTMLDivElement} CardElement
 */

/**
 *
 * @param {Player} player
 */
const createPlayerElement = player => {
	const newListItem = document.createElement('li')
	newListItem.innerText = `${player.name}: ${player.currentScore}`
	return newListItem
}

/**
 *
 * @param {string} name
 */
function Player(name) {
	this.name = name
	this.currentScore = 0
	this.winCount = 0

	this.element = createPlayerElement(this)

	this.updateScore = function (score) {
		this.element.innerText = `${this.name}: ${score}`
	}

	this.incrementScore = function () {
		this.updateScore(++this.currentScore)
	}

	this.drawToScreen = function () {
		document.getElementById('playerList').appendChild(this.element)
	}
}

/**
 * @param {Card} card
 * @returns {CardElement}
 */
const createCardElement = card => {
	/**
	 * @type {HTMLDivElement}
	 */
	//@ts-ignore
	const cardElement = new DOMParser()
		.parseFromString(
			`
		<div class="card">
			<img src="images/${card.amount}_${card.color}_${card.shading}_${card.symbol}.png">
		</div>
	`,
			'text/html'
		)
		.documentElement.getElementsByClassName('card')[0]

	cardElement.addEventListener('click', () => card.toggle())

	return cardElement
}

/**
 *
 */
function Card(amount, color, symbol, shading) {
	this.amount = amount
	this.color = color
	this.symbol = symbol
	this.shading = shading
	this.toggled = false
	this.element = createCardElement(this)

	/**
	 * @param {Card} otherCard
	 * @returns {boolean}
	 */
	this.equals = function (otherCard) {
		return (
			this.amount === otherCard.amount &&
			this.color === otherCard.color &&
			this.symbol === otherCard.symbol &&
			this.shading === otherCard.shading
		)
	}

	this.toggle = () => {
		if (this.toggled) {
			this.element.style.outline = 'solid 1px black'
		} else {
			this.element.style.outline = 'solid 2px blue'
		}

		this.toggled = !this.toggled
	}

	this.addToScreen = function () {
		document.getElementById('displayedCardsGrid').appendChild(this.element)
	}

	this.removeFromScreen = function () {
		document.getElementById('displayedCardsGrid').removeChild(this.element)
	}
}

/**
 * @type {Player[]}
 */
const players = []

/**
 *
 * @param {Card[]} cardsAvailable
 * @param {Card[]} cardsDisplayed
 * @param {number} amount
 */
const addCardsToDisplayedFromAvailable = (cardsAvailable, cardsDisplayed, amount) => {
	cardsDisplayed.push(...cardsAvailable.splice(0, amount))
}

/**
 * @returns {Card[]}
 */
const generateDeck = () => {
	/**
	 * @type {Card[]}
	 */
	const deck = []

	for (let amount = 1; amount <= 3; amount++) {
		for (const color of ['purple', 'green', 'red']) {
			for (const symbol of ['oval', 'diamond', 'squiggly']) {
				for (const shading of ['striped', 'solid', 'empty']) {
					deck.push(new Card(amount, color, symbol, shading))
				}
			}
		}
	}

	return deck.sort(() => 0.5 - Math.random())
}

/**
 *
 * @param  {Card} cardOne
 * @param  {Card} cardTwo
 * @param  {Card} cardThree
 * @returns {boolean}
 */
const isSet = (cardOne, cardTwo, cardThree) => {
	const allSameAmount = cardOne.amount === cardTwo.amount && cardTwo.amount === cardThree.amount
	const allDifferentAmount = cardOne.amount !== cardTwo.amount && cardTwo.amount !== cardThree.amount
	const allSameOrDifferentAmount = allSameAmount || allDifferentAmount

	const allSameColor = cardOne.color === cardTwo.color && cardTwo.color === cardThree.color
	const allDifferentColor = cardOne.color !== cardTwo.color && cardTwo.color !== cardThree.color
	const allSameOrDifferentColor = allSameColor || allDifferentColor

	const allSameSymbol = cardOne.symbol === cardTwo.symbol && cardTwo.symbol === cardThree.symbol
	const allDifferentSymbol = cardOne.symbol !== cardTwo.symbol && cardTwo.symbol !== cardThree.symbol
	const allSameOrDifferentSymbol = allSameSymbol || allDifferentSymbol

	const allSameShading = cardOne.shading === cardTwo.shading && cardTwo.shading === cardThree.shading
	const allDifferentShading = cardOne.shading !== cardTwo.shading && cardTwo.shading !== cardThree.shading
	const allSameOrDifferentShading = allSameShading || allDifferentShading

	return allSameOrDifferentAmount && allSameOrDifferentColor && allSameOrDifferentSymbol && allSameOrDifferentShading
}

/**
 *
 * @param  {...Card} cards
 */
const removeCardsFromScreen = (...cards) => {
	cards.forEach(card => card.removeFromScreen())
}

/**
 *
 * @param  {...Card} cards
 */
const drawCardsToScreen = (...cards) => {
	cards.forEach(card => card.addToScreen())
}

/**
 *
 * @param {Card[]} cardsAvailable
 * @param {Card[]} cardsDisplayed
 * @param {number} amount
 * @returns {Card[]}
 */
const removeCardsFromAvailableAddThemToDisplayed = (cardsAvailable, cardsDisplayed, amount) => {
	const cards = cardsAvailable.splice(0, amount)
	cardsDisplayed.push(...cards)
	return cards
}

/**
 *
 * @param {Card[]} cardsAvailable
 * @param {Card[]} cardsDisplayed
 * @param {number} amount
 */
const removeCardsFromAvailableAddThemToDisplayedAndDrawThemToScreen = (cardsAvailable, cardsDisplayed, amount) => {
	const cards = removeCardsFromAvailableAddThemToDisplayed(cardsAvailable, cardsDisplayed, amount)
	drawCardsToScreen(...cards)
}

/**
 *
 * @param {Card[]} cards
 * @param {Card[]} cardsDisplayed
 * @param {Card[]} cardsUsed
 */
const removeCardsFromDisplayedAddThemToUsed = (cards, cardsDisplayed, cardsUsed) => {
	const unselectedCards = cardsDisplayed.filter(card => {
		return !card.equals(cards[0]) && !card.equals(cards[1]) && !card.equals(cards[2])
	})

	const removedDisplayedCards = cardsDisplayed.splice(0, cardsDisplayed.length, ...unselectedCards)

	cardsUsed.push(...removedDisplayedCards)
}

/**
 *
 * @param {Card[]} cards
 * @param {Card[]} cardsDisplayed
 * @param {Card[]} cardsUsed
 */
const removeCardsFromDisplayedAddThemToUsedAndRemoveFromScreen = (cards, cardsDisplayed, cardsUsed) => {
	removeCardsFromDisplayedAddThemToUsed(cards, cardsDisplayed, cardsUsed)
	removeCardsFromScreen(...cards)
}

/**
 *
 * @param {Player[]} players
 */
const playSet = players => {
	players.forEach(player => player.drawToScreen())

	const cardsAvailable = generateDeck()

	/**
	 * @type {Card[]}
	 */
	const cardsDisplayed = []

	/**
	 * @type {Card[]}
	 */
	const cardsUsed = []

	document.getElementById('submitSetButton').addEventListener('click', () => {
		submitCardsToggled(cardsDisplayed, cardsUsed, cardsAvailable, players)
	})

	document.getElementById('addMoreCardsButton').addEventListener('click', () => {
		removeCardsFromAvailableAddThemToDisplayedAndDrawThemToScreen(cardsAvailable, cardsDisplayed, 3)
	})

	removeCardsFromAvailableAddThemToDisplayedAndDrawThemToScreen(cardsAvailable, cardsDisplayed, 12)
}
