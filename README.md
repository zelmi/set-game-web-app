#Game of Set (Reloaded)
"Set" is a card game in which players attempt to find a group of cards that satisfy a particular criterion. It is a speed game: 12 cards are dealt face-up, and the players try to be the first to make a set from the visible cards. For a complete description of the game see the [Wikipedia entry](<https://en.wikipedia.org/wiki/Set_(card_game)>).

The entirety of this game is programmed in ruby. It is a text-based game that starts with the user typing in the name of the players, each name separated by a space. After typing the names and hitting enter, the console prints out 12 cards for the user to pick. Listed from top-to-bottom for each card is the card number, the color of the symbols, the symbol, the shading of the symbols, and the number of symbols on the card. In order to pick out a set, type in the name of the player identifying the set and the card numbers of the three cards being identified, separated by spaces. After hitting enter, the console will then tell you if the cards identified is a set or not. If not a set, the console will ask you to try again and print the same twelve cards again. Otherwise, the game will reward the respective player with a point and replace the identified cards with three new ones.

If the player is unable to find any sets, then hitting enter without typing anything into the console will add three more cards to the display. The player may do this as many times as needed to find a set. If the player wishes to quit during the game, either because they can't find any more sets or they want to stop playing, they can enter "quit", and the game will prompt them asking if they are ready to quit, which they can input "yes" or "y" to confirm. The game will then end.
Once the game ends, the game will announce which player is the winner and the number of points they scored. The user will then be asked if they want to play again. If the user inputs "no" or "n", then the program will terminate and the game is officially over. Otherwise the game will keep track of the previous winners and add their win to a win tally, and the game will start again and reshuffle the deck to lay out a new set of 12 cards to start with.

## How to play this project

To run the game, navigate to the downloaded folder, and then the src folder, and then open the included index.html file in Mozilla Firefox.

To add players, click "continue" on the homepage and then enter individual player names clicking the add player button after each player name is entered.

Player who first sees a set clicks on the three cards which are believe to be a set. Click the "Submit Set" button at the bottom of the screen, and then enter the player name of who found it.

To add additional cards to the screen from the deck, click the "Add More Cards" button on the right hand side of the screen.

On the right hand side of the screen, a scoreboard is shown. The first number next to a players name is their number of sets found in the current game, and the second is the number of games won. 

After no remaining cards are showing on the screen, a winner is declared, and the user is prompted to continue playing or not. 

## Extra Features

Scoreboard functionality to keep track of individual player wins.

## Contributions

### Team: //Todo: Make team name

Esther Hu

Evan Hubert

Zehur Elmi

Nick Springer

