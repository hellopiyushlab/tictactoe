// Constructor for making players, used only twice
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

// immediately invoked function expression
// for all the game related functions
const gameplay = (() => {

    // array to store the moves
    // let tictactoeArray = [1,1,1,1,1,1,1,1,1];
    let tictactoeArray = [];
    
    // variable for current player
    let currentPlayer;

    // function that starts the game
    // this function will be called the moment page is loaded
    const gameStart = (playerOne, playerTwo) => {
        // for now, starting with playerOne by default  
        currentPlayer = playerOne;
        console.log("game started");
    }

    // function to make a move
    const makeMove = (choice) => {
        tictactoeArray[choice] = currentPlayer.marker;

        // check winner before changing player
        let resultOfCheckWinner = gameplay.checkWinner(choice);
        if (resultOfCheckWinner) {
            gameLoop = false;
            console.log("someone won, idk who tho")
        }

        // if there is a winner, loop would've broken
        // otherwise,
        // change the player
        if (currentPlayer === playerOne) {
            currentPlayer = playerTwo;
        } else {
            currentPlayer = playerOne;
        }
        console.log(tictactoeArray);
    }
    const checkWinner = (choice) => {
        // code to check if there is a winner

        let rows        = [ [0,1,2], 
                            [3,4,5], 
                            [6,7,8] ];
        let columns     = [ [0,3,6], 
                            [1,4,7], 
                            [2,5,8] ];
        let diagnols    = [ [0,4,8],
                            [2,4,6] ];

        // finding the position of choice in the arrays
        positionOfChoiceInRows =        gameplay.linearSearch(rows, choice); // [0,0]
        positionOfChoiceInColumns =     gameplay.linearSearch(columns, choice);
        positionOfChoiceInDiagnols =    gameplay.linearSearch(diagnols, choice);

        // check winning condition within rows
        if (positionOfChoiceInRows[0] !== -1) {
            if (
                tictactoeArray[rows[positionOfChoiceInRows[0]][0]] === tictactoeArray[rows[positionOfChoiceInRows[0]][1]]
                &&
                tictactoeArray[rows[positionOfChoiceInRows[0]][0]] === tictactoeArray[rows[positionOfChoiceInRows[0]][2]]
            ) {
                return true;
            } 
        }
        // check winning condition within columns
        if (positionOfChoiceInColumns[0] !== -1) {
            if (
                tictactoeArray[columns[positionOfChoiceInColumns[0]][0]] === tictactoeArray[columns[positionOfChoiceInColumns[0]][1]]
                &&
                tictactoeArray[columns[positionOfChoiceInColumns[0]][0]] === tictactoeArray[columns[positionOfChoiceInColumns[0]][2]]
            ) {
                return true;
            }
        }
        // check within condition within diagnols 
        if (positionOfChoiceInDiagnols[0] !== -1) {
            if (
                tictactoeArray[diagnols[positionOfChoiceInDiagnols[0]][0]] === tictactoeArray[diagnols[positionOfChoiceInDiagnols[0]][1]]
                &&
                tictactoeArray[diagnols[positionOfChoiceInDiagnols[0]][0]] === tictactoeArray[diagnols[positionOfChoiceInDiagnols[0]][2]]
            ) {
                return true;
            } 
        }
    }
    // this linear search algorithm will find the location of the choice in the winning condition arrays
    const linearSearch = (array, choice) => {
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array[i].length; j++) {
                if (array[i][j] == choice) {
                    return [i, j];
                }
            }
        }
        return [-1, -1];
    }
    return {
        gameStart,
        makeMove,
        checkWinner,
        linearSearch
    }
})()

gameplay.gameStart(playerOne, playerTwo);
let gameLoop = true;
while (gameLoop === true) {
    let choice = prompt("choose a number between 1 and 10");
    gameplay.makeMove(choice);
}