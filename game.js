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

let img_melee1 = document.getElementById("p1-Melee")
let img_defender1 = document.getElementById("p1-Defender")
let img_ranger1 = document.getElementById("p1-Ranger")
let img_healer1 = document.getElementById("p1-Healer")
let img_melee2 = document.getElementById("p2-Melee")
let img_defender2 = document.getElementById("p2-Defender")
let img_ranger2 = document.getElementById("p2-Ranger")
let img_healer2 = document.getElementById("p2-Healer")
const drops = [].slice.call(
    document.querySelectorAll( '.drop' ), 0 );
let ready1 = document.getElementById("ready1")
let ready2 = document.getElementById("ready2")
let ready3 = document.getElementById("ready3")
const Melee1 = document.getElementById('ActionsM1');
Melee1.style.display = "none";

const Ranger1 = document.getElementById('ActionsR1');
Ranger1.style.display = "none";

const Defender1 = document.getElementById('ActionsD1');
Defender1.style.display = "none";

const Healer1 = document.getElementById('ActionsH1');
Healer1.style.display = "none";

const Melee2 = document.getElementById('ActionsM2');
Melee2.style.display = "none";

const Ranger2 = document.getElementById('ActionsR2');
Ranger2.style.display = "none";

const Defender2 = document.getElementById('ActionsD2');
Defender2.style.display = "none";

const Healer2 = document.getElementById('ActionsH2');
Healer2.style.display = "none";

let cellArr = [];

let canDoDamage = true;
let moveable = true;


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


function drawHP()
{
    document.getElementById("p1-Melee-HP").innerHTML = "DESTROYED!";
    document.getElementById("p1-Defender-HP").innerHTML = "DESTROYED!";
    document.getElementById("p1-Ranger-HP").innerHTML = "DESTROYED!";
    document.getElementById("p1-Healer-HP").innerHTML = "DESTROYED!";

    document.getElementById("p2-Melee-HP").innerHTML = "DESTROYED!";
    document.getElementById("p2-Defender-HP").innerHTML = "DESTROYED!";
    document.getElementById("p2-Ranger-HP").innerHTML = "DESTROYED!";
    document.getElementById("p2-Healer-HP").innerHTML = "DESTROYED!";

    cellArr.forEach(function(element) {
        if (element.hasAnything) {
            //console.log(element.shipColor+"-"+element.shipType+"-HP");
            //console.log(document.getElementById(element.shipColor+"-"+element.shipType+"-HP"));
           document.getElementById(element.shipColor+"-"+element.shipType+"-HP").innerHTML = element.HP + " HP";
        }
    })
}

function addShipTo(thisCell, thisShip, thisColor) {
    var result = shipStats.filter(x => x.shipType == thisShip);

    cellArr[thisCell] = {
        "id": thisCell,
        "hasAnything": true,
        "hasObstacle": false,
        "shipType": thisShip,
        "shipColor": thisColor,
        "HP": result[0].shipHP,
    }
    drawHP();
}

function moveShipTo(from, to) {
    if (!moveable) return;
    cellArr[to] = {
        "id": cellArr[from].id,
        "hasAnything": true,
        "hasObstacle": false,
        "shipType": cellArr[from].shipType,
        "shipColor": cellArr[from].shipColor,
        "HP": cellArr[from].HP,
    }

    cellArr[from] = {
        "id": from,
        "hasAnything": false,
        "hasObstacle": false,
        "shipType": null,
        "shipColor": null,
        "HP": -1,
    }
    moveable = false;
}

function chooseYourShips() {
    blueShipsToChoose = 3;
    redShipsToChoose = 3;
    blueShipsToPlace = 0;
    redShipsToPlace = 0;
}
function attackCell(cell, color, damage) {
    if(canDoDamage)
    {
        if (cellArr[cell].hasAnything) {
            if (cellArr[cell].shipColor != color) {
                cellArr[cell].HP -= damage;
            }
            if(cellArr[cell].HP < 1)
            {
                document.getElementById("cell" + cell).removeChild(document.getElementById("cell" + cell).firstChild);
                cellArr[cell] = {
                    "hasAnything": false,
                    "hasObstacle": false,
                    "shipType": null,
                    "shipColor": null,
                    "HP": -1,
                }
            }
        }
    }

    canDoDamage = false;
    drawHP();

}

function decideRow(startAt,damage)
{
    colorRow(startAt,damage);
    colorColumn(startAt,damage);
}

function colorRow(startAt, damage) {

        let cellStart = startAt;
        let endAt = numberOfColumns * (Math.trunc(startAt / numberOfColumns) + 1)

        while (true) {
            if (isAtRight(cellStart)) break;
            cellStart++;
            let cell = document.getElementById("cell" + cellStart);
            cell.style.backgroundColor = "red"
            cell.addEventListener('click',cell.fn=function fn()
            {
                attackRow(null,startAt,true,damage);
            });
        }

        cellStart = startAt;
        endAt = numberOfColumns * (Math.trunc(startAt / numberOfColumns)) + 1

        while (cellStart >= endAt) {
            if (isAtLeft(cellStart)) break;
            cellStart--;
            let cell = document.getElementById("cell" + cellStart);
            cell.style.background = "red"
            cell.addEventListener('click',cell.fn=function fn()
            {
                attackRow(null,startAt,false,damage);
            });
        }
    }

function colorColumn(startAt, damage) {

        let cellStart = startAt;
        while (true) {
            if (isAtBottom(cellStart)) break;
            cellStart += numberOfColumns;
            let cell = document.getElementById("cell" + cellStart);
            cell.style.backgroundColor = "red"
            cell.addEventListener('click',cell.fn=function fn()
            {
                attackColumn(null,startAt,true,damage);
            });
        }

        cellStart = startAt;
        while (true) {
            if (isAtTop(cellStart)) break;
            cellStart -= numberOfColumns;
            let cell = document.getElementById("cell" + cellStart);
            cell.style.backgroundColor = "red"
            cell.addEventListener('click',cell.fn=function fn()
            {
                attackColumn(null,startAt,false,damage);
            });
        }
    }


function attackRow(yourColor, startAt, toRight, damage) {
    if (toRight) {
        let cellStart = startAt;
        let endAt = numberOfColumns * (Math.trunc(startAt / numberOfColumns) + 1)

        while (true) {
            canDoDamage = true;
            if (isAtRight(cellStart)) break;
            cellStart++;
            let cell = document.getElementById("cell" + cellStart);
            cell.style.backgroundColor = "red"
            attackCell(cellStart, yourColor, damage);
        }
    } else {
        let cellStart = startAt;
        let endAt = numberOfColumns * (Math.trunc(startAt / numberOfColumns)) + 1

        while (cellStart >= endAt) {
            canDoDamage = true;
            if (isAtLeft(cellStart)) break;
            cellStart--;
            let cell = document.getElementById("cell" + cellStart);
            cell.style.background = "red"
            attackCell(cellStart, yourColor, damage);
        }
    }
    var cells = document.getElementsByClassName("game-cell");
    for (var i = 0; i < cells.length; i++) {
        var replace = cells.item(i).cloneNode(true);
        replace.style.backgroundColor = "#9CEAEF";
        cells.item(i).parentNode.replaceChild(replace,cells.item(i));
        }
    }


function attackColumn(yourColor, startAt, down, damage) {
    if (down) {
        let cellStart = startAt;
        while (true) {
            if (isAtBottom(cellStart)) break;
            cellStart += numberOfColumns;
            canDoDamage = true;
            let cell = document.getElementById("cell" + cellStart);
            cell.style.backgroundColor = "red"
            attackCell(cellStart, yourColor, damage);
        }
    } else {
        let cellStart = startAt;
        while (true) {
            if (isAtTop(cellStart)) break;
            cellStart -= numberOfColumns;
            canDoDamage = true;
            let cell = document.getElementById("cell" + cellStart);
            cell.style.backgroundColor = "red"
            attackCell(cellStart, yourColor, damage);
        }
    }
    var cells = document.getElementsByClassName("game-cell");
    for (var i = 0; i < cells.length; i++) {
        var replace = cells.item(i).cloneNode(true);
        replace.style.backgroundColor = "#9CEAEF";

        cells.item(i).parentNode.replaceChild(replace,cells.item(i));
        }
    }


function heal(cell,hp)
{
    if (cellArr[cell].hasAnything) {
        
            cellArr[cell].HP += hp;
        
    }

    drawHP();
}

function chooseHeal(startAt, hp)
{
    if (!isAtTop(startAt))
    {
        startAt -= numberOfColumns;
        let cell = document.getElementById("cell" + startAt);
        cell.style.backgroundColor = "green";
        cell.addEventListener('click', cell.fn=function fn()
        {

            heal(cell.id.substring(4),hp);

            var cells = document.getElementsByClassName("game-cell");
            for (var i = 0; i < cells.length; i++) {
                if (i != cell.id.substring(4)){
                var replace = cells.item(i).cloneNode(true);
                replace.style.backgroundColor = "#9CEAEF";

                cells.item(i).parentNode.replaceChild(replace,cells.item(i));
                }
                else
                {
                    cell.style.backgroundColor = "#9CEAEF";
                }
            }

        },{once:true});
        startAt += numberOfColumns;
        console.log("E");
    }

    if (!isAtRight(startAt))
    {
        startAt++;
        let cell = document.getElementById("cell" + startAt);
        cell.style.backgroundColor = "green";
        cell.addEventListener('click', cell.fn=function fn()
        {

            heal(cell.id.substring(4),hp);

            var cells = document.getElementsByClassName("game-cell");
            for (var i = 0; i < cells.length; i++) {
                if (i != cell.id.substring(4)){
                var replace = cells.item(i).cloneNode(true);
                replace.style.backgroundColor = "#9CEAEF";

                cells.item(i).parentNode.replaceChild(replace,cells.item(i));
                }
                else
                {
                    cell.style.backgroundColor = "#9CEAEF";
                }
            }

        },{once:true});
        startAt--;
        console.log("E");
    }

    if (!isAtBottom(startAt))
    {
        startAt += numberOfColumns;
        let cell = document.getElementById("cell" + startAt);
        cell.style.backgroundColor = "green";
        cell.addEventListener('click', cell.fn=function fn()
        {

            heal(cell.id.substring(4),hp);

            var cells = document.getElementsByClassName("game-cell");
            for (var i = 0; i < cells.length; i++) {
                if (i != cell.id.substring(4)){
                var replace = cells.item(i).cloneNode(true);
                replace.style.backgroundColor = "#9CEAEF";

                cells.item(i).parentNode.replaceChild(replace,cells.item(i));
                }
                else
                {
                    cell.style.backgroundColor = "#9CEAEF";
                }
            }

        },{once:true});
        startAt -= numberOfColumns;
        console.log("E");
    }

    if (!isAtLeft(startAt))
    {
        startAt--;
        let cell = document.getElementById("cell" + startAt);
        cell.style.backgroundColor = "green";
        cell.addEventListener('click', cell.fn=function fn()
        {

            heal(cell.id.substring(4),hp);

            var cells = document.getElementsByClassName("game-cell");
            for (var i = 0; i < cells.length; i++) {
                if (i != cell.id.substring(4)){
                var replace = cells.item(i).cloneNode(true);
                replace.style.backgroundColor = "#9CEAEF";

                cells.item(i).parentNode.replaceChild(replace,cells.item(i));
                }
                else
                {
                    cell.style.backgroundColor = "#9CEAEF";
                }
            }

        },{once:true});
        startAt++;
        console.log("E");
    }
}


function attackInARange(at, range, color, damage) {
    canDoDamage = true;
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
            cell.style.backgroundColor = "red";
            cell.addEventListener('click', cell.fn=function fn()
            {

                attackCell(cell.id.substring(4),color,damage);

                var cells = document.getElementsByClassName("game-cell");
                for (var i = 0; i < cells.length; i++) {
                    if (i != cell.id.substring(4)){
                    var replace = cells.item(i).cloneNode(true);
                    replace.style.backgroundColor = "#9CEAEF";

                    cells.item(i).parentNode.replaceChild(replace,cells.item(i));
                    }
                    else
                    {
                        cell.style.backgroundColor = "#9CEAEF";
                    }
                }

            },{once:true});
            goUps--;

        }

        while (goRights > 0) {
            if (isAtRight(adding)) break;
            adding++;
            let cell = document.getElementById("cell" + adding);
            cell.style.backgroundColor = "red";
            cell.addEventListener('click', cell.fn=function fn()
            {
                attackCell(cell.id.substring(4),color,damage);

                var cells = document.getElementsByClassName("game-cell");
                for (var i = 0; i < cells.length; i++) {
                    if (i != cell.id.substring(4)){
                        var replace = cells.item(i).cloneNode(true);
                        replace.style.backgroundColor = "#9CEAEF";
                    cells.item(i).parentNode.replaceChild(replace,cells.item(i));
                    }
                }
                cell.style.backgroundColor = "#9CEAEF";


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

    //sleep(1000);

    while (rights > 0) {
        let adding = at;
        let goRights = rights;
        let goDowns = downs;

        while (goRights > 0) {
            if (isAtRight(adding)) break;
            adding++;
            let cell = document.getElementById("cell" + adding);
            cell.style.backgroundColor = "red";
            cell.addEventListener('click', cell.fn=function fn()
            {
                attackCell(cell.id.substring(4),color,damage);

                var cells = document.getElementsByClassName("game-cell");
                for (var i = 0; i < cells.length; i++) {
                    if (i != cell.id.substring(4)){
                        var replace = cells.item(i).cloneNode(true);
                        replace.style.backgroundColor = "#9CEAEF";
                    cells.item(i).parentNode.replaceChild(replace,cells.item(i));
                    }
                }
                cell.style.backgroundColor = "#9CEAEF";


            },{once:true});
            goRights--;
        }

        while (goDowns > 0) {
            if (isAtBottom(adding)) break;
            adding += numberOfColumns
            let cell = document.getElementById("cell" + adding);
            cell.style.backgroundColor = "red";
            cell.addEventListener('click', cell.fn=function fn()
            {
                attackCell(cell.id.substring(4),color,damage);

                var cells = document.getElementsByClassName("game-cell");
                for (var i = 0; i < cells.length; i++) {
                    if (i != cell.id.substring(4)){
                        var replace = cells.item(i).cloneNode(true);
                        replace.style.backgroundColor = "#9CEAEF";
                    cells.item(i).parentNode.replaceChild(replace,cells.item(i));
                    }
                }
                cell.style.backgroundColor = "#9CEAEF";


            },{once:true});
            goDowns--;
        }
        rights--;
        downs++;
    }

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
            cell.style.backgroundColor = "red";
            cell.addEventListener('click', cell.fn=function fn()
            {
                attackCell(cell.id.substring(4),color,damage);

                var cells = document.getElementsByClassName("game-cell");
                for (var i = 0; i < cells.length; i++) {
                    if (i != cell.id.substring(4)){
                        var replace = cells.item(i).cloneNode(true);
                        replace.style.backgroundColor = "#9CEAEF";
                    cells.item(i).parentNode.replaceChild(replace,cells.item(i));
                    }
                }
                cell.style.backgroundColor = "#9CEAEF";


            },{once:true});
            goDowns--;
        }

        while (goLefts > 0) {
            if (isAtLeft(adding)) break;
            adding--;
            let cell = document.getElementById("cell" + adding);
            cell.style.backgroundColor = "red";
            cell.addEventListener('click', cell.fn=function fn()
            {
                attackCell(cell.id.substring(4),color,damage);

                var cells = document.getElementsByClassName("game-cell");
                for (var i = 0; i < cells.length; i++) {
                    if (i != cell.id.substring(4)){
                        var replace = cells.item(i).cloneNode(true);
                        replace.style.backgroundColor = "#9CEAEF";
                    cells.item(i).parentNode.replaceChild(replace,cells.item(i));
                    }
                }
                cell.style.backgroundColor = "#9CEAEF";


            },{once:true});
            goLefts--;
        }

        downs--;
        lefts++;
    }


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
            cell.style.backgroundColor = "red";
            cell.addEventListener('click', cell.fn=function fn()
            {
                attackCell(cell.id.substring(4),color,damage);

                var cells = document.getElementsByClassName("game-cell");
                for (var i = 0; i < cells.length; i++) {
                    if (i != cell.id.substring(4)){
                        var replace = cells.item(i).cloneNode(true);
                        replace.style.backgroundColor = "#9CEAEF";
                    cells.item(i).parentNode.replaceChild(replace,cells.item(i));
                    }
                }
                cell.style.backgroundColor = "#9CEAEF";


            },{once:true});
            goLefts--;
        }

        while (goUps > 0) {
            if (isAtTop(adding)) break;
            adding -= numberOfColumns;
            let cell = document.getElementById("cell" + adding);
            cell.style.backgroundColor = "red";
            cell.addEventListener('click', cell.fn=function fn()
            {
                attackCell(cell.id.substring(4),color,damage);

                var cells = document.getElementsByClassName("game-cell");
                for (var i = 0; i < cells.length; i++) {
                    if (i != cell.id.substring(4)){
                        var replace = cells.item(i).cloneNode(true);
                        replace.style.backgroundColor = "#9CEAEF";
                    cells.item(i).parentNode.replaceChild(replace,cells.item(i));
                    }
                }
                cell.style.backgroundColor = "#9CEAEF";


            },{once:true});
            goUps--;
        }
        lefts--;
        ups++;
    }
}


function move(at, range, moving) {
    moveable = true;
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
            if (!cellArr[cell.id.substring(4)].hasAnything){
            cell.style.backgroundColor = "blue";
            cell.addEventListener('click', cell.fn=function fn()
            {
                moveShipTo(at,cell.id.substring(4));
                cell.appendChild(document.getElementById(moving));
                 var cells = document.getElementsByClassName("game-cell");
                for (var i = 0; i < cells.length; i++) {
                    if (i != cell.id.substring(4)){
                    var replace = cells.item(i).cloneNode(true);
                    replace.style.backgroundColor = "#9CEAEF";
                    cells.item(i).parentNode.replaceChild(replace,cells.item(i));
                    }
                }
                cell.style.backgroundColor = "#9CEAEF";


            },{once:true});}
            goUps--;

        }

        while (goRights > 0) {
            if (isAtRight(adding)) break;
            adding++;
            let cell = document.getElementById("cell" + adding);
            if (!cellArr[cell.id.substring(4)].hasAnything){

            cell.style.backgroundColor = "blue";
            cell.addEventListener('click', cell.fn=function fn()
            {
                moveShipTo(at,cell.id.substring(4));

                cell.appendChild(document.getElementById(moving));
                 var cells = document.getElementsByClassName("game-cell");
                for (var i = 0; i < cells.length; i++) {
                    if (i != cell.id.substring(4)){
                    var replace = cells.item(i).cloneNode(true);
                    replace.style.backgroundColor = "#9CEAEF";

                    cells.item(i).parentNode.replaceChild(replace,cells.item(i));
                    }
                }
                cell.style.backgroundColor = "#9CEAEF";


            },{once:true});}
            goRights--;

        }
        ups--;
        rights++;
    }

    if (isAtRight(at)) {
        downs = rights;
        rights = 0;
    }
    //sleep(1000);

    while (rights > 0) {
        let adding = at;
        let goRights = rights;
        let goDowns = downs;

        while (goRights > 0) {
            if (isAtRight(adding)) break;
            adding++;
            let cell = document.getElementById("cell" + adding);
            if (!cellArr[cell.id.substring(4)].hasAnything){

            cell.style.backgroundColor = "blue";
            cell.addEventListener('click', cell.fn=function fn()
            {
                moveShipTo(at,cell.id.substring(4));

                cell.appendChild(document.getElementById(moving));
                //document.getElementById("cell" + at).removeChild(document.getElementById("cell" + at).firstChild);
                 var cells = document.getElementsByClassName("game-cell");
                for (var i = 0; i < cells.length; i++) {
                    if (i != cell.id.substring(4)){
                    var replace = cells.item(i).cloneNode(true);
                    replace.style.backgroundColor = "#9CEAEF";

                    cells.item(i).parentNode.replaceChild(replace,cells.item(i));
                    }
                }
                cell.style.backgroundColor = "#9CEAEF";


            },{once:true});}
            goRights--;
        }

        while (goDowns > 0) {
            if (isAtBottom(adding)) break;
            adding += numberOfColumns
            let cell = document.getElementById("cell" + adding);
            if (!cellArr[cell.id.substring(4)].hasAnything){

            cell.style.backgroundColor = "blue";
            cell.addEventListener('click', cell.fn=function fn()
            {
                moveShipTo(at,cell.id.substring(4));

                cell.appendChild(document.getElementById(moving));
                 var cells = document.getElementsByClassName("game-cell");
                for (var i = 0; i < cells.length; i++) {
                    if (i != cell.id.substring(4)){
                    var replace = cells.item(i).cloneNode(true);
                    replace.style.backgroundColor = "#9CEAEF";

                    cells.item(i).parentNode.replaceChild(replace,cells.item(i));
                    }
                }
                cell.style.backgroundColor = "#9CEAEF";


            },{once:true});}
            goDowns--;
        }
        rights--;
        downs++;
    }

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
            if (!cellArr[cell.id.substring(4)].hasAnything){

            cell.style.backgroundColor = "blue";
            cell.addEventListener('click', cell.fn=function fn()
            {
                moveShipTo(at,cell.id.substring(4));

                cell.appendChild(document.getElementById(moving));
                 var cells = document.getElementsByClassName("game-cell");
                for (var i = 0; i < cells.length; i++) {
                    if (i != cell.id.substring(4)){
                    var replace = cells.item(i).cloneNode(true);
                    replace.style.backgroundColor = "#9CEAEF";

                    cells.item(i).parentNode.replaceChild(replace,cells.item(i));
                    }
                }
                cell.style.backgroundColor = "#9CEAEF";


            },{once:true});}
            goDowns--;
        }

        while (goLefts > 0) {
            if (isAtLeft(adding)) break;
            adding--;
            let cell = document.getElementById("cell" + adding);
            if (!cellArr[cell.id.substring(4)].hasAnything){

            cell.style.backgroundColor = "blue";
            cell.addEventListener('click', cell.fn=function fn()
            {
                moveShipTo(at,cell.id.substring(4));

                cell.appendChild(document.getElementById(moving));
                 var cells = document.getElementsByClassName("game-cell");
                for (var i = 0; i < cells.length; i++) {
                    if (i != cell.id.substring(4)){
                    var replace = cells.item(i).cloneNode(true);
                    replace.style.backgroundColor = "#9CEAEF";

                    cells.item(i).parentNode.replaceChild(replace,cells.item(i));
                    }
                }
                cell.style.backgroundColor = "#9CEAEF";


            },{once:true});}
            goLefts--;
        }

        downs--;
        lefts++;
    }

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
            if (!cellArr[cell.id.substring(4)].hasAnything){

            cell.style.backgroundColor = "blue"
            cell.addEventListener('click', cell.fn=function fn()
            {
                moveShipTo(at,cell.id.substring(4));

                cell.appendChild(document.getElementById(moving));
                 var cells = document.getElementsByClassName("game-cell");
                for (var i = 0; i < cells.length; i++) {
                    if (i != cell.id.substring(4)){
                    var replace = cells.item(i).cloneNode(true);
                    replace.style.backgroundColor = "#9CEAEF";

                    cells.item(i).parentNode.replaceChild(replace,cells.item(i));
                    }
                }
                cell.style.backgroundColor = "#9CEAEF";


            },{once:true});}
            goLefts--;
        }

        while (goUps > 0) {
            if (isAtTop(adding)) break;
            adding -= numberOfColumns;
            let cell = document.getElementById("cell" + adding);
            if (!cellArr[cell.id.substring(4)].hasAnything){

            cell.style.backgroundColor = "blue";
            cell.addEventListener('click', cell.fn=function fn()
            {
                moveShipTo(at,cell.id.substring(4));

                cell.appendChild(document.getElementById(moving));
                 var cells = document.getElementsByClassName("game-cell");
                for (var i = 0; i < cells.length; i++) {
                    if (i != cell.id.substring(4)){
                    var replace = cells.item(i).cloneNode(true);
                    replace.style.backgroundColor = "#9CEAEF";

                    cells.item(i).parentNode.replaceChild(replace,cells.item(i));
                    }
                }
                cell.style.backgroundColor = "#9CEAEF";


            },{once:true});}
            goUps--;
        }
        lefts--;
        ups++;
    }
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
    let gameBoard = document.getElementById("game-board");

    for (let row = 1; row <= rows; row++) {
        let gameRow = document.createElement("div");
        gameRow.className = "game-row";
        gameBoard.appendChild(gameRow);

        for (let col = 1; col <= columns; col++) {
            let gameCell = document.createElement("div");
            gameCell.className = "game-cell";
            gameCell.id = "cell" + id;

            gameRow.appendChild(gameCell);

            cellArr.push({
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
    addShipTo(toCell,type,player);
}

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
        var text = document.getElementById("player1Name").value;
            document.getElementById("turns").innerHTML = text + "'s Turn";
            turns.style.color = "black";
            var text2 = document.getElementById("player2Name").value;
        document.getElementById("turns2").innerHTML = text2 + "'s Turn";
        turns.style.color = "black";
        var txt = document.getElementById("player1Name").value;
        document.getElementById("name1").innerHTML = txt + "'s side";
        var txt = document.getElementById("player2Name").value;
        document.getElementById("name2").innerHTML = txt + "'s side";
        document.getElementById("name1").style.fontWeight = "bolder"
        document.getElementById("name2").style.fontWeight = "bolder"
        document.getElementById("player-input-box").remove();

        document.getElementById("board-size-box").style.height = "auto";
        document.getElementById("board-size-box").style.visibility = "visible";
        document.getElementById("board-size-box").style.marginTop = "20vh";
        //margin-top: 20vh;
        document.getElementById("board-size").style.visibility = "visible";

        let txtcolor = document.getElementById("name1");
        let txtcolor2 = document.getElementById("name2");

        if (player1Color.value == "Red") {
            txtcolor.style.color = "#FF7462";
        }
        if (player1Color.value == "Green") {
            txtcolor.style.color = "#23EE96";
        }
        if (player1Color.value == "Blue") {
            txtcolor.style.color = "#78D8FF";
        }
        if (player1Color.value == "Yellow") {
            txtcolor.style.color = "#FFE88F";
        }
        if (player2Color.value == "Red") {
            txtcolor2.style.color = "#FF7462";
        }
        if (player2Color.value == "Green") {
            txtcolor2.style.color = "#23EE96";
        }
        if (player2Color.value == "Blue") {
            txtcolor2.style.color = "#78D8FF";
        }
        if (player2Color.value == "Yellow") {
            txtcolor2.style.color = "#FFE88F";
        }





        submit.addEventListener('click', event => {

            event.preventDefault();

            let select = document.getElementById('board-size');
            let option = select.options[select.selectedIndex];

            if (option.value == "10x10") {
                generateGrid(10, 10);
                document.getElementById("turns").style.visibility = "visible";

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
                            color1[i].style.backgroundColor = "#FF7462";
                            document.getElementById("p1-Melee").src="images/attacker_red.png";
                            document.getElementById("p1-Defender").src="images/defender_red.png";
                            document.getElementById("p1-Ranger").src="images/ranger_red.png";
                            document.getElementById("p1-Healer").src="images/healer_red.png";
                            document.getElementById("p1-Melee-Display").src="images/attacker_red.png";
                            document.getElementById("p1-Defender-Display").src="images/defender_red.png";
                            document.getElementById("p1-Ranger-Display").src="images/ranger_red.png";
                            document.getElementById("p1-Healer-Display").src="images/healer_red.png";
                            document.body.style.backgroundColor = "#FF7462";
                        }
                        if (player1Color.value == "Green") {
                            color1[i].style.backgroundColor = "#23EE96";
                            document.getElementById("p1-Melee").src="images/attacker_green.png";
                            document.getElementById("p1-Defender").src="images/defender_green.png";
                            document.getElementById("p1-Ranger").src="images/ranger_green.png";
                            document.getElementById("p1-Healer").src="images/healer_green.png";
                            document.getElementById("p1-Melee-Display").src="images/attacker_green.png";
                            document.getElementById("p1-Defender-Display").src="images/defender_green.png";
                            document.getElementById("p1-Ranger-Display").src="images/ranger_green.png";
                            document.getElementById("p1-Healer-Display").src="images/healer_green.png";
                            document.body.style.backgroundColor = "#23EE96";
                        }
                        if (player1Color.value == "Blue") {
                            color1[i].style.backgroundColor = "#78D8FF";
                            document.getElementById("p1-Melee").src="images/attacker_blue.png";
                            document.getElementById("p1-Defender").src="images/defender_blue.png";
                            document.getElementById("p1-Ranger").src="images/ranger_blue.png";
                            document.getElementById("p1-Healer").src="images/healer_blue.png";
                            document.getElementById("p1-Melee-Display").src="images/attacker_blue.png";
                            document.getElementById("p1-Defender-Display").src="images/defender_blue.png";
                            document.getElementById("p1-Ranger-Display").src="images/ranger_blue.png";
                            document.getElementById("p1-Healer-Display").src="images/healer_blue.png";
                            document.body.style.backgroundColor = "#78D8FF";
                        }
                        if (player1Color.value == "Yellow") {
                            color1[i].style.backgroundColor = "#FFE88F";
                            document.getElementById("p1-Melee").src="images/attacker_yellow.png";
                            document.getElementById("p1-Defender").src="images/defender_yellow.png";
                            document.getElementById("p1-Ranger").src="images/ranger_yellow.png";
                            document.getElementById("p1-Healer").src="images/healer_yellow.png";
                            document.getElementById("p1-Melee-Display").src="images/attacker_yellow.png";
                            document.getElementById("p1-Defender-Display").src="images/defender_yellow.png";
                            document.getElementById("p1-Ranger-Display").src="images/ranger_yellow.png";
                            document.getElementById("p1-Healer-Display").src="images/healer_yellow.png";
                            document.body.style.backgroundColor = "#FFE88F";
                        }
                    }
                }

                let color2 = document.querySelectorAll("#cell8, #cell9, #cell18, #cell19, #cell28, #cell29, #cell38, #cell39, #cell48, #cell49, #cell58, #cell59, #cell68, #cell69, #cell78, #cell79, #cell88, #cell89, #cell98, #cell99");
                for (let i = 0; i < color2.length; i++) {
                    if (color2) {
                        if (player2Color.value == "Red") {
                            color2[i].style.backgroundColor = "#FF7462";
                            document.getElementById("p2-Melee").src="images/attacker_red.png";
                            document.getElementById("p2-Defender").src="images/defender_red.png";
                            document.getElementById("p2-Ranger").src="images/ranger_red.png";
                            document.getElementById("p2-Healer").src="images/healer_red.png";
                            document.getElementById("p2-Melee-Display").src="images/attacker_red.png";
                            document.getElementById("p2-Defender-Display").src="images/defender_red.png";
                            document.getElementById("p2-Ranger-Display").src="images/ranger_red.png";
                            document.getElementById("p2-Healer-Display").src="images/healer_red.png";
                        }
                        if (player2Color.value == "Green") {
                            color2[i].style.backgroundColor = "#23EE96";
                            document.getElementById("p2-Melee").src="images/attacker_green.png";
                            document.getElementById("p2-Defender").src="images/defender_green.png";
                            document.getElementById("p2-Ranger").src="images/ranger_green.png";
                            document.getElementById("p2-Healer").src="images/healer_green.png";
                            document.getElementById("p2-Melee-Display").src="images/attacker_green.png";
                            document.getElementById("p2-Defender-Display").src="images/defender_green.png";
                            document.getElementById("p2-Ranger-Display").src="images/ranger_green.png";
                            document.getElementById("p2-Healer-Display").src="images/healer_green.png";
                        }
                        if (player2Color.value == "Blue") {
                            color2[i].style.backgroundColor = "#78D8FF";
                            document.getElementById("p2-Melee").src="images/attacker_blue.png";
                            document.getElementById("p2-Defender").src="images/defender_blue.png";
                            document.getElementById("p2-Ranger").src="images/ranger_blue.png";
                            document.getElementById("p2-Healer").src="images/healer_blue.png";
                            document.getElementById("p2-Melee-Display").src="images/attacker_blue.png";
                            document.getElementById("p2-Defender-Display").src="images/defender_blue.png";
                            document.getElementById("p2-Ranger-Display").src="images/ranger_blue.png";
                            document.getElementById("p2-Healer-Display").src="images/healer_blue.png";
                        }
                        if (player2Color.value == "Yellow") {
                            color2[i].style.backgroundColor = "#FFE88F";
                            document.getElementById("p2-Melee").src="images/attacker_yellow.png";
                            document.getElementById("p2-Defender").src="images/defender_yellow.png";
                            document.getElementById("p2-Ranger").src="images/ranger_yellow.png";
                            document.getElementById("p2-Healer").src="images/healer_yellow.png";
                            document.getElementById("p2-Melee-Display").src="images/attacker_yellow.png";
                            document.getElementById("p2-Defender-Display").src="images/defender_yellow.png";
                            document.getElementById("p2-Ranger-Display").src="images/ranger_yellow.png";
                            document.getElementById("p2-Healer-Display").src="images/healer_yellow.png";
                        }
                    }
                }

            } else if (option.value == "15x15") {
                generateGrid(15, 15)
                document.getElementById("turns").style.visibility = "visible";
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
                            color3[i].style.backgroundColor = "#FF7462";
                            document.getElementById("p1-Melee").src="images/attacker_red.png";
                            document.getElementById("p1-Defender").src="images/defender_red.png";
                            document.getElementById("p1-Ranger").src="images/ranger_red.png";
                            document.getElementById("p1-Healer").src="images/healer_red.png";
                            document.body.style.backgroundColor = "#FF7462";
                        }
                        if (player1Color.value == "Green") {
                            color3[i].style.backgroundColor = "#23EE96";
                            document.getElementById("p1-Melee").src="images/attacker_green.png";
                            document.getElementById("p1-Defender").src="images/defender_green.png";
                            document.getElementById("p1-Ranger").src="images/ranger_green.png";
                            document.getElementById("p1-Healer").src="images/healer_green.png";
                            document.body.style.backgroundColor = "#23EE96";
                        }
                        if (player1Color.value == "Blue") {
                            color3[i].style.backgroundColor = "#78D8FF";
                            document.getElementById("p1-Melee").src="images/attacker_blue.png";
                            document.getElementById("p1-Defender").src="images/defender_blue.png";
                            document.getElementById("p1-Ranger").src="images/ranger_blue.png";
                            document.getElementById("p1-Healer").src="images/healer_blue.png";
                            document.body.style.backgroundColor = "#78D8FF";
                        }
                        if (player1Color.value == "Yellow") {
                            color3[i].style.backgroundColor = "#FFE88F";
                            document.getElementById("p1-Melee").src="images/attacker_yellow.png";
                            document.getElementById("p1-Defender").src="images/defender_yellow.png";
                            document.getElementById("p1-Ranger").src="images/ranger_yellow.png";
                            document.getElementById("p1-Healer").src="images/healer_yellow.png";
                            document.body.style.backgroundColor = "#FFE88F";
                        }
                    }

                    let color4 = document.querySelectorAll("#cell13, #cell14, #cell28, #cell29, #cell43, #cell44, #cell58, #cell59, #cell73, #cell74, #cell88, #cell89, #cell103, #cell104, #cell118, #cell119, #cell133, #cell134, #cell148, #cell149, #cell163, #cell164, #cell178, #cell179, #cell193, #cell194, #cell208, #cell209, #cell223, #cell224")
                    for (let i = 0; i < color4.length; i++) {
                        if (color4) {
                            if (player2Color.value == "Red") {
                                color4[i].style.backgroundColor = "#FF7462"
                                document.getElementById("p2-Melee").src="images/attacker_red.png";
                                document.getElementById("p2-Defender").src="images/defender_red.png";
                                document.getElementById("p2-Ranger").src="images/ranger_red.png";
                                document.getElementById("p2-Healer").src="images/healer_red.png";
                            }
                            if (player2Color.value == "Green") {
                                color4[i].style.backgroundColor = "#23EE96";
                                document.getElementById("p2-Melee").src="images/attacker_green.png";
                                document.getElementById("p2-Defender").src="images/defender_green.png";
                                document.getElementById("p2-Ranger").src="images/ranger_green.png";
                                document.getElementById("p2-Healer").src="images/healer_green.png";
                            }
                            if (player2Color.value == "Blue") {
                                color4[i].style.backgroundColor = "#78D8FF"
                                document.getElementById("p2-Melee").src="images/attacker_blue.png";
                                document.getElementById("p2-Defender").src="images/defender_blue.png";
                                document.getElementById("p2-Ranger").src="images/ranger_blue.png";
                                document.getElementById("p2-Healer").src="images/healer_blue.png";
                            }
                            if (player2Color.value == "Yellow") {
                                color4[i].style.backgroundColor = "#FFE88F";
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
                document.getElementById("turns").style.visibility = "visible";
                document.querySelector("#cell0").classList.add("drop");
                let cell = document.getElementById("cell0");
                cell.setAttribute('ondrop', "drop(event)")
                cell.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell1").classList.add("drop");
                let cell1 = document.getElementById("cell1");
                cell1.setAttribute('ondrop', "drop(event)")
                cell1.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell20").classList.add("drop");
                let cell20 = document.getElementById("cell20");
                cell20.setAttribute('ondrop', "drop(event)")
                cell20.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell21").classList.add("drop");
                let cell21 = document.getElementById("cell21");
                cell21.setAttribute('ondrop', "drop(event)")
                cell21.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell40").classList.add("drop");
                let cell40 = document.getElementById("cell40");
                cell40.setAttribute('ondrop', "drop(event)")
                cell40.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell41").classList.add("drop");
                let cell41 = document.getElementById("cell41");
                cell41.setAttribute('ondrop', "drop(event)")
                cell41.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell60").classList.add("drop");
                let cell60 = document.getElementById("cell60");
                cell60.setAttribute('ondrop', "drop(event)")
                cell60.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell61").classList.add("drop");
                let cell61 = document.getElementById("cell61");
                cell61.setAttribute('ondrop', "drop(event)")
                cell61.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell80").classList.add("drop");
                let cell80 = document.getElementById("cell80");
                cell80.setAttribute('ondrop', "drop(event)")
                cell80.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell81").classList.add("drop");
                let cell81 = document.getElementById("cell81");
                cell81.setAttribute('ondrop', "drop(event)")
                cell81.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell100").classList.add("drop");
                let cell100 = document.getElementById("cell100");
                cell100.setAttribute('ondrop', "drop(event)")
                cell100.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell101").classList.add("drop");
                let cell101 = document.getElementById("cell101");
                cell101.setAttribute('ondrop', "drop(event)")
                cell101.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell120").classList.add("drop");
                let cell120 = document.getElementById("cell120");
                cell120.setAttribute('ondrop', "drop(event)")
                cell120.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell121").classList.add("drop");
                let cell121 = document.getElementById("cell121");
                cell121.setAttribute('ondrop', "drop(event)")
                cell121.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell140").classList.add("drop");
                let cell140 = document.getElementById("cell140");
                cell140.setAttribute('ondrop', "drop(event)")
                cell140.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell141").classList.add("drop");
                let cell141 = document.getElementById("cell141");
                cell141.setAttribute('ondrop', "drop(event)")
                cell141.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell160").classList.add("drop");
                let cell160 = document.getElementById("cell160");
                cell160.setAttribute('ondrop', "drop(event)")
                cell160.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell161").classList.add("drop");
                let cell161 = document.getElementById("cell161");
                cell161.setAttribute('ondrop', "drop(event)")
                cell161.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell180").classList.add("drop");
                let cell180 = document.getElementById("cell180");
                cell180.setAttribute('ondrop', "drop(event)")
                cell180.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell181").classList.add("drop");
                let cell181 = document.getElementById("cell181");
                cell181.setAttribute('ondrop', "drop(event)")
                cell181.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell200").classList.add("drop");
                let cell200 = document.getElementById("cell200");
                cell200.setAttribute('ondrop', "drop(event)")
                cell200.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell201").classList.add("drop");
                let cell201 = document.getElementById("cell201");
                cell201.setAttribute('ondrop', "drop(event)")
                cell201.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell220").classList.add("drop");
                let cell220 = document.getElementById("cell220");
                cell220.setAttribute('ondrop', "drop(event)")
                cell220.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell221").classList.add("drop");
                let cell221 = document.getElementById("cell221");
                cell221.setAttribute('ondrop', "drop(event)")
                cell221.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell240").classList.add("drop");
                let cell240 = document.getElementById("cell240");
                cell240.setAttribute('ondrop', "drop(event)")
                cell240.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell241").classList.add("drop");
                let cell241 = document.getElementById("cell241");
                cell241.setAttribute('ondrop', "drop(event)")
                cell241.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell260").classList.add("drop");
                let cell260 = document.getElementById("cell260");
                cell260.setAttribute('ondrop', "drop(event)")
                cell260.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell261").classList.add("drop");
                let cell261 = document.getElementById("cell261");
                cell261.setAttribute('ondrop', "drop(event)")
                cell261.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell280").classList.add("drop");
                let cell280 = document.getElementById("cell280");
                cell280.setAttribute('ondrop', "drop(event)")
                cell280.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell281").classList.add("drop");
                let cell281 = document.getElementById("cell281");
                cell281.setAttribute('ondrop', "drop(event)")
                cell281.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell300").classList.add("drop");
                let cell300 = document.getElementById("cell300");
                cell300.setAttribute('ondrop', "drop(event)")
                cell300.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell301").classList.add("drop");
                let cell301 = document.getElementById("cell301");
                cell301.setAttribute('ondrop', "drop(event)")
                cell301.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell320").classList.add("drop");
                let cell320 = document.getElementById("cell320");
                cell320.setAttribute('ondrop', "drop(event)")
                cell320.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell321").classList.add("drop");
                let cell321 = document.getElementById("cell321");
                cell321.setAttribute('ondrop', "drop(event)")
                cell321.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell340").classList.add("drop");
                let cell340 = document.getElementById("cell340");
                cell340.setAttribute('ondrop', "drop(event)")
                cell340.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell341").classList.add("drop");
                let cell341 = document.getElementById("cell341");
                cell341.setAttribute('ondrop', "drop(event)")
                cell341.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell360").classList.add("drop");
                let cell360 = document.getElementById("cell360");
                cell360.setAttribute('ondrop', "drop(event)")
                cell360.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell361").classList.add("drop");
                let cell361 = document.getElementById("cell361");
                cell361.setAttribute('ondrop', "drop(event)")
                cell361.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell380").classList.add("drop");
                let cell380 = document.getElementById("cell380");
                cell380.setAttribute('ondrop', "drop(event)")
                cell380.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell381").classList.add("drop");
                let cell381 = document.getElementById("cell381");
                cell381.setAttribute('ondrop', "drop(event)")
                cell381.setAttribute('ondragover', "allowDrop(event)")


                document.querySelector("#cell18").classList.add("drops");
                let cell18 = document.getElementById("cell18");
                cell18.setAttribute('ondrop', "drop(event)")
                cell18.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell19").classList.add("drops");
                let cell19 = document.getElementById("cell19");
                cell19.setAttribute('ondrop', "drop(event)")
                cell19.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell38").classList.add("drops");
                let cell38 = document.getElementById("cell38");
                cell38.setAttribute('ondrop', "drop(event)")
                cell38.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell39").classList.add("drops");
                let cell39 = document.getElementById("cell39");
                cell39.setAttribute('ondrop', "drop(event)")
                cell39.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell58").classList.add("drops");
                let cell58 = document.getElementById("cell58");
                cell58.setAttribute('ondrop', "drop(event)")
                cell58.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell59").classList.add("drops");
                let cell59 = document.getElementById("cell59");
                cell59.setAttribute('ondrop', "drop(event)")
                cell59.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell78").classList.add("drops");
                let cell78 = document.getElementById("cell78");
                cell78.setAttribute('ondrop', "drop(event)")
                cell78.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell79").classList.add("drops");
                let cell79 = document.getElementById("cell79");
                cell79.setAttribute('ondrop', "drop(event)")
                cell79.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell98").classList.add("drops");
                let cell98 = document.getElementById("cell98");
                cell98.setAttribute('ondrop', "drop(event)")
                cell98.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell99").classList.add("drops");
                let cell99 = document.getElementById("cell99");
                cell99.setAttribute('ondrop', "drop(event)")
                cell99.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell118").classList.add("drops");
                let cell118 = document.getElementById("cell118");
                cell118.setAttribute('ondrop', "drop(event)")
                cell118.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell119").classList.add("drops");
                let cell119 = document.getElementById("cell119");
                cell119.setAttribute('ondrop', "drop(event)")
                cell119.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell138").classList.add("drops");
                let cell138 = document.getElementById("cell138");
                cell138.setAttribute('ondrop', "drop(event)")
                cell138.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell139").classList.add("drops");
                let cell139 = document.getElementById("cell139");
                cell139.setAttribute('ondrop', "drop(event)")
                cell139.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell158").classList.add("drops");
                let cell158 = document.getElementById("cell158");
                cell158.setAttribute('ondrop', "drop(event)")
                cell158.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell159").classList.add("drops");
                let cell159 = document.getElementById("cell159");
                cell159.setAttribute('ondrop', "drop(event)")
                cell159.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell178").classList.add("drops");
                let cell178 = document.getElementById("cell178");
                cell178.setAttribute('ondrop', "drop(event)")
                cell178.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell179").classList.add("drops");
                let cell179 = document.getElementById("cell179");
                cell179.setAttribute('ondrop', "drop(event)")
                cell179.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell198").classList.add("drops");
                let cell198 = document.getElementById("cell198");
                cell198.setAttribute('ondrop', "drop(event)")
                cell198.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell199").classList.add("drops");
                let cell199 = document.getElementById("cell199");
                cell199.setAttribute('ondrop', "drop(event)")
                cell199.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell218").classList.add("drops");
                let cell218 = document.getElementById("cell218");
                cell218.setAttribute('ondrop', "drop(event)")
                cell218.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell219").classList.add("drops");
                let cell219 = document.getElementById("cell219");
                cell219.setAttribute('ondrop', "drop(event)")
                cell219.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell238").classList.add("drops");
                let cell238 = document.getElementById("cell238");
                cell238.setAttribute('ondrop', "drop(event)")
                cell238.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell239").classList.add("drops");
                let cell239 = document.getElementById("cell239");
                cell239.setAttribute('ondrop', "drop(event)")
                cell239.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell258").classList.add("drops");
                let cell258 = document.getElementById("cell258");
                cell258.setAttribute('ondrop', "drop(event)")
                cell258.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell259").classList.add("drops");
                let cell259 = document.getElementById("cell259");
                cell259.setAttribute('ondrop', "drop(event)")
                cell259.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell278").classList.add("drops");
                let cell278 = document.getElementById("cell278");
                cell278.setAttribute('ondrop', "drop(event)")
                cell278.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell279").classList.add("drops");
                let cell279 = document.getElementById("cell279");
                cell279.setAttribute('ondrop', "drop(event)")
                cell279.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell298").classList.add("drops");
                let cell298 = document.getElementById("cell298");
                cell298.setAttribute('ondrop', "drop(event)")
                cell298.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell299").classList.add("drops");
                let cell299 = document.getElementById("cell299");
                cell299.setAttribute('ondrop', "drop(event)")
                cell299.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell318").classList.add("drops");
                let cell318 = document.getElementById("cell318");
                cell318.setAttribute('ondrop', "drop(event)")
                cell318.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell319").classList.add("drops");
                let cell319 = document.getElementById("cell319");
                cell319.setAttribute('ondrop', "drop(event)")
                cell319.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell338").classList.add("drops");
                let cell338 = document.getElementById("cell338");
                cell338.setAttribute('ondrop', "drop(event)")
                cell338.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell339").classList.add("drops");
                let cell339 = document.getElementById("cell339");
                cell339.setAttribute('ondrop', "drop(event)")
                cell339.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell358").classList.add("drops");
                let cell358 = document.getElementById("cell358");
                cell358.setAttribute('ondrop', "drop(event)")
                cell358.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell359").classList.add("drops");
                let cell359 = document.getElementById("cell359");
                cell359.setAttribute('ondrop', "drop(event)")
                cell359.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell378").classList.add("drops");
                let cell378 = document.getElementById("cell378");
                cell378.setAttribute('ondrop', "drop(event)")
                cell378.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell379").classList.add("drops");
                let cell379 = document.getElementById("cell379");
                cell379.setAttribute('ondrop', "drop(event)")
                cell379.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell398").classList.add("drops");
                let cell398 = document.getElementById("cell398");
                cell398.setAttribute('ondrop', "drop(event)")
                cell398.setAttribute('ondragover', "allowDrop(event)")

                document.querySelector("#cell399").classList.add("drops");
                let cell399 = document.getElementById("cell399");
                cell399.setAttribute('ondrop', "drop(event)")
                cell399.setAttribute('ondragover', "allowDrop(event)")


                let color5 = document.querySelectorAll("#cell0, #cell1, #cell20, #cell21, #cell40, #cell41, #cell60, #cell61, #cell80, #cell81, #cell100, #cell101, #cell120, #cell121, #cell140, #cell141, #cell160, #cell161, #cell180, #cell181, #cell200, #cell201, #cell220, #cell221, #cell240, #cell241, #cell260, #cell261, #cell280, #cell281, #cell300, #cell301, #cell320, #cell321, #cell340, #cell341, #cell360, #cell361, #cell380, #cell381")
                for (let i = 0; i < color5.length; i++) {
                    if (color5) {
                        if (player1Color.value == "Red") {
                            color5[i].style.backgroundColor = "#FF7462"
                            document.getElementById("p1-Melee").src="images/attacker_red.png";
                            document.getElementById("p1-Defender").src="images/defender_red.png";
                            document.getElementById("p1-Ranger").src="images/ranger_red.png";
                            document.getElementById("p1-Healer").src="images/healer_red.png";
                            document.body.style.backgroundColor = "#FF7462";
                        }
                        if (player1Color.value == "Green") {
                            color5[i].style.backgroundColor = "#23EE96";
                            document.getElementById("p1-Melee").src="images/attacker_green.png";
                            document.getElementById("p1-Defender").src="images/defender_green.png";
                            document.getElementById("p1-Ranger").src="images/ranger_green.png";
                            document.getElementById("p1-Healer").src="images/healer_green.png";
                            document.body.style.backgroundColor = "#23EE96";
                        }
                        if (player1Color.value == "Blue") {
                            color5[i].style.backgroundColor = "#78D8FF";
                            document.getElementById("p1-Melee").src="images/attacker_blue.png";
                            document.getElementById("p1-Defender").src="images/defender_blue.png";
                            document.getElementById("p1-Ranger").src="images/ranger_blue.png";
                            document.getElementById("p1-Healer").src="images/healer_blue.png";
                            document.body.style.backgroundColor = "#78D8FF";
                        }
                        if (player1Color.value == "Yellow") {
                            color5[i].style.backgroundColor = "#FFE88F";
                            document.getElementById("p1-Melee").src="images/attacker_yellow.png";
                            document.getElementById("p1-Defender").src="images/defender_yellow.png";
                            document.getElementById("p1-Ranger").src="images/ranger_yellow.png";
                            document.getElementById("p1-Healer").src="images/healer_yellow.png";
                            document.body.style.backgroundColor = "#FFE88F";
                        }
                    }
                }

                let color6 = document.querySelectorAll("#cell18, #cell19, #cell38, #cell39, #cell58, #cell59, #cell78, #cell79, #cell98, #cell99, #cell118, #cell119, #cell138, #cell139, #cell158, #cell159, #cell178, #cell179, #cell198, #cell199, #cell218, #cell219, #cell238, #cell239, #cell258, #cell259, #cell278, #cell279, #cell298, #cell299, #cell318, #cell319, #cell338, #cell339, #cell358, #cell359, #cell378, #cell379, #cell398, #cell399")
                for (let i = 0; i < color6.length; i++) {
                    if (color6) {
                        if (player2Color.value == "Red") {
                            color6[i].style.backgroundColor = "#FF7462";
                            document.getElementById("p2-Melee").src="images/attacker_red.png";
                            document.getElementById("p2-Defender").src="images/defender_red.png";
                            document.getElementById("p2-Ranger").src="images/ranger_red.png";
                            document.getElementById("p2-Healer").src="images/healer_red.png";

                        }
                        if (player2Color.value == "Green") {
                            color6[i].style.backgroundColor = "#23EE96";
                            document.getElementById("p2-Melee").src="images/attacker_green.png";
                            document.getElementById("p2-Defender").src="images/defender_green.png";
                            document.getElementById("p2-Ranger").src="images/ranger_green.png";
                            document.getElementById("p2-Healer").src="images/healer_green.png";


                        }
                        if (player2Color.value == "Blue") {
                            color6[i].style.backgroundColor = "#78D8FF";
                            document.getElementById("p2-Melee").src="images/attacker_blue.png";
                            document.getElementById("p2-Defender").src="images/defender_blue.png";
                            document.getElementById("p2-Ranger").src="images/ranger_blue.png";
                            document.getElementById("p2-Healer").src="images/healer_blue.png";
                        }
                        if (player2Color.value == "Yellow") {
                            color6[i].style.backgroundColor = "#FFE88F";
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

            document.body.style.background = 'none';

            if (player1Color.value == "Red") {
                document.getElementById("ready1").style.backgroundColor = "#FF7462";
            }
            if (player1Color.value == "Green") {
                document.getElementById("ready1").style.backgroundColor = "#23EE96";
            }
            if (player1Color.value == "Blue") {
                document.getElementById("ready1").style.backgroundColor = "#78D8FF";
            }
            if (player1Color.value == "Yellow") {
                document.getElementById("ready1").style.backgroundColor = "#FFE88F";
            }

            if (player2Color.value == "Red") {
                document.getElementById("ready2").style.backgroundColor = "#FF7462";
            }
            if (player2Color.value == "Green") {
                document.getElementById("ready2").style.backgroundColor = "#23EE96";
            }
            if (player2Color.value == "Blue") {
                document.getElementById("ready2").style.backgroundColor = "#78D8FF";
            }
            if (player2Color.value == "Yellow") {
                document.getElementById("ready2").style.backgroundColor = "#FFE88F";
            }

            //optimize this so no matter what order you click it will do the set timeout
            });
        })
    })


ready1.addEventListener('click', event => {


    document.getElementById("p1-Melee").setAttribute("onclick", "listingM1()")
    document.getElementById("p1-Defender").setAttribute("onclick", "listingD1()")
    document.getElementById("p1-Ranger").setAttribute("onclick", "listingR1()")
    document.getElementById("p1-Healer").setAttribute("onclick", "listingH1()")
    let color1 = document.querySelectorAll(".game-cell.drop");
                for (let i = 0; i < color1.length; i++) {
                    if (color1) {
                color1[i].style.backgroundColor = "#9CEAEF"
                color1[i].style.borderColor = "#057672"
                    }
                }
                let color2 = document.querySelectorAll(".game-cell.drops");
                for (let i = 0; i < color1.length; i++) {
                    if (color1) {
                color2[i].style.backgroundColor = "#9CEAEF"
                color2[i].style.borderColor = "#057672"
                    }
                }
    event.preventDefault();
    

    let melee1 = document.getElementById("p1-Melee");
                melee1.setAttribute('draggable', "false")

                let defender1 = document.getElementById("p1-Defender");
                defender1.setAttribute('draggable', "false")

                let ranger1 = document.getElementById("p1-Ranger");
                ranger1.setAttribute('draggable', "false")

                let healer1 = document.getElementById("p1-Healer");
                healer1.setAttribute('draggable', "false")
                let melee2 = document.getElementById("p2-Melee");
                melee2.setAttribute('draggable', "false")

                let defender2 = document.getElementById("p2-Defender");
                defender2.setAttribute('draggable', "false")

                let ranger2 = document.getElementById("p2-Ranger");
                ranger2.setAttribute('draggable', "false")

                let healer2 = document.getElementById("p2-Healer");
                healer2.setAttribute('draggable', "false")

                document.getElementById("p1").remove();
                document.getElementById("ready1").remove();
                document.getElementById("p2").remove();
                document.getElementById("displayDiv").remove();

                Melee1.style.display = "";
                Ranger1.style.display = "";
                Defender1.style.display = "";
                Healer1.style.display = "";
                if(player1Color.value == "Blue") {
                    document.body.style.backgroundColor = "#78D8FF"
                } else if(player1Color.value == "Green"){
                    document.body.style.backgroundColor = "#23EE96"
                } else if(player1Color.value == "Red"){
                    document.body.style.backgroundColor = "#FF7462"
                } else if(player1Color.value == "Yellow"){
                    document.body.style.backgroundColor = "#FFE88F"
                }
})

function listingM1() {
    document.getElementById("ActionsM1").classList.add("show");
    document.getElementById("ActionsM2").classList.remove("show");
    document.getElementById("ActionsR2").classList.remove("show");
  document.getElementById("ActionsD2").classList.remove("show");
  document.getElementById("ActionsH2").classList.remove("show");
    document.getElementById("ActionsR1").classList.remove("show");
  document.getElementById("ActionsD1").classList.remove("show");
  document.getElementById("ActionsH1").classList.remove("show");


}
function listingR1() {
    document.getElementById("ActionsR1").classList.add("show");
    document.getElementById("ActionsM2").classList.remove("show");
    document.getElementById("ActionsR2").classList.remove("show");
  document.getElementById("ActionsD2").classList.remove("show");
  document.getElementById("ActionsH2").classList.remove("show");
  document.getElementById("ActionsM1").classList.remove("show");
  document.getElementById("ActionsD1").classList.remove("show");
  document.getElementById("ActionsH1").classList.remove("show");

}
function listingD1() {
    document.getElementById("ActionsD1").classList.add("show");
    document.getElementById("ActionsM2").classList.remove("show");
    document.getElementById("ActionsR2").classList.remove("show");
  document.getElementById("ActionsD2").classList.remove("show");
  document.getElementById("ActionsH2").classList.remove("show");
  document.getElementById("ActionsM1").classList.remove("show");
    document.getElementById("ActionsR1").classList.remove("show");
  document.getElementById("ActionsH1").classList.remove("show");

}
function listingH1() {
  document.getElementById("ActionsH1").classList.add("show");
  document.getElementById("ActionsM2").classList.remove("show");
  document.getElementById("ActionsR2").classList.remove("show");
document.getElementById("ActionsD2").classList.remove("show");
document.getElementById("ActionsH2").classList.remove("show");
document.getElementById("ActionsM1").classList.remove("show");
    document.getElementById("ActionsR1").classList.remove("show");
  document.getElementById("ActionsD1").classList.remove("show");
}

function listingM2() {
    document.getElementById("ActionsM2").classList.add("show");
    document.getElementById("ActionsR2").classList.remove("show");
  document.getElementById("ActionsD2").classList.remove("show");
  document.getElementById("ActionsH2").classList.remove("show");
    document.getElementById("ActionsM1").classList.remove("show");
    document.getElementById("ActionsR1").classList.remove("show");
  document.getElementById("ActionsD1").classList.remove("show");
  document.getElementById("ActionsH1").classList.remove("show");

}
function listingR2() {
    document.getElementById("ActionsR2").classList.add("show");
    document.getElementById("ActionsM2").classList.remove("show");
  document.getElementById("ActionsD2").classList.remove("show");
  document.getElementById("ActionsH2").classList.remove("show");
    document.getElementById("ActionsM1").classList.remove("show");
    document.getElementById("ActionsR1").classList.remove("show");
  document.getElementById("ActionsD1").classList.remove("show");
  document.getElementById("ActionsH1").classList.remove("show");

}
function listingD2() {
    document.getElementById("ActionsD2").classList.add("show");
    document.getElementById("ActionsM2").classList.remove("show");
    document.getElementById("ActionsR2").classList.remove("show");
  document.getElementById("ActionsH2").classList.remove("show");
    document.getElementById("ActionsM1").classList.remove("show");
    document.getElementById("ActionsR1").classList.remove("show");
  document.getElementById("ActionsD1").classList.remove("show");
  document.getElementById("ActionsH1").classList.remove("show");

}
function listingH2() {
  document.getElementById("ActionsH2").classList.add("show");
  document.getElementById("ActionsM2").classList.remove("show");
  document.getElementById("ActionsR2").classList.remove("show");
document.getElementById("ActionsD2").classList.remove("show");
  document.getElementById("ActionsM1").classList.remove("show");
  document.getElementById("ActionsR1").classList.remove("show");
  document.getElementById("ActionsD1").classList.remove("show");
  document.getElementById("ActionsH1").classList.remove("show");
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
    document.getElementById("attackM1").disabled = true;
    let at = -1;
    let pos = 0;
    while (at == -1)
    {
        if (cellArr[pos].hasAnything && cellArr[pos].shipType == "Melee" && cellArr[pos].shipColor == "p1")
        {
            at = pos;

        }
        pos++;
    }
    attackInARange(at,2,"p1",25);
    document.getElementById("attackM1").disabled = true;
    document.querySelector('#attackM1').innerHTML = 'A̶t̶t̶a̶c̶k̶';
    document.getElementById("p1-Defender").removeAttribute("onclick")
        document.getElementById("p1-Healer").removeAttribute("onclick")
        document.getElementById("p1-Ranger").removeAttribute("onclick")

}

function MovementM1(){
    let at = -1;
    let pos = 0;
    while (at == -1)
    {
        if (cellArr[pos].hasAnything && cellArr[pos].shipType == "Melee" && cellArr[pos].shipColor == "p1")
        {
            at = pos;
        }
        pos++;
    }
    move(at,3,"p1-Melee");
    document.getElementById("movementM1").disabled = true;
    document.querySelector('#movementM1').innerHTML = 'M̶o̶v̶e̶m̶e̶n̶t̶';
    document.getElementById("p1-Defender").removeAttribute("onclick")
        document.getElementById("p1-Healer").removeAttribute("onclick")
        document.getElementById("p1-Ranger").removeAttribute("onclick")
}

function EndTurnM1(){
        document.getElementById("attackM1").disabled = false;
        document.querySelector('#attackM1').innerHTML = 'Attack';
        document.getElementById("movementM1").disabled = false;
        document.querySelector('#movementM1').innerHTML = 'Movement';

        let color1 = document.querySelectorAll(".game-cell");
        for (let i = 0; i < color1.length; i++) {
            if (color1) {
        color1[i].style.backgroundColor = "#9CEAEF"
        color1[i].style.borderColor = "#057672"
            }
        }
        Melee2.style.display = "";
        Ranger2.style.display = "";
        Defender2.style.display = "";
        Healer2.style.display = "";
        Melee1.style.display = "none";
        Ranger1.style.display = "none";
        Defender1.style.display = "none";
        Healer1.style.display = "none";

        if(player2Color.value == "Blue") {
            document.body.style.backgroundColor = "#78D8FF"
        } else if(player2Color.value == "Green"){
            document.body.style.backgroundColor = "#23EE96"
        } else if(player2Color.value == "Red"){
            document.body.style.backgroundColor = "#FF7462"
        } else if(player2Color.value == "Yellow"){
            document.body.style.backgroundColor = "#FFE88F"
        }
        document.getElementById("turns").style.visibility = "hidden"
        document.getElementById("turns2").style.visibility = "visible"

            document.getElementById("p1-Melee").setAttribute("onclick", "listingM1()")
            document.getElementById("p1-Defender").setAttribute("onclick", "listingD1()")
            document.getElementById("p1-Ranger").setAttribute("onclick", "listingR1()")
            document.getElementById("p1-Healer").setAttribute("onclick", "listingH1()")
    }

function AttackR1() {
    document.getElementById("attackR1").disabled = true;
    let at = -1;
    let pos = 0;
    while (at == -1)
    {
        if (cellArr[pos].hasAnything && cellArr[pos].shipType == "Ranger" && cellArr[pos].shipColor == "p1")
        {
            at = pos;

        }
        pos++;
    }
    decideRow(at,20);

  document.getElementById("attackR1").disabled = true;
  document.querySelector('#attackR1').innerHTML = 'A̶t̶t̶a̶c̶k̶';
    document.getElementById("p1-Melee").removeAttribute("onclick")
    document.getElementById("p1-Defender").removeAttribute("onclick")
        document.getElementById("p1-Healer").removeAttribute("onclick")
}

function MovementR1(){
    let at = -1;
    let pos = 0;
    while (at == -1)
    {
        if (cellArr[pos].hasAnything && cellArr[pos].shipType == "Ranger" && cellArr[pos].shipColor == "p1")
        {
            at = pos;

        }
        pos++;
    }
    move(at,2,"p1-Ranger");
    document.getElementById("movementR1").disabled = true;
    document.querySelector('#movementR1').innerHTML = 'M̶o̶v̶e̶m̶e̶n̶t̶';
    document.getElementById("p1-Melee").removeAttribute("onclick")
    document.getElementById("p1-Defender").removeAttribute("onclick")
        document.getElementById("p1-Healer").removeAttribute("onclick")

}

function EndTurnR1(){
    
    document.getElementById("attackR1").disabled = false;
    document.querySelector('#attackR1').innerHTML = 'Attack';
    document.getElementById("movementR1").disabled = false;
    document.querySelector('#movementR1').innerHTML = 'Movement';

    let color1 = document.querySelectorAll(".game-cell");
                for (let i = 0; i < color1.length; i++) {
                    if (color1) {
                color1[i].style.backgroundColor = "#9CEAEF"
                color1[i].style.borderColor = "#057672"
                    }
                }
                Melee2.style.display = "none";
                Melee2.style.display = "";
                Ranger2.style.display = "";
                Defender2.style.display = "";
                Healer2.style.display = "";
                Melee1.style.display = "none";
                Ranger1.style.display = "none";
                Defender1.style.display = "none";
                Healer1.style.display = "none";

        if(player2Color.value == "Blue") {
            document.body.style.backgroundColor = "#78D8FF"
        } else if(player2Color.value == "Green"){
            document.body.style.backgroundColor = "#23EE96"
        } else if(player2Color.value == "Red"){
            document.body.style.backgroundColor = "#FF7462"
        } else if(player2Color.value == "Yellow"){
            document.body.style.backgroundColor = "#FFE88F"
        }
        document.getElementById("turns").style.visibility = "hidden"
        document.getElementById("turns2").style.visibility = "visible"
        
            document.getElementById("p1-Melee").setAttribute("onclick", "listingM1()")
            document.getElementById("p1-Defender").setAttribute("onclick", "listingD1()")
            document.getElementById("p1-Ranger").setAttribute("onclick", "listingR1()")
            document.getElementById("p1-Healer").setAttribute("onclick", "listingH1()")
    }

function AttackD1() {
    let at = -1;
    let pos = 0;
    while (at == -1)
    {
        if (cellArr[pos].hasAnything && cellArr[pos].shipType == "Defender" && cellArr[pos].shipColor == "p1")
        {
            at = pos;

        }
        pos++;
    }
    attackInARange(at,2,"p1",35);
    document.getElementById("attackD1").disabled = true;
    document.querySelector('#attackD1').innerHTML = 'A̶t̶t̶a̶c̶k̶';
    document.getElementById("p1-Melee").removeAttribute("onclick")
        document.getElementById("p1-Healer").removeAttribute("onclick")
        document.getElementById("p1-Ranger").removeAttribute("onclick")

}

function MovementD1(){
    let at = -1;
    let pos = 0;
    while (at == -1)
    {
        if (cellArr[pos].hasAnything && cellArr[pos].shipType == "Defender" && cellArr[pos].shipColor == "p1")
        {
            at = pos;

        }
        pos++;
    }
    move(at,1,"p1-Defender");
    document.getElementById("movementD1").disabled = true;
    document.querySelector('#movementD1').innerHTML = 'M̶o̶v̶e̶m̶e̶n̶t̶';
    document.getElementById("p1-Melee").removeAttribute("onclick")
        document.getElementById("p1-Healer").removeAttribute("onclick")
        document.getElementById("p1-Ranger").removeAttribute("onclick")

}

function EndTurnD1(){
    
    document.getElementById("attackD1").disabled = false;
    document.querySelector('#attackD1').innerHTML = 'Attack';
    document.getElementById("movementD1").disabled = false;
    document.querySelector('#movementD1').innerHTML = 'Movement';

    let color1 = document.querySelectorAll(".game-cell");
    for (let i = 0; i < color1.length; i++) {
        if (color1) {
    color1[i].style.backgroundColor = "#9CEAEF"
    color1[i].style.borderColor = "#057672"
        }
    }
    Melee2.style.display = "";
    Ranger2.style.display = "";
    Defender2.style.display = "";
    Healer2.style.display = "";
    Melee1.style.display = "none";
    Ranger1.style.display = "none";
    Defender1.style.display = "none";
    Healer1.style.display = "none";
        if(player2Color.value == "Blue") {
            document.body.style.backgroundColor = "#78D8FF"
        } else if(player2Color.value == "Green"){
            document.body.style.backgroundColor = "#23EE96"
        } else if(player2Color.value == "Red"){
            document.body.style.backgroundColor = "#FF7462"
        } else if(player2Color.value == "Yellow"){
            document.body.style.backgroundColor = "#FFE88F"
        }
        document.getElementById("turns").style.visibility = "hidden"
        document.getElementById("turns2").style.visibility = "visible"
        
            document.getElementById("p1-Melee").setAttribute("onclick", "listingM1()")
            document.getElementById("p1-Defender").setAttribute("onclick", "listingD1()")
            document.getElementById("p1-Ranger").setAttribute("onclick", "listingR1()")
            document.getElementById("p1-Healer").setAttribute("onclick", "listingH1()")
    }

function HealH1(){
    let at = -1;
    let pos = 0;
    while (at == -1)
    {
        if (cellArr[pos].hasAnything && cellArr[pos].shipType == "Healer" && cellArr[pos].shipColor == "p1")
        {
            at = pos;
            
        }
        pos++;
    }
    chooseHeal(at,15);
    
    document.getElementById("healH1").disabled = true;
  document.getElementById("healH1").disabled = true;
  document.querySelector('#healH1').innerHTML = 'H̶e̶a̶l̶';
  document.getElementById("attackH1").disabled = true;
  document.querySelector('#attackH1').innerHTML = 'A̶t̶t̶a̶c̶k̶';
    document.getElementById("p1-Melee").removeAttribute("onclick")
    document.getElementById("p1-Defender").removeAttribute("onclick")
        document.getElementById("p1-Ranger").removeAttribute("onclick")

    }


function AttackH1() {
    let at = -1;
    let pos = 0;
    while (at == -1)
    {
        if (cellArr[pos].hasAnything && cellArr[pos].shipType == "Healer" && cellArr[pos].shipColor == "p1")
        {
            at = pos;

        }
        pos++;
    }
    attackInARange(at,1,"p1",10);
    document.getElementById("attackH1").disabled = true;
    document.querySelector('#attackH1').innerHTML = 'A̶t̶t̶a̶c̶k̶';
    document.getElementById("healH1").disabled = true;
    document.querySelector('#healH1').innerHTML = 'H̶e̶a̶l̶';
    document.getElementById("p1-Melee").removeAttribute("onclick")
    document.getElementById("p1-Defender").removeAttribute("onclick")
        document.getElementById("p1-Ranger").removeAttribute("onclick")

}

function MovementH1(){
    let at = -1;
    let pos = 0;
    while (at == -1)
    {
        if (cellArr[pos].hasAnything && cellArr[pos].shipType == "Healer" && cellArr[pos].shipColor == "p1")
        {
            at = pos;

        }
        pos++;
    }
    move(at,4,"p1-Healer");
    document.getElementById("movementH1").disabled = true;
    document.querySelector('#movementH1').innerHTML = 'M̶o̶v̶e̶m̶e̶n̶t̶';
    document.getElementById("p1-Melee").removeAttribute("onclick")
    document.getElementById("p1-Defender").removeAttribute("onclick")
        document.getElementById("p1-Ranger").removeAttribute("onclick")

}

function EndTurnH1(){
    
    document.getElementById("healH1").disabled = false;
    document.querySelector('#healH1').innerHTML = 'Heal';
    document.getElementById("attackH1").disabled = false;
    document.querySelector('#attackH1').innerHTML = 'Attack';
    document.getElementById("movementH1").disabled = false;
    document.querySelector('#movementH1').innerHTML = 'Movement';
    let color1 = document.querySelectorAll(".game-cell");
    for (let i = 0; i < color1.length; i++) {
        if (color1) {
    color1[i].style.backgroundColor = "#9CEAEF"
    color1[i].style.borderColor = "#057672"
        }
    }
    Melee2.style.display = "";
        Ranger2.style.display = "";
        Defender2.style.display = "";
        Healer2.style.display = "";
        Melee1.style.display = "none";
        Ranger1.style.display = "none";
        Defender1.style.display = "none";
        Healer1.style.display = "none";
        if(player2Color.value == "Blue") {
            document.body.style.backgroundColor = "#78D8FF"
        } else if(player2Color.value == "Green"){
            document.body.style.backgroundColor = "#23EE96"
        } else if(player2Color.value == "Red"){
            document.body.style.backgroundColor = "#FF7462"
        } else if(player2Color.value == "Yellow"){
            document.body.style.backgroundColor = "#FFE88F"
        }
        document.getElementById("turns").style.visibility = "hidden"
        document.getElementById("turns2").style.visibility = "visible"
        
            document.getElementById("p1-Melee").setAttribute("onclick", "listingM1()")
            document.getElementById("p1-Defender").setAttribute("onclick", "listingD1()")
            document.getElementById("p1-Ranger").setAttribute("onclick", "listingR1()")
            document.getElementById("p1-Healer").setAttribute("onclick", "listingH1()")

    }
function AttackM2() {
    let at = -1;
    let pos = 0;
    while (at == -1)
    {
        if (cellArr[pos].hasAnything && cellArr[pos].shipType == "Melee" && cellArr[pos].shipColor == "p2")
        {
            at = pos;

        }
        pos++;
    }
    attackInARange(at,2,"p2",25);
    document.getElementById("attackM2").disabled = true;
    document.querySelector('#attackM2').innerHTML = 'A̶t̶t̶a̶c̶k̶';
    document.getElementById("p2-Defender").removeAttribute("onclick")
        document.getElementById("p2-Healer").removeAttribute("onclick")
        document.getElementById("p2-Ranger").removeAttribute("onclick")

}

function MovementM2(){
    let at = -1;
    let pos = 0;
    while (at == -1)
    {
        if (cellArr[pos].hasAnything && cellArr[pos].shipType == "Melee" && cellArr[pos].shipColor == "p2")
        {
            at = pos;

        }
        pos++;
    }

    move(at,3,"p2-Melee");
    document.getElementById("movementM2").disabled = true;
    document.querySelector('#movementM2').innerHTML = 'M̶o̶v̶e̶m̶e̶n̶t̶';
    document.getElementById("p2-Defender").removeAttribute("onclick")
        document.getElementById("p2-Healer").removeAttribute("onclick")
        document.getElementById("p2-Ranger").removeAttribute("onclick")

}

function EndTurnM2(){
    
    document.getElementById("attackM2").disabled = false;
    document.querySelector('#attackM2').innerHTML = 'Attack';
    document.getElementById("movementM2").disabled = false;
    document.querySelector('#movementM2').innerHTML = 'Movement';

    let color1 = document.querySelectorAll(".game-cell");
    for (let i = 0; i < color1.length; i++) {
        if (color1) {
    color1[i].style.backgroundColor = "#9CEAEF"
    color1[i].style.borderColor = "#057672"
        }
    }
    Melee2.style.display = "none";
        Ranger2.style.display = "none";
        Defender2.style.display = "none";
        Healer2.style.display = "none";
        Melee1.style.display = "";
        Ranger1.style.display = "";
        Defender1.style.display = "";
        Healer1.style.display = "";
        if(player1Color.value == "Blue") {
            document.body.style.backgroundColor = "#78D8FF"
        } else if(player1Color.value == "Green"){
            document.body.style.backgroundColor = "#23EE96"
        } else if(player1Color.value == "Red"){
            document.body.style.backgroundColor = "#FF7462"
        } else if(player1Color.value == "Yellow"){
            document.body.style.backgroundColor = "#FFE88F"
        }
        document.getElementById("turns").style.visibility = "visible"
        document.getElementById("turns2").style.visibility = "hidden"

            document.getElementById("p2-Melee").setAttribute("onclick", "listingM2()")
            document.getElementById("p2-Defender").setAttribute("onclick", "listingD2()")
            document.getElementById("p2-Ranger").setAttribute("onclick", "listingR2()")
            document.getElementById("p2-Healer").setAttribute("onclick", "listingH2()")
    }

    function AttackR2() {
        document.getElementById("attackR2").disabled = true;
    
        let at = -1;
        let pos = 0;
        while (at == -1)
        {
            if (cellArr[pos].hasAnything && cellArr[pos].shipType == "Ranger" && cellArr[pos].shipColor == "p2")
            {
                at = pos;
    
            }
            pos++;
        }
        decideRow(at,20);
      document.getElementById("attackR2").disabled = true;
      document.querySelector('#attackR2').innerHTML = 'A̶t̶t̶a̶c̶k̶';
        document.getElementById("p2-Melee").removeAttribute("onclick")
        document.getElementById("p2-Defender").removeAttribute("onclick")
            document.getElementById("p2-Healer").removeAttribute("onclick")
    }

function MovementR2(){
    let at = -1;
    let pos = 0;
    while (at == -1)
    {
        if (cellArr[pos].hasAnything && cellArr[pos].shipType == "Ranger" && cellArr[pos].shipColor == "p2")
        {
            at = pos;

        }
        pos++;
    }
    move(at,2,"p2-Ranger");
    document.getElementById("movementR2").disabled = true;
    document.querySelector('#movementR2').innerHTML = 'M̶o̶v̶e̶m̶e̶n̶t̶';
    document.getElementById("p2-Melee").removeAttribute("onclick")
    document.getElementById("p2-Defender").removeAttribute("onclick")
        document.getElementById("p2-Healer").removeAttribute("onclick")

}

function EndTurnR2(){
    
    document.getElementById("attackR2").disabled = false;
    document.querySelector('#attackR2').innerHTML = 'Attack';
    document.getElementById("movementR2").disabled = false;
    document.querySelector('#movementR2').innerHTML = 'Movement';

    let color1 = document.querySelectorAll(".game-cell");
    for (let i = 0; i < color1.length; i++) {
        if (color1) {
    color1[i].style.backgroundColor = "#9CEAEF"
    color1[i].style.borderColor = "#057672"
        }
    }
    Melee2.style.display = "none";
        Ranger2.style.display = "none";
        Defender2.style.display = "none";
        Healer2.style.display = "none";
        Melee1.style.display = "";
        Ranger1.style.display = "";
        Defender1.style.display = "";
        Healer1.style.display = "";
        if(player1Color.value == "Blue") {
            document.body.style.backgroundColor = "#78D8FF"
        } else if(player1Color.value == "Green"){
            document.body.style.backgroundColor = "#23EE96"
        } else if(player1Color.value == "Red"){
            document.body.style.backgroundColor = "#FF7462"
        } else if(player1Color.value == "Yellow"){
            document.body.style.backgroundColor = "#FFE88F"
        }
        document.getElementById("turns").style.visibility = "visible"
        document.getElementById("turns2").style.visibility = "hidden"
        
            document.getElementById("p2-Melee").setAttribute("onclick", "listingM2()")
            document.getElementById("p2-Defender").setAttribute("onclick", "listingD2()")
            document.getElementById("p2-Ranger").setAttribute("onclick", "listingR2()")
            document.getElementById("p2-Healer").setAttribute("onclick", "listingH2()")
    }

function AttackD2() {
    let at = -1;
    let pos = 0;
    while (at == -1)
    {
        if (cellArr[pos].hasAnything && cellArr[pos].shipType == "Defender" && cellArr[pos].shipColor == "p2")
        {
            at = pos;

        }
        pos++;
    }
    attackInARange(at,2,"p2",35);
    document.getElementById("attackD2").disabled = true;
    document.querySelector('#attackD2').innerHTML = 'A̶t̶t̶a̶c̶k̶';
    document.getElementById("p2-Melee").removeAttribute("onclick")
        document.getElementById("p2-Healer").removeAttribute("onclick")
        document.getElementById("p2-Ranger").removeAttribute("onclick")

}

function MovementD2(){
    let at = -1;
    let pos = 0;
    while (at == -1)
    {
        if (cellArr[pos].hasAnything && cellArr[pos].shipType == "Defender" && cellArr[pos].shipColor == "p2")
        {
            at = pos;

        }
        pos++;
    }
    move(at,1,"p2-Defender");
    document.getElementById("movementD2").disabled = true;
    document.querySelector('#movementD2').innerHTML = 'M̶o̶v̶e̶m̶e̶n̶t̶';
    document.getElementById("p2-Melee").removeAttribute("onclick")
        document.getElementById("p2-Healer").removeAttribute("onclick")
        document.getElementById("p2-Ranger").removeAttribute("onclick")

}

function EndTurnD2(){
    
    document.getElementById("attackD2").disabled = false;
    document.querySelector('#attackD2').innerHTML = 'Attack';
    document.getElementById("movementD2").disabled = false;
    document.querySelector('#movementD2').innerHTML = 'Movement';

    let color1 = document.querySelectorAll(".game-cell");
    for (let i = 0; i < color1.length; i++) {
        if (color1) {
    color1[i].style.backgroundColor = "#9CEAEF"
    color1[i].style.borderColor = "#057672"
        }
    }
    Melee2.style.display = "none";
        Ranger2.style.display = "none";
        Defender2.style.display = "none";
        Healer2.style.display = "none";
        Melee1.style.display = "";
        Ranger1.style.display = "";
        Defender1.style.display = "";
        Healer1.style.display = "";
        if(player1Color.value == "Blue") {
            document.body.style.backgroundColor = "#78D8FF"
        } else if(player1Color.value == "Green"){
            document.body.style.backgroundColor = "#23EE96"
        } else if(player1Color.value == "Red"){
            document.body.style.backgroundColor = "#FF7462"
        } else if(player1Color.value == "Yellow"){
            document.body.style.backgroundColor = "#FFE88F"
        }
        document.getElementById("turns").style.visibility = "visible"
        document.getElementById("turns2").style.visibility = "hidden"
        
            document.getElementById("p2-Melee").setAttribute("onclick", "listingM2()")
            document.getElementById("p2-Defender").setAttribute("onclick", "listingD2()")
            document.getElementById("p2-Ranger").setAttribute("onclick", "listingR2()")
            document.getElementById("p2-Healer").setAttribute("onclick", "listingH2()")
    }

function HealH2(){
    let at = -1;
    let pos = 0;
    while (at == -1)
    {
        if (cellArr[pos].hasAnything && cellArr[pos].shipType == "Healer" && cellArr[pos].shipColor == "p2")
        {
            at = pos;
            
        }
        pos++;
    }
    chooseHeal(at,15);
    document.getElementById("healH2").disabled = true;
  document.getElementById("healH2").disabled = true;
  document.querySelector('#healH2').innerHTML = 'H̶e̶a̶l̶';
  document.getElementById("attackH2").disabled = true;
  document.querySelector('#attackH2').innerHTML = 'A̶t̶t̶a̶c̶k̶';
    document.getElementById("p2-Melee").removeAttribute("onclick")
    document.getElementById("p2-Defender").removeAttribute("onclick")
        document.getElementById("p2-Ranger").removeAttribute("onclick")
    }

function AttackH2() {

    let at = -1;
    let pos = 0;
    while (at == -1)
    {
        if (cellArr[pos].hasAnything && cellArr[pos].shipType == "Healer" && cellArr[pos].shipColor == "p2")
        {
            at = pos;

        }
        pos++;
    }
    attackInARange(at,1,"p2",10);
    document.getElementById("attackH2").disabled = true;
    document.querySelector('#attackH2').innerHTML = 'A̶t̶t̶a̶c̶k̶';
    document.getElementById("healH2").disabled = true;
    document.querySelector('#healH2').innerHTML = 'H̶e̶a̶l̶';
    document.getElementById("p2-Melee").removeAttribute("onclick")
    document.getElementById("p2-Defender").removeAttribute("onclick")
        document.getElementById("p2-Ranger").removeAttribute("onclick")
}

function MovementH2(){
    let at = -1;
    let pos = 0;
    while (at == -1)
    {
        if (cellArr[pos].hasAnything && cellArr[pos].shipType == "Healer" && cellArr[pos].shipColor == "p2")
        {
            at = pos;

        }
        pos++;
    }
    move(at,4,"p2-Healer");

    document.getElementById("movementH2").disabled = true;
    document.querySelector('#movementH2').innerHTML = 'M̶o̶v̶e̶m̶e̶n̶t̶';

    document.getElementById("p2-Melee").removeAttribute("onclick")
    document.getElementById("p2-Defender").removeAttribute("onclick")
        document.getElementById("p2-Ranger").removeAttribute("onclick")

}

function EndTurnH2(){
    
    document.getElementById("healH2").disabled = false;
    document.querySelector('#healH2').innerHTML = 'Heal';
    document.getElementById("attackH2").disabled = false;
    document.querySelector('#attackH2').innerHTML = 'Attack';
    document.getElementById("movementH2").disabled = false;
    document.querySelector('#movementH2').innerHTML = 'Movement';

    let color1 = document.querySelectorAll(".game-cell");
    for (let i = 0; i < color1.length; i++) {
        if (color1) {
    color1[i].style.backgroundColor = "#9CEAEF"
    color1[i].style.borderColor = "#057672"
        }
    }
    Melee2.style.display = "none";
        Ranger2.style.display = "none";
        Defender2.style.display = "none";
        Healer2.style.display = "none";
        Melee1.style.display = "";
        Ranger1.style.display = "";
        Defender1.style.display = "";
        Healer1.style.display = "";
        if(player1Color.value == "Blue") {
            document.body.style.backgroundColor = "#78D8FF"
        } else if(player1Color.value == "Green"){
            document.body.style.backgroundColor = "#23EE96"
        } else if(player1Color.value == "Red"){
            document.body.style.backgroundColor = "#FF7462"
        } else if(player1Color.value == "Yellow"){
            document.body.style.backgroundColor = "#FFE88F"
        }
        document.getElementById("turns").style.visibility = "visible"
        document.getElementById("turns2").style.visibility = "hidden"

            document.getElementById("p2-Melee").setAttribute("onclick", "listingM2()")
            document.getElementById("p2-Defender").setAttribute("onclick", "listingD2()")
            document.getElementById("p2-Ranger").setAttribute("onclick", "listingR2()")
            document.getElementById("p2-Healer").setAttribute("onclick", "listingH2()")

    }
function printArray() {
    console.log(cellArr);
}