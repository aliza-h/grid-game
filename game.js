let cellArr = []; // the array of cell objects


let shipStats = [{
    "shipType":"basic",
    "shipHP":100,

}];


function drawActors()//unsure how to impliment at this point, but it should update every time an action happens
{
    cellArr.forEach(function doIt() {
        if (hasObstacle)
        {
            //draw a tree
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

function generateGrid(rows,colunms){
    let gameBoard = document.getElementById("game-board"); // the game board

    let alphabetStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let row = 1; row <= rows; row++) { // creates the rows
        let gameRow = document.createElement("div");
        gameRow.className = "game-row";
        gameRow.id = row;
        gameBoard.appendChild(gameRow); // adds row to board

        for (let col = 1; col <= colunms; col++) { // creates cells
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
// EACH CELL HAS
    // ID
    // obstacle/no obstacle
    // player/no player
