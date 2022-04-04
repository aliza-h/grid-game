let gameBoard = document.getElementById("game-board");
let buttonBox = document.querySelector("button-box");
let playerForm = document.getElementById("players");

let playerOneColor = document.getElementById("player1Color").value;
let playerTwoColor = document.getElementById("player2Color").value;
let submitButton = document.getElementById("submit");

let numberOfRows = 0;
let numberOfColumns = 0;




let cellArr = []; // the array of cell objects

let shipStats = [{
    "shipType": "basic",
    "shipHP": 100,

}];


function drawActors() //unsure how to impliment at this point, but it should update every time an action happens
{
    cellArr.forEach(function doIt() {
        if (hasObstacle) {
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
        "id": thisCell - 1, //verify that this is what you want
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

function attactCell(cell, color, damage) { //cell is the cell that is being attacked
    if (cellArr[cell].hasAnything) {
        if (cellArr[cell].shipColor != color) {
            cellArr[cell].HP -= damage;
        }
    }
}

function attackRow(yourColor, startAt, toRight, damage) {
    if (toRight) {
        let cellStart = startAt;
        let endAt = numberOfColumns * (Math.trunc(startAt / numberOfColumns) + 1) //you may need to add/subtract one

        while (true) {
            if (isAtRight(cellStart)) break;
            cellStart++;
            let cell = document.getElementById("cell" + cellStart);
            cell.style.borderColor = "red";
            attactCell(cellStart, yourColor, damage);
        }
    } else {
        let cellStart = startAt;
        let endAt = numberOfColumns * (Math.trunc(startAt / numberOfColumns)) + 1 //you may need to add or subtract one

        while (cellStart >= endAt) {
            if (isAtLeft(cellStart)) break;
            cellStart--;
            let cell = document.getElementById("cell" + cellStart);
            cell.style.borderColor = "red";
            attactCell(cellStart, yourColor, damage);
        }
    }
}

function attackColumn(yourColor, startAt, down, damage) {
    if (down) {
        let cellStart = startAt;
        while (true) {
            let cell = document.getElementById("cell" + cellStart);
            console.log(cell);
            cell.style.borderColor = "red";
            attactCell(cellStart, yourColor, damage);
            if (isAtBottom(cellStart)) break;
            cellStart += numberOfColumns;
        }
    } else {
        let cellStart = startAt;
        while (true) {
            let cell = document.getElementById("cell" + cellStart);
            cell.style.borderColor = "red";
            attactCell(cellStart, yourColor, damage);
            if (isAtTop(cellStart)) break;
            cellStart -= numberOfColumns;
        }
    }
}

function attackInARange(at, range) {
    let ups = range;
    let rights = 0;
    let downs = 0;
    let lefts = 0;

    if (isAtTop(at)) {
        rights = ups;
        ups = 0;
    }

    while (ups > 0) {
        let adding = at;
        let goUps = ups;
        let goRights = rights;

        while (goUps > 0) {
            if (isAtTop(adding)) break;
            adding -= numberOfColumns;
            let cell = document.getElementById("cell" + adding);
            cell.style.borderColor = "red";
            console.log("colored " + adding);
            //add event listener to cell "adding"
            goUps--;

        }

        while (goRights > 0) {
            if (isAtRight(adding)) break;
            adding++;
            let cell = document.getElementById("cell" + adding);
            cell.style.borderColor = "red";
            //add event listener to cell "adding"
            goRights--;

        }
        ups--;
        rights++;
    }

    if (isAtRight(at)) {
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
            if (isAtRight(adding)) break;
            adding++;
            let cell = document.getElementById("cell" + adding);
            cell.style.borderColor = "red";
            //add event listener to cell "adding"
            goRights--;
        }

        while (goDowns > 0) {
            if (isAtBottom(adding)) break;
            adding += numberOfColumns
            let cell = document.getElementById("cell" + adding);
            cell.style.borderColor = "red";
            //add event listener to cell "adding"
            goDowns--;
        }
        rights--;
        downs++;
    }

    console.log("here");

    if (isAtBottom(at)) {
        lefts = downs;
        downs = 0;
    }

    while (downs > 0) {
        let adding = at;
        let goDowns = downs;
        let goLefts = lefts;

        while (goDowns > 0) {
            if (isAtBottom(adding)) break;
            adding += numberOfColumns
            let cell = document.getElementById("cell" + adding);
            cell.style.borderColor = "red";
            //add event listener to cell "adding"
            goDowns--;
        }

        while (goLefts > 0) {
            if (isAtLeft(adding)) break;
            adding--;
            let cell = document.getElementById("cell" + adding);
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
            if (isAtLeft(adding)) break;
            adding--;
            let cell = document.getElementById("cell" + adding);
            cell.style.borderColor = "red";
            //add event listener to cell "adding"
            goLefts--;
        }

        while (goUps > 0) {
            if (isAtTop(adding)) break;
            adding -= numberOfColumns;
            let cell = document.getElementById("cell" + adding);
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

// ARH: This function takes the parameters (rows and columns) and creates a game board with [rows] cells in the y-axis and [columns] cells in the x-axis.
function generateGrid(rows, colunms) {
    let id = 0;
    let gameBoard = document.getElementById("game-board"); // the game board

    //let alphabetStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let row = 1; row <= rows; row++) { // creates the rows
        let gameRow = document.createElement("div");
        gameRow.className = "game-row";
        //gameRow.id = row;
        gameBoard.appendChild(gameRow); // adds row to board

        for (let col = 1; col <= colunms; col++) { // creates cells
            let gameCell = document.createElement("div");
            gameCell.className = "game-cell";
            gameCell.id = "cell" + id;
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

//chooseYourShips(); ARH: commented out for now--DO NOT DELETE THIS LINE

function myFunction() {
    let select = document.getElementById('board-size');
    let option = select.options[select.selectedIndex];

    if (option.value == "10x10") {
        generateGrid(10, 10);

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
            let color1 = document.querySelectorAll("#cell0, #cell1, #cell10, #cell11, #cell20, #cell21, #cell30, #cell31, #cell40, #cell41, #cell50, #cell51, #cell60, #cell61, #cell70, #cell71, #cell80, #cell81, #cell90, #cell91");
            for (let i = 0; i < color1.length; i++) {
                if (color1) {
                    color1[i].style.borderColor = event.target.value;
                    console.log(playerOneColor);
                }
            }
        }

        function updateSecond(event) {
            let color2 = document.querySelectorAll("#cell8, #cell9, #cell18, #cell19, #cell28, #cell29, #cell38, #cell39, #cell48, #cell49, #cell58, #cell59, #cell68, #cell69, #cell78, #cell79, #cell88, #cell89, #cell98, #cell99");
            for (let i = 0; i < color2.length; i++) {
                if (color2) {
                    color2[i].style.borderColor = event.target.value;
                    console.log(playerTwoColor);
                }
            }
        }
    } else if (option.value == "15x15") {
        generateGrid(15, 15)
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
            let color3 = document.querySelectorAll("#cell0, #cell1, #cell15, #cell16, #cell30, #cell31, #cell45, #cell46, #cell60, #cell61, #cell75, #cell76, #cell90, #cell91, #cell105, #cell106, #cell120, #cell121, #cell135, #cell136, #cell150, #cell151, #cell165, #cell166, #cell180, #cell181, #cell195, #cell196, #cell210, #cell211");
            for (let i = 0; i < color3.length; i++) {
                if (color3) {
                    color3[i].style.borderColor = event.target.value;
                }
            }
        }

        function updateSecond(event) {
            let color4 = document.querySelectorAll("#cell13, #cell14, #cell28, #cell29, #cell43, #cell44, #cell58, #cell59, #cell73, #cell74, #cell88, #cell89, #cell103, #cell104, #cell118, #cell119, #cell133, #cell134, #cell148, #cell149, #cell163, #cell164, #cell178, #cell179, #cell193, #cell194, #cell208, #cell209, #cell223, #cell224");
            for (let i = 0; i < color4.length; i++) {
                if (color4) {
                    color4[i].style.borderColor = event.target.value;
                }
            }
        }
    } else if (option.value == "20x20") {
        generateGrid(20, 20)
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
            let color5 = document.querySelectorAll("#cell0, #cell1, #cell20, #cell21, #cell40, #cell41, #cell60, #cell61, #cell80, #cell81, #cell100, #cell101, #cell120, #cell121, #cell140, #cell141, #cell160, #cell161, #cell180, #cell181, #cell200, #cell201, #cell220, #cell221, #cell240, #cell241, #cell260, #cell261, #cell280, #cell281, #cell300, #cell301, #cell320, #cell321, #cell340, #cell341, #cell360, #cell361, #cell380, #cell381");
            for (let i = 0; i < color5.length; i++) {
                if (color5) {
                    color5[i].style.borderColor = event.target.value;
                }
            }
        }

        function updateSecond(event) {
            let color6 = document.querySelectorAll("#cell18, #cell19, #cell38, #cell39, #cell58, #cell59, #cell78, #cell79, #cell98, #cell99, #cell118, #cell119, #cell138, #cell139, #cell158, #cell159, #cell178, #cell179, #cell198, #cell199, #cell218, #cell219, #cell238, #cell239, #cell258, #cell259, #cell278, #cell279, #cell298, #cell299, #cell318, #cell319, #cell338, #cell339, #cell358, #cell359, #cell378, #cell379, #cell398, #cell399");
            for (let i = 0; i < color6.length; i++) {
                if (color6) {
                    color6[i].style.borderColor = event.target.value;
                }
            }
        }
    } else if (option.value == "") {
        alert("Please pick a size");
        document.location.reload();
    }
}
let submit = document.getElementById("submit")
let colorsubmit = document.getElementById('colorsubmit')
let player1 = document.getElementById("player1Name")
let player2 = document.getElementById("player2Name")
let player1Color = document.getElementById("player1Color")
let player2Color = document.getElementById("player2Color")
let div = document.getElementById("Names")
let button1 = document.getElementById("button1")

submit.addEventListener('click', event => {
   event.preventDefault();
    document.getElementById('player1Color').style.visibility = "visible";
    document.getElementById('player2Name').style.visibility = 'hidden';
    document.getElementById('player1Name').style.visibility = 'hidden';
    document.getElementById('player2Color').style.visibility = 'visible';
    if (player1.value == player2.value) {
        alert("Don't have the same name");
        document.location.reload();
    }

    submit.addEventListener('click', event => {
        if (player1Color.value == player2Color.value) {
            alert("Can't be same color");
            document.location.reload();
        }
        if (player1Color.value == "#000000") {
            alert("Please pick a different color");
            document.location.reload();
        }

        if (player2Color.value == "#000000") {
            alert("Please pick a different color");
            document.location.reload();
        }    
        if (player1Color.value != player2Color.value) {
            submit.remove();
        }
        document.getElementById('player1Color').remove();
        document.getElementById('words').remove();
        var txt = document.getElementById("player1Name").value;
        document.getElementById("name1").innerHTML = txt + "&nbsp" + "side";
        document.getElementById('player2Color').remove();
        document.getElementById('words1').remove();
        var txt = document.getElementById("player2Name").value;
        document.getElementById("name2").innerHTML = txt + "&nbsp" + "side";
    })   
})

button1.addEventListener('click', event => {
    event.preventDefault();
    document.getElementById("game-board").style.visibility = "visible"
    document.getElementById('board-size').remove();
    document.getElementById('button1').remove();
    document.getElementById('player1Name').style.visibility = 'visible';
    document.getElementById('player2Name').style.visibility = 'visible';
    document.getElementById('submit').style.visibility = 'visible';
    document.getElementById('words').style.visibility = 'visible';
    document.getElementById('words1').style.visibility = 'visible';
}) 

// EACH CELL HAS
    // ID
    // obstacle/no obstacle
    // player/no player
