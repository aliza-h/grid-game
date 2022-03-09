// arr of objects
// Each object is the cell.
    // Properties:
    // Everything about the cell (what's in it, which color team, etc.)
// row x col

let gameBoard = document.getElementById("game-board");

for (let row = 0; row < 10; row++) {
    let gameRow = document.createElement("div");
    gameRow.className = "game-row";
    gameBoard.appendChild(gameRow);

    for (let cell = 0; cell < 10; cell++) {
        let gameCell = document.createElement("div");
        gameCell.className = "game-cell";
        gameRow.appendChild(gameCell);
    }

}