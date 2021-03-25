# Game of Set (Reloaded)
"Set" is a card game in which players attempt to find a group of cards that satisfy a particular criterion. It is a speed game: 12 cards are dealt face-up, and the players try to be the first to make a set from the visible cards. For a complete description of the game see the [Wikipedia entry](<https://en.wikipedia.org/wiki/Set_(card_game)>).

The entirety of this game is programmed in JavaScript, HTML, and CSS. It is a web-based game that starts with the user entering individual player names. After clicking continue at the bottom of the screen, the game will display 12 cards for the players to differentiate sets from. In order to pick out a set, click the three individual cards which the player thinks are a set, and then hit submit set on the right hand side of the screen. The game will alert the user if the selected cards are a set or not. If the user has found a set, the game will alert the user to enter the player name of who found the set. The game will reward that player with a point. The point totals are reflected in the Scoreboard section of the game on the right hand side of the screen. 

If a player is unable to find any sets, hitting the add more cards button on the right hand side of the screen will add three more cards to the screen. The player may do this as many times as needed to find a set. Once all cards have been taken from the deck, and there are no more cards showing on the screen, the game will prompt the user if they want to play again. If the user desires to play again, the game will reset all player set scores, will give a games won point to the player who won the last game, and will reshuffle the deck to lay out a new set of 12 cards to start with. 

## How to Play This Project

To run the game, navigate to the downloaded folder, and then the src folder, and then open the included index.html file in Mozilla Firefox.

To add players, click "Continue" on the homepage and then enter individual player names clicking the "Add Player" button, or hitting enter, after each player name is entered.

Player who first sees a set clicks on the three cards which are believe to be a set, then clicks the "Submit Set" button at the bottom of the screen, and then enters the player name of who found it.

To add additional cards to the screen from the deck, click the "Add More Cards" button on the right hand side of the screen.

On the right hand side of the screen, a scoreboard is shown. The first number next to a players name is their number of sets found in the current game and the second number is the number of games won. 

After no remaining cards are showing on the screen, a winner is declared, and the user is prompted to continue playing or not. 

## Testing

Within the src folder of the project, there is a tests.js file. To run these tests, set the TESTING const to true. If you do not want to run these tests, set it to false. 

If the tests are run, the results of the tests are printed to the console within Mozilla Firefox.

## Extra Features

Scoreboard functionality to keep track of individual player wins.

Responsiveness of page to adapt to different window sizes. To test responsivenss, use the browser dev tools within Mozilla Firefox.

## Contributions

### Team: //Todo: Make team name

Esther Hu

Evan Hubert

Zehur Elmi

Nick Springer

