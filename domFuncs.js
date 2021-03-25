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
 * @type {HTMLDivElement}
 */
//@ts-ignore
const conclusionStage = document.getElementById('conclusionStage')

/**
 * @type {HTMLUListElement}
 */
// @ts-ignore
const addPlayersList = document.getElementById('addPlayersList')

/**
 * @type {HTMLInputElement}
 */
// @ts-ignore
const addPlayersInput = document.getElementById('addPlayersInput')

// Add player to the game, and prevent that form from refreshing the page!
document.getElementById('addPlayersForm').addEventListener('submit', e => {
	e.preventDefault()
	addPlayerToGame()
})

/**
 * Goes to the "addPlayers" stage
 */
function goToAddPlayersStage() {
	introStage.style.display = 'none'
	addPlayersStage.style.display = 'grid'
}

/**
 * Adds a player to the game
 */
function addPlayerToGame() {
	const listItem = document.createElement('li')
	const name = addPlayersInput.value
	listItem.innerText = name

	// If there already exists a player with this name, get mad!
	if (players.some(player => player.name === name)) {
		alert(`Player with the name "${name}" already exists`)
		return
	} else if (name.length === 0) {
		alert('Name may not be empty')
		return
	}

	addPlayersList.appendChild(listItem)
	addPlayersInput.value = ''

	players.push(new Player(name))
}

/**
 *
 * Submits the cards that the user has toggled
 *
 * @param {Card[]} cardsDisplayed
 * @param {Card[]} cardsUsed
 * @param {Card[]} cardsAvailable
 * @param {Player[]} players
 */
function submitCardsToggled(cardsDisplayed, cardsUsed, cardsAvailable, players) {
	const cardsToggled = cardsDisplayed.filter(card => card.toggled)

	// If they dont have three cards selected, get mad!
	if (cardsToggled.length !== 3) {
		alert('Must have 3 cards only')
	} else if (isSet(cardsToggled[0], cardsToggled[1], cardsToggled[2])) {
		cardsToggled.forEach(card => card.toggle())

		/**
		 * @type {Player}
		 */
		let winner

		// Keep looping through until we get a valid user
		do {
			const input = prompt('This is a set! Which player found this set?')
			winner = players.find(player => player.name === input)

			if (!winner) {
				alert('Player not found')
			}
		} while (!winner)

		winner.incrementScore()

		removeCardsFromDisplayedAddThemToUsedAndRemoveFromScreen(cardsToggled, cardsDisplayed, cardsUsed)

		// If there are less than 12 cards, add some more
		if (cardsDisplayed.length < 12) {
			removeCardsFromAvailableAddThemToDisplayedAndDrawThemToScreen(cardsAvailable, cardsDisplayed, 3)
		}

		// If there are no more cards left, end the game
		if (cardsDisplayed.length === 0) {
			const winner = players.reduce((pers, cur) => (cur.currentScore > pers.currentScore ? cur : pers))
			winner.winCount++
			players.forEach(player => player.updateScore(0))

			// If they don't want to continue, REALLY end the game
			if (
				prompt(`Game Over. ${winner.name} won with ${winner.currentScore} points\n\nPlay again? [y/n]`) === 'y'
			) {
				cardsUsed.splice(0)
				cardsAvailable.push(...generateDeck())

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
 * Goes to the "gameStage"
 */
function goToGameStage() {
	if (players.length === 0) {
		alert('There must be at least one player')
		return
	}

	addPlayersStage.style.display = 'none'
	gameStage.style.display = 'block'

	initSet(players)
}

/**
 * Goes to the "conclusionStage"
 */
function goToConclusionStage() {
	gameStage.style.display = 'none'
	conclusionStage.style.display = 'block'
}
