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
			this.element.style.outline = 'none'
		} else {
			this.element.style.outline = 'solid 2px blue'
		}

		this.toggled = !this.toggled
	}
}

/**
 * @type {HTMLDivElement}
 */
// @ts-ignore
const introStage = document.getElementById('introStage')

/**
 * @type {HTMLDivElement}
 */
// @ts-ignore
const addPlayersStage = document.getElementById('addPlayersStage')

/**
 * @type {HTMLDivElement}
 */
// @ts-ignore
const gameStage = document.getElementById('gameStage')

/**
 * @type {HTMLUListElement}
 */
// @ts-ignore
const addPlayersList = document.getElementById('addPlayersList')

/**
 * @type {Player[]}
 */
const players = []

/**
 * Goes to the "addPlayers" stage
 */
function goToAddPlayersStage() {
	introStage.style.display = 'none'
	addPlayersStage.style.display = 'block'
}

/**
 *
 * @param {Player[]} players
 * @param {string} name
 */
const addPlayerToPlayers = (players, name) => {
	players.push(new Player(name))
}

/**
 *
 */
function addPlayerToGame() {
	/**
	 * @type {HTMLInputElement}
	 */
	// @ts-ignore
	const addPlayersInput = document.getElementById('addPlayersInput')

	const listItem = document.createElement('li')
	const name = addPlayersInput.value
	listItem.innerText = name

	if (players.some(player => player.name === name)) {
		alert(`Player with the name "${name}" already exists`)
		return
	} else if (name.length === 0) {
		alert('Name may not be empty')
		return
	}

	/**
	 * @type {HTMLUListElement}
	 */
	// @ts-ignore
	const addPlayersList = document.getElementById('addPlayersList')

	addPlayersList.appendChild(listItem)
	addPlayersInput.value = ''

	addPlayerToPlayers(players, listItem.innerText)
}

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
 *
 * @param {Player[]} players
 */
const drawPlayersToGameScreen = players => {
	const playerList = document.getElementById('playerList')

	players.forEach(player => {
		playerList.append(player.element)
	})
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
	/**
	 * @type {HTMLDivElement}
	 */
	// @ts-ignore
	const displayedCardsGrid = document.getElementById('displayedCardsGrid')

	cards.forEach(card => {
		displayedCardsGrid.removeChild(card.element)
	})
}

/**
 *
 * @param  {...Card} cards
 */
const drawCardsToScreen = (...cards) => {
	/**
	 * @type {HTMLDivElement}
	 */
	// @ts-ignore
	const displayedCardsGrid = document.getElementById('displayedCardsGrid')

	cards.forEach(card => {
		displayedCardsGrid.appendChild(card.element)
	})
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

	const removed = cardsDisplayed.splice(0, cardsDisplayed.length, ...unselectedCards)
	console.log(removed.length)

	cardsUsed.push(...removed)
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
 * @param {Card[]} cardsDisplayed
 * @param {Card[]} cardsUsed
 * @param {Card[]} cardsAvailable
 * @param {Player[]} players
 */
function submitCardsToggled(cardsDisplayed, cardsUsed, cardsAvailable, players) {
	const cardsToggled = cardsDisplayed.filter(card => card.toggled)

	console.log(cardsToggled)

	if (cardsToggled.length !== 3) {
		alert('Must have 3 cards only')
	} else if (isSet(cardsToggled[0], cardsToggled[1], cardsToggled[2])) {
		cardsToggled.forEach(card => card.toggle())

		/**
		 * @type {Player}
		 */
		let winner

		do {
			const input = prompt('This is a set! Which player found this set?')
			winner = players.find(player => player.name === input)

			if (!winner) {
				alert('Player not found')
			}
		} while (!winner)

		winner.incrementScore()

		removeCardsFromDisplayedAddThemToUsedAndRemoveFromScreen(cardsToggled, cardsDisplayed, cardsUsed)

		if (cardsDisplayed.length < 12) {
			removeCardsFromAvailableAddThemToDisplayedAndDrawThemToScreen(cardsAvailable, cardsDisplayed, 3)
		}

		if (cardsDisplayed.length === 0) {
			const winner = players.reduce((pers, cur) => (cur.currentScore > pers.currentScore ? cur : pers))
			winner.winCount++
			players.forEach(player => player.updateScore(0))

			if (
				prompt(
					`Game Over. ${winner.name} won with ${winner.currentScore} points\n\nContinue playing? [y/n]`
				) === 'y'
			) {
				cardsAvailable.push(...cardsUsed.splice(0))
				removeCardsFromAvailableAddThemToDisplayedAndDrawThemToScreen(cardsAvailable, cardsDisplayed, 12)
			} else {
				goToConclusionStage()
			}
		}
	} else {
		alert('Not a set!')
	}
}

/**
 *
 * @param {Player[]} players
 */
function playSet(players) {
	drawPlayersToGameScreen(players)

	const cardsAvailable = generateDeck()

	/**
	 * @type {Card[]}
	 */
	const cardsDisplayed = []

	/**
	 * @type {Card[]}
	 */
	const cardsUsed = []

	const submitSetButton = document.getElementById('submitSetButton')
	submitSetButton.addEventListener('click', () => {
		submitCardsToggled(cardsDisplayed, cardsUsed, cardsAvailable, players)
	})

	const addMoreCardsButton = document.getElementById('addMoreCardsButton')
	addMoreCardsButton.addEventListener('click', () => {
		removeCardsFromAvailableAddThemToDisplayedAndDrawThemToScreen(cardsAvailable, cardsDisplayed, 3)
	})

	removeCardsFromAvailableAddThemToDisplayedAndDrawThemToScreen(cardsAvailable, cardsDisplayed, 12)
}

function goToGameStage() {
	if (players.length === 0) {
		alert('There must be at least one player')
		return
	}

	addPlayersStage.style.display = 'none'
	gameStage.style.display = 'block'

	playSet(players)
}

function goToConclusionStage() {
	const gameStage = document.getElementById('gameStage')
	const conclusionStage = document.getElementById('conclusionStage')

	gameStage.style.display = 'none'
	conclusionStage.style.display = 'block'
}
