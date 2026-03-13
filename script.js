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
const ttt = (() => {

    let currentPlayer = playerOne;
    let gameActive = true;
    let tictactoeArray = [];

    const gameStart = () => {
        currentPlayer = playerOne;
        gameActive = true;
    }

   
    let blocks = document.querySelectorAll(".block");
    blocks.forEach(
        block => {
            block.addEventListener(
                "click",
                (e) => {
                    if (!gameActive) return;
                    console.log(e.target);
                    const index = Number(e.currentTarget.dataset.index);
                    const iconTag = block.querySelector(".marker");
                    console.log(iconTag);
                    console.log(index);
                    let legalMove = preliminaryCheck(index);
                    if (legalMove) {
                        ttt.makeMove(currentPlayer.marker, index, iconTag);
                        let someoneWon = checkWinner(index);
                        let draw = isItDraw();
                        if (someoneWon || draw) {
                            ttt.gameEnd(someoneWon, draw, blocks);
                        } else {
                            currentPlayer = changePlayer();
                        }
                    }
                }
            )
        }
    )

  
    

    const changePlayer = () => {
        if (currentPlayer === playerOne) {
            return playerTwo;
        } else if (currentPlayer === playerTwo) {
            return playerOne;
        }
    }

    const gameEnd = (someoneWon, draw) => {
        if (someoneWon) {
            console.log(`${currentPlayer.name} with marker '${currentPlayer.marker}' won!`);
            document.querySelector("h2").textContent = `${currentPlayer.name} with marker '${currentPlayer.marker}' won!`;
            gameActive = false;
        } else if (draw) {
            document.querySelector("h2").textContent =  "It's a Draw..."
            console.log("game draw!");
            gameActive = false;
        }
    }

    const restart = (blocks) => {
        ttt.gameStart();
        blocks.forEach(block => {
            iconTag = block.querySelector(".marker");
            iconTag.classList.remove("fa-o", "fa-x");
            document.querySelector("h2").textContent = "-----";
        });
        tictactoeArray = [];
    }

    let restartButton = document.querySelector(".restart-button");
    restartButton.addEventListener("click", () => restart(blocks));

    const makeMove = (marker, index, icon) => {
        // add the marker in the array
        tictactoeArray[index] = marker;
        // show the marker on the screen
        // according to the marker of current player
        if (marker === "O") {
            icon.classList.add("fa-o");
        } else if (marker === "X") {
            icon.classList.add("fa-x");
        }
    }

    const preliminaryCheck = (index) => {
        if (index in tictactoeArray) {
            return false;
        } else {
            return true;
        }
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
        let positionOfChoiceInRows =        ttt.linearSearch(rows, choice); // [i,j]
        let positionOfChoiceInColumns =     ttt.linearSearch(columns, choice);
        let positionOfChoiceInDiagonals =    ttt.linearSearch(diagonals, choice);

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
        else {
            return false;
        }
    }
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

    const footer = document.querySelector(".footer");
    footer.addEventListener("click", () => {
        window.open("https://github.com/hellopiyushlab/tictactoe", "_blank");
    })
    
    return {
        checkWinner,
        linearSearch,
        gameStart,
        preliminaryCheck,
        makeMove,
        isItDraw,
        gameEnd,
        changePlayer,
        restart
    }
})()

ttt.gameStart();