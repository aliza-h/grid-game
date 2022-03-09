// arr of objects
// Each object is the cell.
    // Properties:
    // Everything about the cell (what's in it, which color team, etc.)
// row x col

let gameBoard = document.getElementById("game-board"); // the game board

let alphabetStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let cellArr = []; // the array of cell objects

for (let row = 1; row <= 10; row++) { // creates the rows
    let gameRow = document.createElement("div");
    gameRow.className = "game-row";
    gameRow.id = row;
    gameBoard.appendChild(gameRow); // adds row to board

    for (let col = 1; col <= 10; col++) { // creates cells
        let gameCell = document.createElement("div");
        gameCell.className = "game-cell";
        gameCell.id = alphabetStr[row - 1] + col;
        gameRow.appendChild(gameCell); // adds cell to board

        cellArr.push({ // creates a new object for the current cell
            "id" : gameCell.id,
        });
    }
}


// EACH CELL HAS
    // ID
    // obstacle/no obstacle
    // player/no player

