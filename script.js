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
const playerOne = new createPlayer("Player One", "X");
const playerTwo = new createPlayer("Player Two", "O");

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
    const gameStart = (playerOne) => {
        // for now, starting with playerOne by default  
        currentPlayer = playerOne;
        console.log("game started");
    }

    const askChoice = () => {
        internalChoice = prompt("enter a number from 1 to 9");
        gameplay.canBeFilled(internalChoice);
    }

    // function to check if the chosen position is filled already
    const canBeFilled = (choice) => {
        if (choice > 9) {
            console.log("enter a smaller number you idiot");
        } else {
            if (choice in tictactoeArray) {
                console.log("position already filled");
                return false;
            } else {
                gameplay.makeMove(choice);
            }
        }
    }


    // function to make a move
    const makeMove = (choice) => {
        tictactoeArray[choice] = currentPlayer.marker;

        // check winner before changing player
        let resultOfCheckWinner = gameplay.checkWinner(choice);
        if (resultOfCheckWinner) {
            gameLoop = false;
            // since the current player has not changes yet, 
            // we can just check that to know who won
            let winner = currentPlayer;
            console.log(`${winner.name} won the game!`);
        } else if (gameplay.isItDraw(tictactoeArray)) {
            drawScreen();
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

    // to check for draw
    const isItDraw = () => {
        if ( tictactoeArray.length === 9 && tictactoeArray.length === Object.keys(tictactoeArray).length) {
            return true;
        } else {
            return false;
        }
    }

    const drawScreen = () => {
       console.log("it's a draw!");
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
        linearSearch,
        canBeFilled,
        askChoice,
        isItDraw,
        drawScreen,
    }
})()

gameplay.gameStart(playerOne);
let gameLoop = true;

// NOTE: We need to avoid this while loop when working with events in browser
while (gameLoop === true) {
    gameplay.askChoice();
}