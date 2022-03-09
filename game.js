// arr of objects
// Each object is the cell.
    // Properties:
    // Everything about the cell (what's in it, which color team, etc.)
// row x col

let gameBoard = document.getElementById("game-board");

let alphabetStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

for (let row = 1; row <= 10; row++) {
    let gameRow = document.createElement("div");
    gameRow.className = "game-row";
    gameRow.id = row;
    gameBoard.appendChild(gameRow);

    for (let col = 1; col <= 10; col++) {
        let gameCell = document.createElement("div");
        gameCell.className = "game-cell";
        gameCell.id = alphabetStr[row - 1] + col;
        gameRow.appendChild(gameCell);
    }

}