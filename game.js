// THE GOAL RIGHT NOW:
    // Generate a multi-dimensional array (representing the game board)
    // Print each element of the multidimensional array

// FOR THE FUTURE:
    // Each element represents a cell on the game board
    // Each sub-array represents a row on the game board

let gridAxis = 10;

let gridArray = Array(10);
let gridRow = Array(10);
let cellCount = 0;

for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
        gridRow[col] = 1;
        cellCount++;
    }
    gridArray[row] = gridRow;
}

console.log(cellCount);
console.log(gridArray);

// arr of objects
// Each object is the cell.
    // Properties:
    // Everything about the cell (what's in it, which color team, etc.)
// row x col