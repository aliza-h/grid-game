// ARH: I don't know why the board styling isn't showing up. It worked before, but now it doesn't, and that is SUPREMELY stupid.


let cellArr = []; // the array of cell objects

let shipStats = [{
    "shipType": "basic",
    "shipHP": 100,
}];


function drawActors()//unsure how to impliment at this point, but it should update every time an action happens
{
    cellArr.forEach(function doIt() {
        if (hasObstacle)
        {
            // draw a tree
        }

        if (hasAnything)
        {
            //color = shipColor
            //whichShip = shipType
            //draw ship based on kind and color
            //add heath bar based on HP of not full
        }
    })
}

function addShipTo(thisCell,thisShip,thisColor)
{
    cellArr[thisCell] = {
        "id":thisCell-1,//verify that this is what you want
        "hasAnything":false,
        "hasObstacle":false,
        "shipType":thisShip,
        "shipColor":thisColor,
        "HP":shipStats[thisShip].shipHP,
    }
}

function chooseYourShips()
{
    blueShipsToChoose = 3;
    redShipsToChoose = 3;
    blueShipsToPlace = 0;
    redShipsToPlace = 0;
    console.log("Player one, pick your ships");
    //draw the ships that can be chosen somewhere
    //add event listeners or something
    //blueShipsToPlace++
    //blueShipsToChoose--;
    //when they picked the ships...
    console.log("Player two, pick your ships");
    //redraw the ships that can be chosen by them
    //add event listeners or something
    //blueShipsToPlace++
    //blueShipsToChoose--;
    //when they've picked their ships...
    //remove the ship choosing menu
    //move onto the ship placing phase
}

function attactCell(cell,color,damage)//cell is the cell that is being attacked
{
    if (cellArr[cell].hasAnything)
    {
        if (cellArr[cell].shipColor != color)
        {
            cellArr[cell].HP -= damage;
        }
    }
}


// ARH: This function takes the parameters (rows and columns) and creates a game board with [rows] cells in the y-axis and [columns] cells in the x-axis.
function generateGrid(rows, columns) { // ARH: corrected the spelling of "columns" cuz I'm OCD like that :D
    let gameBoard = document.getElementById("game-board"); // the game board

    let alphabetStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let row = 1; row <= rows; row++) { // creates the rows
        let gameRow = document.createElement("div");
        gameRow.className = "game-row"; // adds class game-row so I can style it
        gameRow.id = row;
        gameBoard.appendChild(gameRow); // adds row to board

        for (let col = 1; col <= columns; col++) { // creates cells
            let gameCell = document.createElement("div");
            gameCell.className = "game-cell";
            gameCell.id = alphabetStr[row - 1] + col;
            gameRow.appendChild(gameCell); // adds cell to board

            cellArr.push({ // creates a new object for the current cell
                "id" : gameCell.id,
                "hasAnything":false,
                "hasObstacle":false,
                "shipType":null,
                "shipColor":null,
                "HP":-1,
            });
        }
    }
}

// ARH: This is where I'm gonna test the JS prompt
// ...On second thought, I don't need this to be a PROMPT. Imma comment this out for now.
/*
let squareSize = prompt("Enter the desired square dimension (just one integer). Thx m8", "0");
generateGrid(parseInt(string, squareSize), parseInt(string, squareSize));
*/


generateGrid(10, 10);
//generateGrid(15, 15);
//generateGrid(20, 20);
chooseYourShips();


// EACH CELL HAS
    // ID
    // obstacle/no obstacle
    // player/no player