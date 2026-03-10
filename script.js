// creating player objects

function createPlayer (name, marker) {
    var name = name;
    var marker = marker;
    return {
        name,
        marker
    };
}

const playerOne = createPlayer('human', 'O');
const playerTwo = createPlayer('computer', 'X');