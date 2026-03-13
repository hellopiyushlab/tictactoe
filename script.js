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
// make playerOne and playerTwo
const playerOne = new createPlayer("Player One", "X");
const playerTwo = new createPlayer("Player Two", "O");

// immediately invoked function expression
// for all the game related functions
// storing the functions inside an object
const gameplay = (() => {

    // an empty array to store moves
    // note: there can be empty spaces in JS arrays
    let tictactoeArray;
    
    // variable to track which player has the control
    let currentPlayer;

    // function for starting the game
    // only calling this from outside for now
    // TO DO: Re Check above statement
    const gameStart = (playerOne) => { // we are always starting the game with playerOne, always
        
        // initialize the tictactoeArray to empty
        // it is crucial in case of restarting the game
        tictactoeArray = [];

        // gameLoop variable is to track if the game is still going on or are we ending it
        let gameLoop = true;
        currentPlayer = playerOne;
        console.log("game started");
        // while gameloop is true, keep taking player choices
        // TO DO: get rid of the loop, we need another way - loop is not optimal
        while (gameLoop) {
            gameplay.askChoice();
        }   
    }

    const askChoice = () => {
        internalChoice = prompt("enter a number from 1 to 9");
        // .canBeFilled is to check if the place we are placing marker at is occupied or not
        gameplay.canBeFilled(internalChoice);
    }

    // function to check if the chosen position is filled already
    const canBeFilled = (choice) => {
        if (choice > 9) { 
            // TO DO: Can remove this check after DOM Manipulation is properly applied
            console.log("enter a smaller number you idiot");
        } else {
            if (choice in tictactoeArray) {
                console.log("position already filled");
                return false;
            } else {
                // if the choice is not filled, send the choice to make move
                gameplay.makeMove(choice);
            }
        }
    }


    // function to make a move
    const makeMove = (choice) => {
        // put the current player marker at the choice index in the tictactoeArray
        tictactoeArray[choice] = currentPlayer.marker;

        // it is after each move is made, that we have to check the winner
        // that is because if there is a winner, there is no need to change player
        // and we can go straight to game ending
        let resultOfCheckWinner = gameplay.checkWinner(choice);
        if (resultOfCheckWinner) {
            // setting gameLoop to false if winning condition was satisfied
            gameLoop = false;
            // since the current player has not changes yet, 
            // we can just check that to know who won
            let winner = currentPlayer;
            console.log(`${winner.name} won the game!`);
            askForRestart();
        } else if (gameplay.isItDraw(tictactoeArray)) {
            drawScreen();
            gameLoop = false;
            askForRestart();
        }

        // if there is a winner, loop would've broken
        // otherwise,
        // change the player
        if (currentPlayer === playerOne) {
            currentPlayer = playerTwo;
        } else {
            currentPlayer = playerOne;
        }
        // makeMove functions ends at changing the player
        // TO DO:   right now the loop exists in the first function that is called, and
        //          and that loop will only break if gameLoop is set to false
        console.log(tictactoeArray);
    }

    
    const checkWinner = (choice) => {
        // code to check if there is a winner

        // 3 matrices that are being used to map out
        // basically, 
        // each 1D array in each 2D array contains indices that, if same, are satisfying the winning condition
        // so, we can traverse in those 1D arrays, and
        // use the values of those 1D arrays to see if
        // those indices are same in tictactoeArray
        // if true, the currentPlayer would've won
        // because we haven't changed the currentPlayer value yet
        let rows        = [ [0,1,2], 
                            [3,4,5], 
                            [6,7,8] ];
        let columns     = [ [0,3,6], 
                            [1,4,7], 
                            [2,5,8] ];
        let diagonals    = [ [0,4,8],
                            [2,4,6] ];

        // finding the position of choice in the arrays
        // we are using linear search, that returns an array in [i,j] form
        positionOfChoiceInRows =        gameplay.linearSearch(rows, choice); // [i,j]
        positionOfChoiceInColumns =     gameplay.linearSearch(columns, choice);
        positionOfChoiceInDiagonals =    gameplay.linearSearch(diagonals, choice);

        // the linearSearch function returns [-1,-1] if it doesn't find our choice
        // hence, we can have 3 sets of check.

        // check winning condition within rows
        
        if (positionOfChoiceInRows[0] !== -1) {
            if (
                // to compare values of tictactoeArray
                // we are using the indexes from rows 2D array
                // and the only 1D array from rows we'll use will be from positionOfChoiceInRows[0]
                // so if I found the position of choice to be at [1,2],
                // rows[positionOfChoiceInRows[0]][0] would mean rows[1][0]
                // and then we can use that as index in tictactoeArray, and 
                // then do our comparison
                tictactoeArray[rows[positionOfChoiceInRows[0]][0]] === tictactoeArray[rows[positionOfChoiceInRows[0]][1]]
                &&
                tictactoeArray[rows[positionOfChoiceInRows[0]][0]] === tictactoeArray[rows[positionOfChoiceInRows[0]][2]]
            ) {
                // return true if the winning condition is satisfied
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
        // check within condition within diagonals 
        if (positionOfChoiceInDiagonals[0] !== -1) {
            if (
                tictactoeArray[diagonals[positionOfChoiceInDiagonals[0]][0]] === tictactoeArray[diagonals[positionOfChoiceInDiagonals[0]][1]]
                &&
                tictactoeArray[diagonals[positionOfChoiceInDiagonals[0]][0]] === tictactoeArray[diagonals[positionOfChoiceInDiagonals[0]][2]]
            ) {
                return true;
            } 
        }
        // TO DO: I may need to enable the following in this:
        // else {
        //     return false;
        // }
    }

    // to check for draw
    const isItDraw = () => {
        // if the length of the array is 9, and all of them are full, there is a draw
        // Object.keys return the keys, in array's case that would be indexes
        // so if they are both 9 and same length, it's a draw   
        if ( tictactoeArray.length === 9 && tictactoeArray.length === Object.keys(tictactoeArray).length) {
            return true;
        } else {
            return false;
        }
    }

    const drawScreen = () => {
       console.log("it's a draw!");
    }

    const askForRestart = () => {
        let doRestart = confirm("Do you want to restart the game?");
        if (doRestart) {
            tictactoeArray = [];
            // TO DO:   this here would be called from eventListener on the restart button all the time, no need to call it from anywhere else
            gameplay.gameStart(playerOne);
        } else {
            // do nothing
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
    
    const putEvents = () => {
        let blocks = document.querySelectorAll(".marker");
        blocks.forEach(
            block => {
                block.addEventListener(
                    "click",
                    (e) => {
                        console.log(e.target);
                    }
                )
            }
        )
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
        askForRestart,
        putEvents
    }
})()

// gameplay.gameStart(playerOne);
gameplay.putEvents();