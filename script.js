// players will be objects
// a player has the following
//      - name
//      - marker
// we need nothing more for a player, and there seems to be no need of privacy here.
// hence, can make it normal object

// for players only, i will use a constructor

function createPlayer (name, marker) {
    if(!new.target) {
        console.log("createPlayer is a constructor");
        console.log("call with new keyword");
    } else {
        this.name = name,
        this.marker = marker
    }
}
const playerOne = new createPlayer("Player One", "O");
const playerTwo = new createPlayer("Player Two", "X");

// choose first player
// change array value
// check if the current player is a winner
// change the player
// change array value
// check if the current player is a winner
// this will be the gameplay loop

// to make sure the array is not out in open,
// we will use immediately invoked function expression
// return an object of methods to a gameplay variable
// and use the functions from there

const gameplay = (() => {
    // the array for the storing the X and O
    // giving it an additional value of all 1s
    let tictactoeArray = [1,1,1,1,1,1,1,1,1];
    let currentPlayer;
    // function that starts the game
    // this function will be called the moment page is loaded
    const gameStart = (playerOne, playerTwo) => {
        // for now, starting with playerOne by default  
        currentPlayer = playerOne;
        console.log("game started");
    }
    // this function is called everytime a move is made
    const makeMove = (choice) => {
        tictactoeArray[choice-1] = currentPlayer.marker;
        // change the player
        if (currentPlayer === playerOne) {
            currentPlayer = playerTwo;
        } else {
            currentPlayer = playerOne;
        }
        console.log(tictactoeArray);
    }
    const checkWinner = () => {
        // code to check if there is a winner
        let someoneWon = true;

        // if there is a winner, break the gameloop
        if (someoneWon = true) {
            gameLoop = false;
        }
    }
    return {
        gameStart,
        makeMove,
        checkWinner
    }
})()

gameplay.gameStart(playerOne, playerTwo);
let gameLoop = true;
while (gameLoop === true) {
    let choice = prompt("choose a number between 1 and 10");
    gameplay.makeMove(choice);
    gameplay.checkWinner();
}