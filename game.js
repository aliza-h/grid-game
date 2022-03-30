let gameBoard = document.getElementById("game-board");
let buttonBox = document.querySelector("button-box");
let playerForm = document.getElementById("players");

let smBoardButton = document.getElementById("sm-board");
let medBoardButton = document.getElementById("med-board");
let lgBoardButton = document.getElementById("lg-board");

let submitButton = document.getElementById("submit");


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

function attactCell(cell,color,damage) { //cell is the cell that is being attacked
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

function myFunction(){
    let select = document.getElementById('board-size');
    let option = select.options[select.selectedIndex];

if (option.value == "10x10"){
generateGrid(10,10);

let colorwheel;
let colorWell;

startup()
function startup() {
colorwheel = document.querySelector("#player1Color");
colorwheel.addEventListener("input", updateFirst);
colorwheel.select();

colorWell = document.querySelector("#player2Color");
colorWell.addEventListener("input", updateSecond);
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
} else if (option.value == "15x15"){
generateGrid(15,15)
let colorwheel;
let colorWell;

startup()
function startup() {
colorwheel = document.querySelector("#player1Color");
colorwheel.addEventListener("input", updateFirst);
colorwheel.select();

colorWell = document.querySelector("#player2Color");
colorWell.addEventListener("input", updateSecond);
colorWell.select();
}
function updateFirst(event) {
let color3 = document.querySelectorAll("#A1, #A2, #B1, #B2, #C1, #C2, #D1, #D2, #E1, #E2, #F1, #F2, #G1, #G2, #H1, #H2, #I1, #I2, #J1, #J2, #K1, #K2, #L1, #L2, #M1, #M2, #N1, #N2, #O1, #O2");
for (let i = 0; i < color3.length; i++){
  if (color3){
      color3[i].style.borderColor = event.target.value;
}
}
}
function updateSecond(event){
let color4 = document.querySelectorAll("#A14, #A15, #B14, #B15, #C14, #C15, #D14, #D15, #E14, #E15, #F14, #F15, #G14, #G15, #H14, #H15, #I14, #I15, #J14, #J15, #K14, #K15, #L14, #L15, #M14, #M15, #N14, #N15, #O14, #O15");
for (let i = 0; i < color4.length; i++){
if (color4){
    color4[i].style.borderColor = event.target.value;
}
}
}
}
else if (option.value == "20x20"){
generateGrid(20,20)
let colorwheel;
let colorWell;

startup()
function startup() {
colorwheel = document.querySelector("#player1Color");
colorwheel.addEventListener("input", updateFirst);
colorwheel.select();

colorWell = document.querySelector("#player2Color");
colorWell.addEventListener("input", updateSecond);
colorWell.select();
}
function updateFirst(event) {
let color5 = document.querySelectorAll("#A1, #A2, #B1, #B2, #C1, #C2, #D1, #D2, #E1, #E2, #F1, #F2, #G1, #G2, #H1, #H2, #I1, #I2, #J1, #J2, #K1, #K2, #L1, #L2, #M1, #M2, #N1, #N2, #O1, #O2, #P1, #P2, #Q1, #Q2, #R1, #R2, #S1, #S2, #T1, #T2");
for (let i = 0; i < color5.length; i++){
  if (color5){
      color5[i].style.borderColor = event.target.value;
}
}
}
function updateSecond(event){
let color6 = document.querySelectorAll("#A19, #A20, #B19, #B20, #C19, #C20, #D19, #D20, #E19, #E20, #F19, #F20, #G19, #G20, #H19, #H20, #I19, #I20, #J19, #J20, #K19, #K20, #L19, #L20, #M19, #M20, #N19, #N20, #O19, #O20, #P19, #P20, #Q19, #Q20, #R19, #R20, #S19, #S20, #T19, #T20");
for (let i = 0; i < color6.length; i++){
if (color6){
    color6[i].style.borderColor = event.target.value;
}
}
}
} else if (option.value == ""){
alert("Please pick a size");
document.location.reload();
}
}
let submit = document.getElementById("submit")
let colorsubmit = document.getElementById('colorsubmit')
let player1 = document.getElementById("player1Name")
let player2 = document.getElementById("player2Name")
let div = document.getElementById("Names")
let button1 = document.getElementById("button1")
submit.addEventListener('click', event => {
   event.preventDefault();
    document.getElementById('player2Name').style.visibility = 'hidden';
    document.getElementById('player1Name').style.visibility = 'hidden';
    document.getElementById('submit').style.visibility = 'hidden';
    if( player1.value == player2.value){
        alert("Don't have the same name");
        document.location.reload();
    }
})

button1.addEventListener('click', event => {
    event.preventDefault();
    document.getElementById('board-size').style.visibility = 'hidden';
    document.getElementById('button1').style.visibility = 'hidden';
    document.getElementById('player1Name').style.visibility = 'visible';
    document.getElementById('player2Name').style.visibility = 'visible';
    document.getElementById('submit').style.visibility = 'visible';
    document.getElementById('words').style.visibility = 'visible';
    document.getElementById('words1').style.visibility = 'visible';
})


    submit.addEventListener('click', event => {
event.preventDefault();

            if(player1Color.value == player2Color.value){
                alert("Can't be same color");
                document.location.reload();
            }
        
            if(player1Color.value != player2Color.value){
                colorsubmit.style.visibility = 'hidden';
            }
            document.getElementById('player1Color').style.visibility = 'hidden';
            document.getElementById('words').style.visibility = 'hidden';
            var txt = document.getElementById("player1Name").value;
                    document.getElementById("name1").innerHTML = txt +"&nbsp" + "side";
            document.getElementById('player2Color').style.visibility = 'hidden';
            document.getElementById('words1').style.visibility = 'hidden';
            var txt = document.getElementById("player2Name").value;
                    document.getElementById("name2").innerHTML = txt +"&nbsp" + "side";
        })
// EACH CELL HAS
    // ID
    // obstacle/no obstacle
    // player/no player
