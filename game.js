// arr of objects
// Each object is the cell.
    // Properties:
    // Everything about the cell (what's in it, which color team, etc.)
// row x col

let gameBoard = document.getElementById("game-board");
let gameRow = document.createElement("div");
gameRow.className = "game-row";

gameBoard.appendChild(gameRow);