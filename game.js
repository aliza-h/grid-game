let gameBoard = document.getElementById("game-board");
let buttonBox = document.querySelector("button-box");
let playerForm = document.getElementById("players");

let smBoardButton = document.getElementById("sm-board");
let medBoardButton = document.getElementById("med-board");
let lgBoardButton = document.getElementById("lg-board");

let submitButton = document.getElementById("submit");

let cellArr = []; // the array of cell objects
let numberOfRows = 0;
let numberOfColumns = 0;

let shipStats = [{
    "shipType":"basic",
    "shipHP":100,

}];


function drawActors()//unsure how to impliment at this point, but it should update every time an action happens
{
    cellArr.forEach(function doIt() {
        if (hasObstacle)
        {
            // draw a tree
        }

        if (hasAnything) {
            //color = shipColor
            //whichShip = shipType
            //draw ship based on kind and color
            //add heath bar based on HP of not full
        }
    })
}

function addShipTo(thisCell, thisShip, thisColor) {
    cellArr[thisCell] = {
        "id": thisCell - 1,//verify that this is what you want
        "hasAnything": false,
        "hasObstacle": false,
        "shipType": thisShip,
        "shipColor": thisColor,
        "HP": shipStats[thisShip].shipHP,
    }
}

function chooseYourShips() {
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

function attactCell(cell,color,damage) { //cell is the cell that is being attacked
    if (cellArr[cell].hasAnything)
    {
        if (cellArr[cell].shipColor != color)
        {
            cellArr[cell].HP -= damage;
        }
    }
}

function attackRow(yourColor, startAt, toRight, damage) {
    if (toRight) {
        let cellStart = startAt;
        let endAt = numberOfColumns * (Math.trunc(startAt / numberOfColumns) + 1)//you may need to add/subtract one

        while (true) {
            if (isAtRight(cellStart))break;
            cellStart++;
            let cell = document.getElementById(cellStart);
            cell.style.borderColor = "red";
            attactCell(cellStart, yourColor, damage);
        }
    }
    else {
        let cellStart = startAt;
        let endAt = numberOfColumns * (Math.trunc(startAt / numberOfColumns)) + 1//you may need to add or subtract one

        while (cellStart >= endAt) {
            if(isAtLeft(cellStart))break;
            cellStart--;
            let cell = document.getElementById(cellStart);
            cell.style.borderColor = "red";
            attactCell(cellStart, yourColor, damage);
        }
    }
}

function attackColumn(yourColor, startAt, down, damage) {
    if (down) {
        let cellStart = startAt;
        while (true) {
            if(isAtBottom(cellStart))break;
            let cell = document.getElementById(cellStart);
            console.log(cell);
            cell.style.borderColor = "red";
            attactCell(cellStart, yourColor, damage);
            cellStart += numberOfColumns;
        }
    }
    else {
        let cellStart = startAt;
        while (true) {
            if (isAtTop(cellStart))break;
            let cell = document.getElementById(cellStart);
            cell.style.borderColor = "red";
            attactCell(cellStart, yourColor, damage);
            cellStart -= numberOfColumns;
        }
    }
}

function attackInARange(at, range) {
    let ups = range;
    let rights = 0;
    let downs = 0;
    let lefts = 0;

    if(isAtTop(at))
    {
        rights = ups;
        ups = 0;
    }

    while (ups > 0) {
        let adding = at;
        let goUps = ups;
        let goRights = rights;

        while (goUps > 0) {
            if(isAtTop(adding))break;
            adding -= numberOfColumns;
            let cell = document.getElementById(adding);
            cell.style.borderColor = "red";
            console.log("colored " + adding);
            //add event listener to cell "adding"
            goUps--;
            
        }

        while (goRights > 0) {
            if(isAtRight(adding))break;
            adding++;
            let cell = document.getElementById(adding);
            cell.style.borderColor = "red";
            //add event listener to cell "adding"
            goRights--;
            
        }
        ups--;
        rights++;
    }

    if (isAtRight(at))
    {
        downs = rights;
        rights = 0;
    }
    
    console.log("here");
    //sleep(1000);

    while (rights > 0) {
        let adding = at;
        let goRights = rights;
        let goDowns = downs;

        while (goRights > 0) {
            if(isAtRight(adding))break;
            adding++;
            let cell = document.getElementById(adding);
            cell.style.borderColor = "red";
            //add event listener to cell "adding"
            goRights--;
        }

        while (goDowns > 0) {
            if(isAtBottom(adding))break;
            adding += numberOfColumns
            let cell = document.getElementById(adding);
            cell.style.borderColor = "red";
            //add event listener to cell "adding"
            goDowns--;
        }
        rights--;
        downs++;
    }

    console.log("here");

    if (isAtBottom(at))
    {
        lefts = downs;
        downs = 0;
    }

    while (downs > 0) {
        let adding = at;
        let goDowns = downs;
        let goLefts = lefts;

        while (goDowns > 0) {
            if(isAtBottom(adding))break;
            adding += numberOfColumns
            let cell = document.getElementById(adding);
            cell.style.borderColor = "red";
            //add event listener to cell "adding"
            goDowns--;
        }

        while (goLefts > 0) {
            if(isAtLeft(adding))break;
            adding--;
            let cell = document.getElementById(adding);
            cell.style.borderColor = "red";
            //add event listener to cell "adding"
            goLefts--;
        }

        downs--;
        lefts++;
    }

console.log("here");

    if (isAtLeft(at))
        return;

    while (lefts > 0) {
        let adding = at;
        let goLefts = lefts;
        let goUps = ups;

        while (goLefts > 0) {
            if(isAtLeft(adding))break;
            adding--;
            let cell = document.getElementById(adding);
            cell.style.borderColor = "red";
            //add event listener to cell "adding"
            goLefts--;
        }

        while (goUps > 0) {
            if(isAtTop(adding))break;
            adding -= numberOfColumns;
            let cell = document.getElementById(adding);
            cell.style.borderColor = "red";
            //add event listener to cell "adding"
            goUps--;
        }
        lefts--;
        ups++;
    }

    console.log("here");
}

function isAtEdge(num) {
    return isAtTop(num) && isAtBottom(num) && isAtRight(num) && isAtLeft(num);
}

function isAtTop(num) {
    return num < numberOfColumns;
}

function isAtLeft(num) {
    return num % numberOfColumns == 0;
}

function isAtRight(num) {
    return num % numberOfColumns == (numberOfColumns - 1);
}

function isAtBottom(num) {
    return num >= (numberOfColumns - 1) * numberOfRows;
}

function generateGrid(rows, colunms) {
    let id = 0;
    let gameBoard = document.getElementById("game-board"); // the game board

    //let alphabetStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let row = 1; row <= rows; row++) { // creates the rows
        let gameRow = document.createElement("div");
        gameRow.className = "game-row";
        //gameRow.id = row;
        gameBoard.appendChild(gameRow); // adds row to board

        for (let col = 1; col <= columns; col++) { // creates cells
            let gameCell = document.createElement("div");
            gameCell.className = "game-cell";
            gameCell.id = id;
            gameRow.appendChild(gameCell); // adds cell to board

            cellArr.push({ // creates a new object for the current cell
                "id": gameCell.id,
                "hasAnything": false,
                "hasObstacle": false,
                "shipType": null,
                "shipColor": null,
                "HP": -1,
            });
            id++;
        }
    }

    numberOfRows = rows;
    numberOfColumns = colunms;
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}

generateGrid(10,10);
chooseYourShips();
function createSmallBoard() {
    generateGrid(10, 10);
    console.log("generated small board");
}

function createMediumBoard() {
    generateGrid(15, 15);
    console.log("generate medium board");
}
function testGenerateGrid(rows, colunms) {//trying something new
    let gameBoard = document.getElementById("game-board"); // the game board

    for (let id = 0; id < rows*colunms; id++) { // creates cells
        let gameCell = document.createElement("div");
        gameCell.className = "game-cell";
        gameCell.id = id;
        gameRow.appendChild(gameCell); // adds cell to board

        cellArr.push({ // creates a new object for the current cell
            "id": gameCell.id,
            "hasAnything": false,
            "hasObstacle": false,
            "shipType": null,
            "shipColor": null,
            "HP": -1,
        });
    }
    numberOfRows = rows;
    numberOfColumns = colunms;
}

function createLargeBoard() {
    generateGrid(20, 20);
    console.log("generated large board");
}

function revealBoard() {
    playerForm.style.visibility = "hidden";
    buttonBox.style.visibility = "hidden";
    gameBoard.style.visibility = "visible";
}

smBoardButton.addEventListener("click", createSmallBoard);
medBoardButton.addEventListener("click", createMediumBoard);
lgBoardButton.addEventListener("click", createLargeBoard);

submitButton.addEventListener("click", revealBoard);

//chooseYourShips(); ARH: commented out for now--DO NOT DELETE THIS LINE

let colorwheel;
let colorWell;

window.addEventListener("load", startup, false);

function startup() {
  colorwheel = document.querySelector("#player1Color");
  colorwheel.addEventListener("input", updateFirst, false);
  colorwheel.select();

  colorWell = document.querySelector("#player2Color");
  colorWell.addEventListener("input", updateSecond, false);
  colorWell.select();
}

function updateFirst(event) {
    let color1 = document.querySelectorAll("#A1, #A2, #B1, #B2, #C1, #C2, #D1, #D2, #E1, #E2, #F1, #F2, #G1, #G2, #H1, #H2, #I1, #I2, #J1, #J2");
    for (let i = 0; i < color1.length; i++){
      if (color1){
          color1[i].style.borderColor = event.target.value;
    }
  }
}
function updateSecond(event){
    let color2 = document.querySelectorAll("#A9, #A10, #B9, #B10, #C9, #C10, #D9, #D10, #E9, #E10, #F9, #F10, #G9, #G10, #H9, #H10, #I9, #I10, #J9, #J10");
  for (let i = 0; i < color2.length; i++){
    if (color2){
        color2[i].style.borderColor = event.target.value;
  }
  }
}


let submit = document.getElementById("submit")
let player1 = document.getElementById("player1Name")
let player2 = document.getElementById("player2Name")
let player1Color = document.getElementById("player1Color")
let player2Color = document.getElementById("player2Color")
submit.addEventListener('click', event => {
   
    if( player1.value == player2.value){
        alert("Don't have the same name");
        document.location.reload();
    }
    if (player1Color.value == player2Color.value){
        alert("Don't pick the same color");
        document.location.reload();
    }
})


generateGrid(10, 10);
chooseYourShips();

//console.log(25%13);
// EACH CELL HAS
    // ID
    // obstacle/no obstacle
    // player/no player
