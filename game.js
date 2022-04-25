let gameBoard = document.getElementById("game-board");
let buttonBox = document.querySelector("button-box");
let playerForm = document.getElementById("players");

let playerOneColor = document.getElementById("player1Color").value;
let playerTwoColor = document.getElementById("player2Color").value;
let submitButton = document.getElementById("submit");

let gameRow = document.querySelector(".game-row");
let numberOfRows = 0;
let numberOfColumns = 0;

let select = document.getElementById('board-size');
let option = select.options[select.selectedIndex];

let player1 = document.getElementById("player1Name");
let player2 = document.getElementById("player2Name");
let currentturn = player1;

let submit = document.getElementById("submit");
let player1Color = document.getElementById("player1Color");
let player2Color = document.getElementById("player2Color");

const drops = [].slice.call(
    document.querySelectorAll( '.drop' ), 0 );
let ready1 = document.getElementById("ready1")
let ready2 = document.getElementById("ready2")


let cellArr = []; // the array of cell objects


let shipStats = [{
        shipType: "Defender",
        shipHP: 100,
        attackRange: 1,
        movementRange: 1
    },
    {
        shipType: "Melee",
        shipHP: 50,
        attackRange: 2,
        attackPower: 25,
        movementRange: 3
    },
    {
        shipType: "Healer",
        shipHP: 30,
        attackRange: 1,
        attackPower: 10,
        healPower: 15,
        movementRange: 4
    },
    {
        shipType: "Ranger",
        shipHP: 50,
        attackRange: 0,
        attackPower: 20,
        movementRange: 3
    }
];


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
    var result = shipStats.filter(x => x.shipType == thisShip);

    /*console.log(result);
    console.log(result[0].shipHP);
    console.log(result[0].shipHP);*/


    cellArr[thisCell] = {
        "id": thisCell,
        "hasAnything": true,
        "hasObstacle": false,
        "shipType": thisShip,
        "shipColor": thisColor,
        //"HP": result[0].shipHP,
    }
}

function moveShipTo(from, to) {
    cellArr[to] = {
        "id": cellArr[from].id,
        "hasAnything": true,
        "hasObstacle": false,
        "shipType": cellArr[from].shipType,
        "shipColor": cellArr[from].shipColor,
        "HP": cellArr[from].HP,
    }

    //draw the ship to the cell

    cellArr[from] = {
        "id": from,
        "hasAnything": false,
        "hasObstacle": false,
        "shipType": null,
        "shipColor": null,
        "HP": -1,
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


function move(at, range, moving) {
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
            cell.style.borderColor = "green";
            console.log("colored " + adding);
            cell.addEventListener('click', cell.fn=function fn()
            {
                cell.appendChild(document.getElementById(moving));
                //document.getElementById("cell" + at).removeChild(document.getElementById("cell" + at).firstChild);
                 var cells = document.getElementsByClassName("game-cell");
                 //console.log(cells);
                for (var i = 0; i < cells.length; i++) {
                    if (i != cell.id.substring(4)){
                    var replace = cells.item(i).cloneNode(true);
                    cells.item(i).parentNode.replaceChild(replace,cells.item(i));
                    }
                }
                console.log("ran");
                
            },{once:true});
            goUps--;

        }

        while (goRights > 0) {
            if (isAtRight(adding)) break;
            adding++;
            let cell = document.getElementById("cell" + adding);
            cell.style.borderColor = "green";
            cell.addEventListener('click', cell.fn=function fn()
            {
                cell.appendChild(document.getElementById(moving));
                //document.getElementById("cell" + at).removeChild(document.getElementById("cell" + at).firstChild);
                 var cells = document.getElementsByClassName("game-cell");
                 //console.log(cells);
                for (var i = 0; i < cells.length; i++) {
                    if (i != cell.id.substring(4)){
                    var replace = cells.item(i).cloneNode(true);
                    cells.item(i).parentNode.replaceChild(replace,cells.item(i));
                    }
                }
                console.log("ran");
                
            },{once:true});
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
            cell.style.borderColor = "green";
            cell.addEventListener('click', cell.fn=function fn()
            {
                cell.appendChild(document.getElementById(moving));
                //document.getElementById("cell" + at).removeChild(document.getElementById("cell" + at).firstChild);
                 var cells = document.getElementsByClassName("game-cell");
                 //console.log(cells);
                for (var i = 0; i < cells.length; i++) {
                    if (i != cell.id.substring(4)){
                    var replace = cells.item(i).cloneNode(true);
                    cells.item(i).parentNode.replaceChild(replace,cells.item(i));
                    }
                }
                console.log("ran");
                
            },{once:true});
            goRights--;
        }

        while (goDowns > 0) {
            if (isAtBottom(adding)) break;
            adding += numberOfColumns
            let cell = document.getElementById("cell" + adding);
            cell.style.borderColor = "green";
            cell.addEventListener('click', cell.fn=function fn()
            {
                cell.appendChild(document.getElementById(moving));
                //document.getElementById("cell" + at).removeChild(document.getElementById("cell" + at).firstChild);
                 var cells = document.getElementsByClassName("game-cell");
                 //console.log(cells);
                for (var i = 0; i < cells.length; i++) {
                    if (i != cell.id.substring(4)){
                    var replace = cells.item(i).cloneNode(true);
                    cells.item(i).parentNode.replaceChild(replace,cells.item(i));
                    }
                }
                console.log("ran");
                
            },{once:true});
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
            cell.style.borderColor = "green";
            cell.addEventListener('click', cell.fn=function fn()
            {
                cell.appendChild(document.getElementById(moving));
                //document.getElementById("cell" + at).removeChild(document.getElementById("cell" + at).firstChild);
                 var cells = document.getElementsByClassName("game-cell");
                 //console.log(cells);
                for (var i = 0; i < cells.length; i++) {
                    if (i != cell.id.substring(4)){
                    var replace = cells.item(i).cloneNode(true);
                    cells.item(i).parentNode.replaceChild(replace,cells.item(i));
                    }
                }
                console.log("ran");
                
            },{once:true});
            goDowns--;
        }

        while (goLefts > 0) {
            if (isAtLeft(adding)) break;
            adding--;
            let cell = document.getElementById("cell" + adding);
            cell.style.borderColor = "green";
            cell.addEventListener('click', cell.fn=function fn()
            {
                cell.appendChild(document.getElementById(moving));
                //document.getElementById("cell" + at).removeChild(document.getElementById("cell" + at).firstChild);
                 var cells = document.getElementsByClassName("game-cell");
                 //console.log(cells);
                for (var i = 0; i < cells.length; i++) {
                    if (i != cell.id.substring(4)){
                    var replace = cells.item(i).cloneNode(true);
                    cells.item(i).parentNode.replaceChild(replace,cells.item(i));
                    }
                }
                console.log("ran");
                
            },{once:true});
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
            cell.style.borderColor = "green";
            cell.addEventListener('click', cell.fn=function fn()
            {
                cell.appendChild(document.getElementById(moving));
                //document.getElementById("cell" + at).removeChild(document.getElementById("cell" + at).firstChild);
                 var cells = document.getElementsByClassName("game-cell");
                 //console.log(cells);
                for (var i = 0; i < cells.length; i++) {
                    if (i != cell.id.substring(4)){
                    var replace = cells.item(i).cloneNode(true);
                    cells.item(i).parentNode.replaceChild(replace,cells.item(i));
                    }
                }
                console.log("ran");
                
            },{once:true});
            goLefts--;
        }

        while (goUps > 0) {
            if (isAtTop(adding)) break;
            adding -= numberOfColumns;
            let cell = document.getElementById("cell" + adding);
            cell.style.borderColor = "green";
            cell.addEventListener('click', cell.fn=function fn()
            {
                cell.appendChild(document.getElementById(moving));
                //document.getElementById("cell" + at).removeChild(document.getElementById("cell" + at).firstChild);
                 var cells = document.getElementsByClassName("game-cell");
                 //console.log(cells);
                for (var i = 0; i < cells.length; i++) {
                    if (i != cell.id.substring(4)){
                    var replace = cells.item(i).cloneNode(true);
                    cells.item(i).parentNode.replaceChild(replace,cells.item(i));
                    }
                }
                console.log("ran");
                
            },{once:true});
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
function generateGrid(rows, columns) {
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
    numberOfColumns = columns;
}


function allowDrop(ev) {
    ev.preventDefault();
    if (ev.target.getAttribute("draggable") == "true")
        ev.dataTransfer.dropEffect = "none";
    else
        ev.dataTransfer.dropEffect = "all";
}
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    let data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    var player = data.substring(0,2);
    var toCell = ev.target.id.substring(4);
    var type = data.substring(3);
    console.log(data);
    console.log(player);
    console.log(toCell);
    console.log(type);

    addShipTo(toCell,type,player);
} 
//player 2 drag and drop come back and fix this later
/*
function allowDrops(event) {
    event.preventDefault();
    if (event.target.getAttribute("draggable") == "true")
        event.dataTransfer.dropEffect = "none";
    else
        event.dataTransfer.dropEffect = "all";
}

function drager(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function dropp(event) {
    let data = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(data));
    var player = data.substring(0,2);
    var toCell = event.target.id.substring(4);
    var type = data.substring(3);
    console.log(data);
    console.log(player);
    console.log(toCell);
    console.log(type);

    addShipTo(toCell,type,player);
} 
*/
//chooseYourShips(); ARH: commented out for now--DO NOT DELETE THIS LINE



submit.addEventListener('click', event => {
    event.preventDefault();
    
    if (document.getElementById('player1Name') != null){
    document.getElementById('player1Name').style.visibility = 'hidden';
    document.getElementById('player1Name').style.height = '0vh';}
    document.getElementById('player1Color').style.visibility = "visible";

    document.getElementById('player2Name').style.visibility = 'hidden';
    document.getElementById('player2Name').style.height = '0vh';
    document.getElementById('player2Color').style.visibility = 'visible';

    if (player1.value == player2.value) {
        alert("Don't have the same name");
        document.location.reload();
    }

    document.getElementById("text-prompt1").innerHTML = "Please select your team color";
    document.getElementById("text-prompt2").innerHTML = "Please select your team color";
    
    function preventDupes( select, index ) {
        var options = select.options,
            len = options.length;
        while( len-- ) {
            options[ len ].disabled = false;
        }
        select.options[ index ].disabled = true;
        if( index === select.selectedIndex ) {
            alert('You\'ve already selected the item "' + select.options[index].text + '".\n\nPlease choose another.');
            this.selectedIndex = 0;
        }
    }

    player1Color.onchange = function() {
        preventDupes.call(this, player2Color, this.selectedIndex );
    };

    player2Color.onchange = function() {
        preventDupes.call(this, player1Color, this.selectedIndex );
    };

    submit.addEventListener('click', event => {

        //document.getElementById('player1Color').style.visibility = "hidden";
        //document.getElementById('words').style.visibility = "hidden";
        
        var txt = document.getElementById("player1Name").value;
        document.getElementById("name1").innerHTML = txt + "'s side";
        var txt = document.getElementById("player2Name").value;
        document.getElementById("name2").innerHTML = txt + "'s side";

        document.getElementById("player-input-box").remove();
        
        document.getElementById("board-size-box").style.height = "auto";
        document.getElementById("board-size-box").style.visibility = "visible";
        document.getElementById("board-size").style.visibility = "visible";

        let txtcolor = document.getElementById("name1");
        let txtcolor2 = document.getElementById("name2");
        

        //console.log(player1Color.value);
        //console.log(player2Color.value);

        if (player1Color.value == "Red") {
            txtcolor.style.color = "#7B0000";
        }
        if (player1Color.value == "Green") {
            txtcolor.style.color = "#047B00";
        }
        if (player1Color.value == "Blue") {
            txtcolor.style.color = "#001A7B";
        }
        if (player1Color.value == "Yellow") {
            txtcolor.style.color = "#997B00";
        }
        if (player2Color.value == "Red") {
            txtcolor2.style.color = "#7B0000";
        }
        if (player2Color.value == "Green") {
            txtcolor2.style.color = "#047B00";
        }
        if (player2Color.value == "Blue") {
            txtcolor2.style.color = "#001A7B";
        }
        if (player2Color.value == "Yellow") {
            txtcolor2.style.color = "#997B00";
        }
        


    

        submit.addEventListener('click', event => {

            event.preventDefault();

            let select = document.getElementById('board-size');
            let option = select.options[select.selectedIndex];


            if (option.value == "10x10") {
                generateGrid(10, 10);
            //player1 side

            document.querySelector("#cell0").classList.add("drop");
            let cell = document.getElementById("cell0");
            cell.setAttribute('ondrop', "drop(event)")
            cell.setAttribute('ondragover', "allowDrop(event)")

            document.querySelector("#cell1").classList.add("drop");
            let cell1 = document.getElementById("cell1");
            cell1.setAttribute('ondrop', "drop(event)")
            cell1.setAttribute('ondragover', "allowDrop(event)")
        
            document.querySelector("#cell10").classList.add("drop");
            let cell10 = document.getElementById("cell10");
            cell10.setAttribute('ondrop', "drop(event)")
            cell10.setAttribute('ondragover', "allowDrop(event)")
            
            document.querySelector("#cell11").classList.add("drop");
            let cell11 = document.getElementById("cell11");
            cell11.setAttribute('ondrop', "drop(event)")
            cell11.setAttribute('ondragover', "allowDrop(event)")

            document.querySelector("#cell20").classList.add("drop");
            let cell20 = document.getElementById("cell20");
            cell20.setAttribute('ondrop', "drop(event)")
            cell20.setAttribute('ondragover', "allowDrop(event)")

            document.querySelector("#cell21").classList.add("drop");
            let cell21 = document.getElementById("cell21");
            cell21.setAttribute('ondrop', "drop(event)")
            cell21.setAttribute('ondragover', "allowDrop(event)")

            document.querySelector("#cell30").classList.add("drop");
            let cell30 = document.getElementById("cell30");
            cell30.setAttribute('ondrop', "drop(event)")
            cell30.setAttribute('ondragover', "allowDrop(event)")

            document.querySelector("#cell31").classList.add("drop");
            let cell31 = document.getElementById("cell31");
            cell31.setAttribute('ondrop', "drop(event)")
            cell31.setAttribute('ondragover', "allowDrop(event)")

            document.querySelector("#cell40").classList.add("drop");
            let cell40 = document.getElementById("cell40");
            cell40.setAttribute('ondrop', "drop(event)")
            cell40.setAttribute('ondragover', "allowDrop(event)")

            document.querySelector("#cell41").classList.add("drop");
            let cell41 = document.getElementById("cell41");
            cell41.setAttribute('ondrop', "drop(event)")
            cell41.setAttribute('ondragover', "allowDrop(event)")

            document.querySelector("#cell50").classList.add("drop");
            let cell50 = document.getElementById("cell50");
            cell50.setAttribute('ondrop', "drop(event)")
            cell50.setAttribute('ondragover', "allowDrop(event)")

            document.querySelector("#cell51").classList.add("drop");
            let cell51 = document.getElementById("cell51");
            cell51.setAttribute('ondrop', "drop(event)")
            cell51.setAttribute('ondragover', "allowDrop(event)")

            document.querySelector("#cell60").classList.add("drop");
            let cell60 = document.getElementById("cell60");
            cell60.setAttribute('ondrop', "drop(event)")
            cell60.setAttribute('ondragover', "allowDrop(event)")

            document.querySelector("#cell61").classList.add("drop");
            let cell61 = document.getElementById("cell61");
            cell61.setAttribute('ondrop', "drop(event)")
            cell61.setAttribute('ondragover', "allowDrop(event)")

            document.querySelector("#cell70").classList.add("drop");
            let cell70 = document.getElementById("cell70");
            cell70.setAttribute('ondrop', "drop(event)")
            cell70.setAttribute('ondragover', "allowDrop(event)")

            document.querySelector("#cell71").classList.add("drop");
            let cell71 = document.getElementById("cell71");
            cell71.setAttribute('ondrop', "drop(event)")
            cell71.setAttribute('ondragover', "allowDrop(event)")

            document.querySelector("#cell80").classList.add("drop");
            let cell80 = document.getElementById("cell80");
            cell80.setAttribute('ondrop', "drop(event)")
            cell80.setAttribute('ondragover', "allowDrop(event)")

            document.querySelector("#cell81").classList.add("drop");
            let cell81 = document.getElementById("cell81");
            cell81.setAttribute('ondrop', "drop(event)")
            cell81.setAttribute('ondragover', "allowDrop(event)")

            document.querySelector("#cell90").classList.add("drop");
            let cell90 = document.getElementById("cell90");
            cell90.setAttribute('ondrop', "drop(event)")
            cell90.setAttribute('ondragover', "allowDrop(event)")

            document.querySelector("#cell91").classList.add("drop");
            let cell91 = document.getElementById("cell91");
            cell91.setAttribute('ondrop', "drop(event)")
            cell91.setAttribute('ondragover', "allowDrop(event)")

            //player2 side

            document.querySelector("#cell8").classList.add("drops");
            let cell8 = document.getElementById("cell8");
            cell8.setAttribute('ondrop', "drop(event)")
            cell8.setAttribute('ondragover', "allowDrop(event)")

            document.querySelector("#cell9").classList.add("drops");
            let cell9 = document.getElementById("cell9");
            cell9.setAttribute('ondrop', "drop(event)")
            cell9.setAttribute('ondragover', "allowDrop(event)")

            document.querySelector("#cell18").classList.add("drops");
            let cell18 = document.getElementById("cell18");
            cell18.setAttribute('ondrop', "drop(event)")
            cell18.setAttribute('ondragover', "allowDrop(event)")

            document.querySelector("#cell19").classList.add("drops");
            let cell19 = document.getElementById("cell19");
            cell19.setAttribute('ondrop', "drop(event)")
            cell19.setAttribute('ondragover', "allowDrop(event)")

            document.querySelector("#cell28").classList.add("drops");
            let cell28 = document.getElementById("cell28");
            cell28.setAttribute('ondrop', "drop(event)")
            cell28.setAttribute('ondragover', "allowDrop(event)")

            document.querySelector("#cell29").classList.add("drops");
            let cell29 = document.getElementById("cell29");
            cell29.setAttribute('ondrop', "drop(event)")
            cell29.setAttribute('ondragover', "allowDrop(event)")

            document.querySelector("#cell38").classList.add("drops");
            let cell38 = document.getElementById("cell38");
            cell38.setAttribute('ondrop', "drop(event)")
            cell38.setAttribute('ondragover', "allowDrop(event)")

            document.querySelector("#cell39").classList.add("drops");
            let cell39 = document.getElementById("cell39");
            cell39.setAttribute('ondrop', "drop(event)")
            cell39.setAttribute('ondragover', "allowDrop(event)")

            document.querySelector("#cell48").classList.add("drops");
            let cell48 = document.getElementById("cell48");
            cell48.setAttribute('ondrop', "drop(event)")
            cell48.setAttribute('ondragover', "allowDrop(event)")

            document.querySelector("#cell49").classList.add("drops");
            let cell49 = document.getElementById("cell49");
            cell49.setAttribute('ondrop', "drop(event)")
            cell49.setAttribute('ondragover', "allowDrop(event)")

            document.querySelector("#cell58").classList.add("drops");
            let cell58 = document.getElementById("cell58");
            cell58.setAttribute('ondrop', "drop(event)")
            cell58.setAttribute('ondragover', "allowDrop(event)")

            document.querySelector("#cell59").classList.add("drops");
            let cell59 = document.getElementById("cell59");
            cell59.setAttribute('ondrop', "drop(event)")
            cell59.setAttribute('ondragover', "allowDrop(event)")

            document.querySelector("#cell68").classList.add("drops");
            let cell68 = document.getElementById("cell68");
            cell68.setAttribute('ondrop', "drop(event)")
            cell68.setAttribute('ondragover', "allowDrop(event)")

            document.querySelector("#cell69").classList.add("drops");
            let cell69 = document.getElementById("cell69");
            cell69.setAttribute('ondrop', "drop(event)")
            cell69.setAttribute('ondragover', "allowDrop(event)")

            document.querySelector("#cell78").classList.add("drops");
            let cell78 = document.getElementById("cell78");
            cell78.setAttribute('ondrop', "drop(event)")
            cell78.setAttribute('ondragover', "allowDrop(event)")

            document.querySelector("#cell79").classList.add("drops");
            let cell79 = document.getElementById("cell79");
            cell79.setAttribute('ondrop', "drop(event)")
            cell79.setAttribute('ondragover', "allowDrop(event)")

            document.querySelector("#cell88").classList.add("drops");
            let cell88 = document.getElementById("cell88");
            cell88.setAttribute('ondrop', "drop(event)")
            cell88.setAttribute('ondragover', "allowDrop(event)")

            document.querySelector("#cell89").classList.add("drops");
            let cell89 = document.getElementById("cell89");
            cell89.setAttribute('ondrop', "drop(event)")
            cell89.setAttribute('ondragover', "allowDrop(event)")

            document.querySelector("#cell98").classList.add("drops");
            let cell98 = document.getElementById("cell98");
            cell98.setAttribute('ondrop', "drop(event)")
            cell98.setAttribute('ondragover', "allowDrop(event)")

            document.querySelector("#cell99").classList.add("drops");
            let cell99 = document.getElementById("cell99");
            cell99.setAttribute('ondrop', "drop(event)")
            cell99.setAttribute('ondragover', "allowDrop(event)")

                let color1 = document.querySelectorAll("#cell0, #cell1, #cell10, #cell11, #cell20, #cell21, #cell30, #cell31, #cell40, #cell41, #cell50, #cell51, #cell60, #cell61, #cell70, #cell71, #cell80, #cell81, #cell90, #cell91");
                for (let i = 0; i < color1.length; i++) {
                    if (color1) {
                        if (player1Color.value == "Red") {
                            color1[i].style.backgroundColor = "#e9967a";
                            color1[i].style.borderColor = "#7B0000";
                            document.getElementById("p1-Melee").src="images/attacker_red.png";
                            document.getElementById("p1-Defender").src="images/defender_red.png";
                            document.getElementById("p1-Ranger").src="images/ranger_red.png";
                            document.getElementById("p1-Healer").src="images/healer_red.png";
                        }
                        if (player1Color.value == "Green") {
                            color1[i].style.backgroundColor = "#0bd67e";
                            color1[i].style.borderColor = "#047B00";
                            document.getElementById("p1-Melee").src="images/attacker_green.png";
                            document.getElementById("p1-Defender").src="images/defender_green.png";
                            document.getElementById("p1-Ranger").src="images/ranger_green.png";
                            document.getElementById("p1-Healer").src="images/healer_green.png";
                        }
                        if (player1Color.value == "Blue") {
                            color1[i].style.backgroundColor = "#87ceeb";
                            color1[i].style.borderColor = "#001A7B";
                            document.getElementById("p1-Melee").src="images/attacker_blue.png";
                            document.getElementById("p1-Defender").src="images/defender_blue.png";
                            document.getElementById("p1-Ranger").src="images/ranger_blue.png";
                            document.getElementById("p1-Healer").src="images/healer_blue.png";
                        }
                        if (player1Color.value == "Yellow") {
                            color1[i].style.backgroundColor = "#fada5e";
                            color1[i].style.borderColor = "#997B00";
                            document.getElementById("p1-Melee").src="images/attacker_yellow.png";
                            document.getElementById("p1-Defender").src="images/defender_yellow.png";
                            document.getElementById("p1-Ranger").src="images/ranger_yellow.png";
                            document.getElementById("p1-Healer").src="images/healer_yellow.png";
                        }
                    }
                }

                // cell colors are defined here
                let color2 = document.querySelectorAll("#cell8, #cell9, #cell18, #cell19, #cell28, #cell29, #cell38, #cell39, #cell48, #cell49, #cell58, #cell59, #cell68, #cell69, #cell78, #cell79, #cell88, #cell89, #cell98, #cell99");
                for (let i = 0; i < color2.length; i++) {
                    if (color2) {
                        if (player2Color.value == "Red") {
                            color2[i].style.backgroundColor = "#e9967a";
                            color2[i].style.borderColor = "#7B0000";
                            document.getElementById("p2-Melee").src="images/attacker_red.png";
                            document.getElementById("p2-Defender").src="images/defender_red.png";
                            document.getElementById("p2-Ranger").src="images/ranger_red.png";
                            document.getElementById("p2-Healer").src="images/healer_red.png";
                        }
                        if (player2Color.value == "Green") {
                            color2[i].style.backgroundColor = "#0bd67e";
                            color2[i].style.borderColor = "#047B00";
                            document.getElementById("p2-Melee").src="images/attacker_green.png";
                            document.getElementById("p2-Defender").src="images/defender_green.png";
                            document.getElementById("p2-Ranger").src="images/ranger_green.png";
                            document.getElementById("p2-Healer").src="images/healer_green.png";
                        }
                        if (player2Color.value == "Blue") {
                            color2[i].style.backgroundColor = "#87ceeb";
                            color2[i].style.borderColor = "#001A7B";
                            document.getElementById("p2-Melee").src="images/attacker_blue.png";
                            document.getElementById("p2-Defender").src="images/defender_blue.png";
                            document.getElementById("p2-Ranger").src="images/ranger_blue.png";
                            document.getElementById("p2-Healer").src="images/healer_blue.png";
                        }
                        if (player2Color.value == "Yellow") {
                            color2[i].style.backgroundColor = "#fada5e";
                            color2[i].style.borderColor = "#997B00";
                            document.getElementById("p2-Melee").src="images/attacker_yellow.png";
                            document.getElementById("p2-Defender").src="images/defender_yellow.png";
                            document.getElementById("p2-Ranger").src="images/ranger_yellow.png";
                            document.getElementById("p2-Healer").src="images/healer_yellow.png";
                        }
                    }
                }

            } else if (option.value == "15x15") {
                generateGrid(15, 15)
            //player1 side

                document.querySelector("#cell0").classList.add("drop");
                let cell = document.getElementById("cell0");
                cell.setAttribute('ondrop', "drop(event)")
                cell.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell1").classList.add("drop");
                let cell1 = document.getElementById("cell1");
                cell1.setAttribute('ondrop', "drop(event)")
                cell1.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell15").classList.add("drop");
                let cell15 = document.getElementById("cell15");
                cell15.setAttribute('ondrop', "drop(event)")
                cell15.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell16").classList.add("drop");
                let cell16 = document.getElementById("cell16");
                cell16.setAttribute('ondrop', "drop(event)")
                cell16.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell30").classList.add("drop");
                let cell30 = document.getElementById("cell30");
                cell30.setAttribute('ondrop', "drop(event)")
                cell30.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell31").classList.add("drop");
                let cell31 = document.getElementById("cell31");
                cell31.setAttribute('ondrop', "drop(event)")
                cell31.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell45").classList.add("drop");
                let cell45 = document.getElementById("cell45");
                cell45.setAttribute('ondrop', "drop(event)")
                cell45.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell46").classList.add("drop");
                let cell46 = document.getElementById("cell46");
                cell46.setAttribute('ondrop', "drop(event)")
                cell46.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell60").classList.add("drop");
                let cell60 = document.getElementById("cell60");
                cell60.setAttribute('ondrop', "drop(event)")
                cell60.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell61").classList.add("drop");
                let cell61 = document.getElementById("cell61");
                cell61.setAttribute('ondrop', "drop(event)")
                cell61.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell75").classList.add("drop");
                let cell75 = document.getElementById("cell75");
                cell75.setAttribute('ondrop', "drop(event)")
                cell75.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell76").classList.add("drop");
                let cell76 = document.getElementById("cell76");
                cell76.setAttribute('ondrop', "drop(event)")
                cell76.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell90").classList.add("drop");
                let cell90 = document.getElementById("cell90");
                cell90.setAttribute('ondrop', "drop(event)")
                cell90.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell91").classList.add("drop");
                let cell91 = document.getElementById("cell91");
                cell91.setAttribute('ondrop', "drop(event)")
                cell91.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell105").classList.add("drop");
                let cell105 = document.getElementById("cell105");
                cell105.setAttribute('ondrop', "drop(event)")
                cell105.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell106").classList.add("drop");
                let cell106 = document.getElementById("cell106");
                cell106.setAttribute('ondrop', "drop(event)")
                cell106.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell120").classList.add("drop");
                let cell120 = document.getElementById("cell120");
                cell120.setAttribute('ondrop', "drop(event)")
                cell120.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell121").classList.add("drop");
                let cell121 = document.getElementById("cell121");
                cell121.setAttribute('ondrop', "drop(event)")
                cell121.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell135").classList.add("drop");
                let cell135 = document.getElementById("cell135");
                cell135.setAttribute('ondrop', "drop(event)")
                cell135.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell136").classList.add("drop");
                let cell136 = document.getElementById("cell136");
                cell136.setAttribute('ondrop', "drop(event)")
                cell136.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell150").classList.add("drop");
                let cell150 = document.getElementById("cell150");
                cell150.setAttribute('ondrop', "drop(event)")
                cell150.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell151").classList.add("drop");
                let cell151 = document.getElementById("cell151");
                cell151.setAttribute('ondrop', "drop(event)")
                cell151.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell165").classList.add("drop");
                let cell165 = document.getElementById("cell165");
                cell16.setAttribute('ondrop', "drop(event)")
                cell165.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell166").classList.add("drop");
                let cell166 = document.getElementById("cell166");
                cell166.setAttribute('ondrop', "drop(event)")
                cell166.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell180").classList.add("drop");
                let cell180 = document.getElementById("cell180");
                cell180.setAttribute('ondrop', "drop(event)")
                cell180.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell181").classList.add("drop");
                let cell181 = document.getElementById("cell181");
                cell181.setAttribute('ondrop', "drop(event)")
                cell181.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell195").classList.add("drop");
                let cell195 = document.getElementById("cell195");
                cell195.setAttribute('ondrop', "drop(event)")
                cell195.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell196").classList.add("drop");
                let cell196 = document.getElementById("cell196");
                cell196.setAttribute('ondrop', "drop(event)")
                cell196.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell210").classList.add("drop");
                let cell210 = document.getElementById("cell210");
                cell210.setAttribute('ondrop', "drop(event)")
                cell210.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell211").classList.add("drop");
                let cell211 = document.getElementById("cell211");
                cell211.setAttribute('ondrop', "drop(event)")
                cell211.setAttribute('ondragover', "allowDrop(event)")
                //player2 side

                document.querySelector("#cell13").classList.add("drops");
                let cell13 = document.getElementById("cell13");
                cell13.setAttribute('ondrop', "drop(event)")
                cell13.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell14").classList.add("drops");
                let cell14 = document.getElementById("cell14");
                cell14.setAttribute('ondrop', "drop(event)")
                cell14.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell28").classList.add("drops");
                let cell28 = document.getElementById("cell28");
                cell28.setAttribute('ondrop', "drop(event)")
                cell28.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell29").classList.add("drops");
                let cell29 = document.getElementById("cell29");
                cell29.setAttribute('ondrop', "drop(event)")
                cell29.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell43").classList.add("drops");
                let cell43 = document.getElementById("cell43");
                cell43.setAttribute('ondrop', "drop(event)")
                cell43.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell44").classList.add("drops");
                let cell44 = document.getElementById("cell44");
                cell44.setAttribute('ondrop', "drop(event)")
                cell44.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell58").classList.add("drops");
                let cell58 = document.getElementById("cell58");
                cell58.setAttribute('ondrop', "drop(event)")
                cell58.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell29").classList.add("drops");
                let cell59 = document.getElementById("cell59");
                cell59.setAttribute('ondrop', "drop(event)")
                cell59.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell73").classList.add("drops");
                let cell73 = document.getElementById("cell73");
                cell73.setAttribute('ondrop', "drop(event)")
                cell73.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell74").classList.add("drops");
                let cell74 = document.getElementById("cell74");
                cell74.setAttribute('ondrop', "drop(event)")
                cell74.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell88").classList.add("drops");
                let cell88 = document.getElementById("cell88");
                cell88.setAttribute('ondrop', "drop(event)")
                cell88.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell89").classList.add("drops");
                let cell89 = document.getElementById("cell89");
                cell89.setAttribute('ondrop', "drop(event)")
                cell89.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell103").classList.add("drops");
                let cell103 = document.getElementById("cell103");
                cell103.setAttribute('ondrop', "drop(event)")
                cell103.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell104").classList.add("drops");
                let cell104 = document.getElementById("cell104");
                cell104.setAttribute('ondrop', "drop(event)")
                cell104.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell118").classList.add("drops");
                let cell118 = document.getElementById("cell118");
                cell118.setAttribute('ondrop', "drop(event)")
                cell118.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell119").classList.add("drops");
                let cell119 = document.getElementById("cell119");
                cell119.setAttribute('ondrop', "drop(event)")
                cell119.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell133").classList.add("drops");
                let cell133 = document.getElementById("cell133");
                cell133.setAttribute('ondrop', "drop(event)")
                cell133.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell134").classList.add("drops");
                let cell134 = document.getElementById("cell134");
                cell134.setAttribute('ondrop', "drop(event)")
                cell134.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell148").classList.add("drops");
                let cell148 = document.getElementById("cell148");
                cell148.setAttribute('ondrop', "drop(event)")
                cell148.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell149").classList.add("drops");
                let cell149 = document.getElementById("cell149");
                cell149.setAttribute('ondrop', "drop(event)")
                cell149.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell163").classList.add("drops");
                let cell163 = document.getElementById("cell163");
                cell163.setAttribute('ondrop', "drop(event)")
                cell163.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell164").classList.add("drops");
                let cell164 = document.getElementById("cell164");
                cell164.setAttribute('ondrop', "drop(event)")
                cell164.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell178").classList.add("drops");
                let cell178 = document.getElementById("cell178");
                cell178.setAttribute('ondrop', "drop(event)")
                cell178.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell179").classList.add("drops");
                let cell179 = document.getElementById("cell179");
                cell179.setAttribute('ondrop', "drop(event)")
                cell179.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell193").classList.add("drops");
                let cell193 = document.getElementById("cell193");
                cell193.setAttribute('ondrop', "drop(event)")
                cell193.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell194").classList.add("drops");
                let cell194 = document.getElementById("cell194");
                cell194.setAttribute('ondrop', "drop(event)")
                cell194.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell208").classList.add("drops");
                let cell208 = document.getElementById("cell208");
                cell208.setAttribute('ondrop', "drop(event)")
                cell208.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell209").classList.add("drops");
                let cell209 = document.getElementById("cell209");
                cell209.setAttribute('ondrop', "drop(event)")
                cell209.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell223").classList.add("drops");
                let cell223 = document.getElementById("cell223");
                cell223.setAttribute('ondrop', "drop(event)")
                cell223.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell224").classList.add("drops");
                let cell224 = document.getElementById("cell224");
                cell224.setAttribute('ondrop', "drop(event)")
                cell224.setAttribute('ondragover', "allowDrop(event)")

                let color3 = document.querySelectorAll("#cell0, #cell1, #cell15, #cell16, #cell30, #cell31, #cell45, #cell46, #cell60, #cell61, #cell75, #cell76, #cell90, #cell91, #cell105, #cell106, #cell120, #cell121, #cell135, #cell136, #cell150, #cell151, #cell165, #cell166, #cell180, #cell181, #cell195, #cell196, #cell210, #cell211")
                for (let i = 0; i < color3.length; i++) {
                    if (color3) {
                        if (player1Color.value == "Red") {
                            color3[i].style.backgroundColor = "#e9967a";
                            color3[i].style.borderColor = "#7B0000";
                            document.getElementById("p1-Melee").src="images/attacker_red.png";
                            document.getElementById("p1-Defender").src="images/defender_red.png";
                            document.getElementById("p1-Ranger").src="images/ranger_red.png";
                            document.getElementById("p1-Healer").src="images/healer_red.png";
                        }
                        if (player1Color.value == "Green") {
                            color3[i].style.backgroundColor = "#0bd67e";
                            color3[i].style.borderColor = "#047B00";
                            document.getElementById("p1-Melee").src="images/attacker_green.png";
                            document.getElementById("p1-Defender").src="images/defender_green.png";
                            document.getElementById("p1-Ranger").src="images/ranger_green.png";
                            document.getElementById("p1-Healer").src="images/healer_green.png";
                        }
                        if (player1Color.value == "Blue") {
                            color3[i].style.backgroundColor = "#87ceeb";
                            color3[i].style.borderColor = "#001A7B";
                            document.getElementById("p1-Melee").src="images/attacker_blue.png";
                            document.getElementById("p1-Defender").src="images/defender_blue.png";
                            document.getElementById("p1-Ranger").src="images/ranger_blue.png";
                            document.getElementById("p1-Healer").src="images/healer_blue.png";
                        }
                        if (player1Color.value == "Yellow") {
                            color3[i].style.backgroundColor = "#fada5e";
                            color3[i].style.borderColor = "#997B00";
                            document.getElementById("p1-Melee").src="images/attacker_yellow.png";
                            document.getElementById("p1-Defender").src="images/defender_yellow.png";
                            document.getElementById("p1-Ranger").src="images/ranger_yellow.png";
                            document.getElementById("p1-Healer").src="images/healer_yellow.png";
                        }
                    }

                    let color4 = document.querySelectorAll("#cell13, #cell14, #cell28, #cell29, #cell43, #cell44, #cell58, #cell59, #cell73, #cell74, #cell88, #cell89, #cell103, #cell104, #cell118, #cell119, #cell133, #cell134, #cell148, #cell149, #cell163, #cell164, #cell178, #cell179, #cell193, #cell194, #cell208, #cell209, #cell223, #cell224")
                    for (let i = 0; i < color4.length; i++) {
                        if (color4) {
                            if (player2Color.value == "Red") {
                                color4[i].style.backgroundColor = "#e9967a"
                                color4[i].style.borderColor = "#7B0000";
                                document.getElementById("p2-Melee").src="images/attacker_red.png";
                                document.getElementById("p2-Defender").src="images/defender_red.png";
                                document.getElementById("p2-Ranger").src="images/ranger_red.png";
                                document.getElementById("p2-Healer").src="images/healer_red.png";
                            }
                            if (player2Color.value == "Green") {
                                color4[i].style.backgroundColor = "#0bd67e";
                                color4[i].style.borderColor = "#047B00";
                                document.getElementById("p2-Melee").src="images/attacker_green.png";
                                document.getElementById("p2-Defender").src="images/defender_green.png";
                                document.getElementById("p2-Ranger").src="images/ranger_green.png";
                                document.getElementById("p2-Healer").src="images/healer_green.png";
                            }
                            if (player2Color.value == "Blue") {
                                color4[i].style.backgroundColor = "#87ceeb"
                                color4[i].style.borderColor = "#001A7B";
                                document.getElementById("p2-Melee").src="images/attacker_blue.png";
                                document.getElementById("p2-Defender").src="images/defender_blue.png";
                                document.getElementById("p2-Ranger").src="images/ranger_blue.png";
                                document.getElementById("p2-Healer").src="images/healer_blue.png";
                            }
                            if (player2Color.value == "Yellow") {
                                color4[i].style.backgroundColor = "#fada5e";
                                color4[i].style.borderColor = "#997B00";
                                document.getElementById("p2-Melee").src="images/attacker_yellow.png";
                                document.getElementById("p2-Defender").src="images/defender_yellow.png";
                                document.getElementById("p2-Ranger").src="images/ranger_yellow.png";
                                document.getElementById("p2-Healer").src="images/healer_yellow.png";
                            }
                        }
                    }
                }
            } else if (option.value == "20x20") {
                generateGrid(20, 20)
                let color5 = document.querySelectorAll("#cell0, #cell1, #cell20, #cell21, #cell40, #cell41, #cell60, #cell61, #cell80, #cell81, #cell100, #cell101, #cell120, #cell121, #cell140, #cell141, #cell160, #cell161, #cell180, #cell181, #cell200, #cell201, #cell220, #cell221, #cell240, #cell241, #cell260, #cell261, #cell280, #cell281, #cell300, #cell301, #cell320, #cell321, #cell340, #cell341, #cell360, #cell361, #cell380, #cell381")
                for (let i = 0; i < color5.length; i++) {
                    if (color5) {
                        if (player1Color.value == "Red") {
                            color5[i].style.backgroundColor = "#e9967a"
                            color5[i].style.borderColor = "#7B0000";
                            document.getElementById("p1-Melee").src="images/attacker_red.png";
                            document.getElementById("p1-Defender").src="images/defender_red.png";
                            document.getElementById("p1-Ranger").src="images/ranger_red.png";
                            document.getElementById("p1-Healer").src="images/healer_red.png";
                        }
                        if (player1Color.value == "Green") {
                            color5[i].style.backgroundColor = "#0bd67e";
                            color5[i].style.borderColor = "#047B00";
                            document.getElementById("p1-Melee").src="images/attacker_green.png";
                            document.getElementById("p1-Defender").src="images/defender_green.png";
                            document.getElementById("p1-Ranger").src="images/ranger_green.png";
                            document.getElementById("p1-Healer").src="images/healer_green.png";
                        }
                        if (player1Color.value == "Blue") {
                            color5[i].style.backgroundColor = "#87ceeb";
                            color5[i].style.borderColor = "#001A7B";
                            document.getElementById("p1-Melee").src="images/attacker_blue.png";
                            document.getElementById("p1-Defender").src="images/defender_blue.png";
                            document.getElementById("p1-Ranger").src="images/ranger_blue.png";
                            document.getElementById("p1-Healer").src="images/healer_blue.png";
                        }
                        if (player1Color.value == "Yellow") {
                            color5[i].style.backgroundColor = "#fada5e";
                            color5[i].style.borderColor = "#997B00";
                            document.getElementById("p1-Melee").src="images/attacker_yellow.png";
                            document.getElementById("p1-Defender").src="images/defender_yellow.png";
                            document.getElementById("p1-Ranger").src="images/ranger_yellow.png";
                            document.getElementById("p1-Healer").src="images/healer_yellow.png";
                        }
                    }
                }

                let color6 = document.querySelectorAll("#cell18, #cell19, #cell38, #cell39, #cell58, #cell59, #cell78, #cell79, #cell98, #cell99, #cell118, #cell119, #cell138, #cell139, #cell158, #cell159, #cell178, #cell179, #cell198, #cell199, #cell218, #cell219, #cell238, #cell239, #cell258, #cell259, #cell278, #cell279, #cell298, #cell299, #cell318, #cell319, #cell338, #cell339, #cell358, #cell359, #cell378, #cell379, #cell398, #cell399")
                for (let i = 0; i < color6.length; i++) {
                    if (color6) {
                        if (player2Color.value == "Red") {
                            color6[i].style.backgroundColor = "#e9967a";
                            color6[i].style.borderColor = "#7B0000";
                            document.getElementById("p2-Melee").src="images/attacker_red.png";
                            document.getElementById("p2-Defender").src="images/defender_red.png";
                            document.getElementById("p2-Ranger").src="images/ranger_red.png";
                            document.getElementById("p2-Healer").src="images/healer_red.png";
                        }
                        if (player2Color.value == "Green") {
                            color6[i].style.backgroundColor = "#0bd67e";
                            color6[i].style.borderColor = "#047B00";
                            document.getElementById("p2-Melee").src="images/attacker_green.png";
                            document.getElementById("p2-Defender").src="images/defender_green.png";
                            document.getElementById("p2-Ranger").src="images/ranger_green.png";
                            document.getElementById("p2-Healer").src="images/healer_green.png";
                        }
                        if (player2Color.value == "Blue") {
                            color6[i].style.backgroundColor = "#87ceeb";
                            color6[i].style.borderColor = "#001A7B";
                            document.getElementById("p2-Melee").src="images/attacker_blue.png";
                            document.getElementById("p2-Defender").src="images/defender_blue.png";
                            document.getElementById("p2-Ranger").src="images/ranger_blue.png";
                            document.getElementById("p2-Healer").src="images/healer_blue.png";
                        }
                        if (player2Color.value == "Yellow") {
                            color6[i].style.backgroundColor = "#fada5e";
                            color6[i].style.borderColor = "#997B00";
                            document.getElementById("p2-Melee").src="images/attacker_yellow.png";
                            document.getElementById("p2-Defender").src="images/defender_yellow.png";
                            document.getElementById("p2-Ranger").src="images/ranger_yellow.png";
                            document.getElementById("p2-Healer").src="images/healer_yellow.png";
                        }
                    }
                }

            } else if (option.value == "") {
                alert("Please pick a size");
                document.location.reload();
            }
            document.getElementById("p1").style.visibility = "visible"
            document.getElementById("p2").style.visibility = "visible"
            document.getElementById("game-board").style.visibility = "visible"
            document.getElementById('board-size').remove();
            document.getElementById("board-size-box").remove();
            document.getElementById('submit').remove();
            //document.getElementById('player2Name').remove();
            //document.getElementById('player1Name').remove();
            //document.getElementById('player1Color').remove();
            //document.getElementById('words').remove();
            //document.getElementById('player2Color').remove();
            //document.getElementById('words1').remove();
            document.getElementById("ready-check1").innerHTML = "Not Ready";
            document.getElementById("ready-check2").innerHTML = "Not Ready";

            if (player1Color.value == "Red") {
                document.getElementById("ready1").style.backgroundColor = "#e9967a";
            }
            if (player1Color.value == "Green") {
                document.getElementById("ready1").style.backgroundColor = "#0bd67e";
            }
            if (player1Color.value == "Blue") {
                document.getElementById("ready1").style.backgroundColor = "#87ceeb";
            }
            if (player1Color.value == "Yellow") {
                document.getElementById("ready1").style.backgroundColor = "#fada5e";
            }

            if (player2Color.value == "Red") {
                document.getElementById("ready2").style.backgroundColor = "#e9967a";
            }
            if (player2Color.value == "Green") {
                document.getElementById("ready2").style.backgroundColor = "#0bd67e";
            }
            if (player2Color.value == "Blue") {
                document.getElementById("ready2").style.backgroundColor = "#87ceeb";
            }
            if (player2Color.value == "Yellow") {
                document.getElementById("ready2").style.backgroundColor = "#fada5e";
            }

            //optimize this so no matter what order you click it will do the set timeout
            ready1.addEventListener('click', event => {
                document.getElementById("ready1").remove();
                document.getElementById("ready-check1").innerHTML = "Ready!";
                document.getElementById("p1").remove();
                document.getElementById("ready2").style.marginLeft = "67.3%"

            })
            ready2.addEventListener('click', event => {
                document.getElementById("ready2").remove();
                document.getElementById("ready-check2").innerHTML = "Ready!";
                document.getElementById("p2").remove();

                function countDown(i, callback) {
                    callback = callback || function() {};
                    var int = setInterval(function() {
                        document.getElementById("displayDiv").innerHTML = "Game starting in: " + i;
                        i-- || (clearInterval(int), callback());
                    }, 1000);
                }
                countDown(5, function() {
                    alert("game started");
                    //Not sure if this works
                    document.getElementById("displayDiv").remove();
                });
            })
            //optimize this better. Timer for change colors
            setInterval(
                function() {

                    if (player2Color.value == "Red") {
                        document.body.style.backgroundColor = "#e9967a";
                    }
                    if (player2Color.value == "Green") {
                        document.body.style.backgroundColor = "#0bd67e";
                    }
                    if (player2Color.value == "Blue") {
                        document.body.style.backgroundColor = "#87ceeb";
                    }
                    if (player2Color.value == "Yellow") {
                        document.body.style.backgroundColor = "#fada5e";
                    }
                }, 5000)
            setInterval(
                function() {
                    if (player1Color.value == "Red") {
                        document.body.style.backgroundColor = "#e9967a";
                    }
                    if (player1Color.value == "Green") {
                        document.body.style.backgroundColor = "#0bd67e";
                    }
                    if (player1Color.value == "Blue") {
                        document.body.style.backgroundColor = "#87ceeb";
                    }
                    if (player1Color.value == "Yellow") {
                        document.body.style.backgroundColor = "#fada5e";
                    }

                }, 4000
            )

            if (currentturn == player1) {
                if (player1Color.value == "Red") {
                    document.body.style.backgroundColor = "#e9967a";
                }
                if (player1Color.value == "Green") {
                    document.body.style.backgroundColor = "#0bd67e";
                }
                if (player1Color.value == "Blue") {
                    document.body.style.backgroundColor = "#87ceeb";
                }
                if (player1Color.value == "Yellow") {
                    document.body.style.backgroundColor = "#fada5e";
                }
            }

})
ready2.addEventListener('click', event => {
    document.getElementById("ready2").remove();
    document.getElementById("ready-check2").innerHTML = "Ready!"
    document.getElementById("p2").remove();
    function countDown(i, callback) {
        callback = callback || function(){};
        var int = setInterval(function() {
            document.getElementById("displayDiv").innerHTML = "Game starting in: " + i;
            i-- || (clearInterval(int), callback());
        }, 1000);
    }
    countDown(5, function(){
        alert("game started")
        //Not sure if this works
        document.getElementById("displayDiv").remove();
        document.getElementById("ready-check1").remove();
        document.getElementById("ready-check2").remove();
    });
})
    //optimize this better. Timer for change colors
    
})
})


function listingM1() {
  document.getElementById("ActionsM1").classList.toggle("show");
}
function listingR1() {
  document.getElementById("ActionsR1").classList.toggle("show");
}
function listingD1() {
  document.getElementById("ActionsD1").classList.toggle("show");
}
function listingH1() {
  document.getElementById("ActionsH1").classList.toggle("show");
}

function listingM2() {
  document.getElementById("ActionsM2").classList.toggle("show");
}
function listingR2() {
  document.getElementById("ActionsR2").classList.toggle("show");
}
function listingD2() {
  document.getElementById("ActionsD2").classList.toggle("show");
}
function listingH2() {
  document.getElementById("ActionsH2").classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("actList");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}


let mAtt1 = document.getElementById("attackM1");
let mMove1 = document.getElementById("movementM1");
let mEndTurn1 = document.getElementById("endTurnM1");

let rAtt1 = document.getElementById("attackR1");
let rMove1 = document.getElementById("movementR1");
let rEndTurn1 = document.getElementById("endTurnR1");

let dAtt1 = document.getElementById("attackD1");
let dMove1 = document.getElementById("movementD1");
let dEndTurn1 = document.getElementById("endTurnD1");

let hHeal1 = document.getElementById("healH1");
let hAtt1 = document.getElementById("attackH1");
let hMove1 = document.getElementById("movementH1");
let hEndTurn1 = document.getElementById("endTurnH1");




let mAtt2 = document.getElementById("attackM2");
let mMove2 = document.getElementById("movementM2");
let mEndTurn2 = document.getElementById("endTurnM2");

let rAtt2 = document.getElementById("attackR2");
let rMove2 = document.getElementById("movementR2");
let rEndTurn2 = document.getElementById("endTurnR2");

let dAtt2 = document.getElementById("attackD2");
let dMove2 = document.getElementById("movementD2");
let dEndTurn2 = document.getElementById("endTurnD2");

let hHeal2 = document.getElementById("healH2");
let hAtt2 = document.getElementById("attackH2");
let hMove2 = document.getElementById("movementH2");
let hEndTurn2 = document.getElementById("endTurnH2");



function AttackM1() {
    let at = -1;
    let pos = 0;
    while (at == -1)
    {
        if (cellArr[pos].hasAnything && cellArr[pos].shipType == "Melee" && cellArr[pos].shipColor == "p1")
        {
            console.log("Found it at " + pos);
            at = pos;
            
        }
        pos++;
    }
    attackInARange(at,2);
}

function MovementM1(){
    let at = -1;
    let pos = 0;
    while (at == -1)
    {
        if (cellArr[pos].hasAnything && cellArr[pos].shipType == "Melee" && cellArr[pos].shipColor == "p1")
        {
            console.log("Found it at " + pos);
            at = pos;
            
        }
        pos++;
    }
    move(at,2,"p1-Melee");
}

function EndTurnM1(){

}

function AttackR1() {

}

function MovementR1(){
    let at = -1;
    let pos = 0;
    while (at == -1)
    {
        if (cellArr[pos].hasAnything && cellArr[pos].shipType == "Ranger" && cellArr[pos].shipColor == "p1")
        {
            console.log("Found it at " + pos);
            at = pos;
            
        }
        pos++;
    }
    move(at,2,"p1-Ranger");

}

function EndTurnR1(){

}

function AttackD1() {

}

function MovementD1(){
    let at = -1;
    let pos = 0;
    while (at == -1)
    {
        if (cellArr[pos].hasAnything && cellArr[pos].shipType == "Defender" && cellArr[pos].shipColor == "p1")
        {
            console.log("Found it at " + pos);
            at = pos;
            
        }
        pos++;
    }
    move(at,1,"p1-Defender");

}

function EndTurnD1(){

}

function HealH1(){

}

function AttackH1() {

}

function MovementH1(){
    let at = -1;
    let pos = 0;
    while (at == -1)
    {
        if (cellArr[pos].hasAnything && cellArr[pos].shipType == "Healer" && cellArr[pos].shipColor == "p1")
        {
            console.log("Found it at " + pos);
            at = pos;
            
        }
        pos++;
    }
    move(at,3,"p1-Healer");

}

function EndTurnH1(){

}




function AttackM2() {

}

function MovementM2(){
    let at = -1;
    let pos = 0;
    while (at == -1)
    {
        if (cellArr[pos].hasAnything && cellArr[pos].shipType == "Melee" && cellArr[pos].shipColor == "p2")
        {
            console.log("Found it at " + pos);
            at = pos;
            
        }
        pos++;
    }
    move(at,2,"p2-Melee");

}

function EndTurnM2(){

}

function AttackR2() {

}

function MovementR2(){
    let at = -1;
    let pos = 0;
    while (at == -1)
    {
        if (cellArr[pos].hasAnything && cellArr[pos].shipType == "Ranger" && cellArr[pos].shipColor == "p2")
        {
            console.log("Found it at " + pos);
            at = pos;
            
        }
        pos++;
    }
    move(at,2,"p2-Ranger");

}

function EndTurnR2(){

}

function AttackD2() {

}

function MovementD2(){
    let at = -1;
    let pos = 0;
    while (at == -1)
    {
        if (cellArr[pos].hasAnything && cellArr[pos].shipType == "Defender" && cellArr[pos].shipColor == "p2")
        {
            console.log("Found it at " + pos);
            at = pos;
            
        }
        pos++;
    }
    move(at,1,"p2-Defender");

}

function EndTurnD2(){

}

function HealH2(){

}

function AttackH2() {

}

function MovementH2(){
    let at = -1;
    let pos = 0;
    while (at == -1)
    {
        if (cellArr[pos].hasAnything && cellArr[pos].shipType == "Healer" && cellArr[pos].shipColor == "p2")
        {
            console.log("Found it at " + pos);
            at = pos;
            
        }
        pos++;
    }
    move(at,3,"p2-Healer");

}

function EndTurnH2(){

}



function printArray() {
    console.log(cellArr);
}

// EACH CELL HAS
// ID
// obstacle/no obstacle
// player/no player// This is just a sample script. Paste your real code (javascript or HTML) here.
