// createPlayer factory function
function createPlayer (name, marker) {
    var name = name;
    var marker = marker;
    return {
        name,
        marker
    };
}

// creating player objects
const playerOne = createPlayer('john', 'O');
const playerTwo = createPlayer('kaisen', 'X');

// Immediately Invoked Function Expression For Gameplay 
const gameplay = (() => {
    const arrayofmoves = [
        // implementing a single dimension array for now
        1,1,1,1,1,1,1,1,1
    ];
    const playerTurn = (player) => {
        let position = prompt( "enter position from 1 to 9");
        arrayofmoves[position-1] = player.marker;
        // testing if it's working
        console.log(arrayofmoves)
    }
    return {playerTurn};
})();
const winner = 0;
while (winner!=playerOne && winner!=playerTwo) {
    gameplay.playerTurn(playerOne);
    gameplay.playerTurn(playerTwo);
}