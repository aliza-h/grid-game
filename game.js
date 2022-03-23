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

function attackRow(yourColor, startAt, toRight, damage)
{
    if (toRight)
    {
        let cellStart = startAt;
        let endAt = numberOfColumns*(Math.trunc(startAt/numberOfColumns)+1)//you may need to add/subtract one

        while (cellStart <= endAt)
        {
            cellStart++;
            attactCell(cellStart,yourColor,damage);
        }
    }
    else
    {
        let cellStart = startAt;
        let endAt = numberOfColumns*(Math.trunc(startAt/numberOfColumns))+1//you may need to add or subtract one

        while (cellStart >= endAt)
        {
            cellStart--;
            attactCell(cellStart,yourColor,damage);
        }
    }
}

function attackColumn(yourColor,startAt,down,damage)
{
    if (down)
    {
        let cellStart = startAt;
        while (startAt <= numberOfColumns*numberOfRows)
        {
            attactCell(cellStart,yourColor,damage);
            cellStart+=numberOfRows;
        }
    }
    else
    {
        let cellStart = startAt;
        while (startAt > 0)
        {
            attactCell(cellStart,yourColor,damage);
            cellStart-=numberOfRows;
        }
    }
}

function attactInARange(at,range)
{
    let ups = range;
    let rights = 0;
    let downs = 0;
    let lefts = 0;

    while (ups > 0)
    {
        let adding = at;
        let goUps = ups;
        let goRights = rights;

        while (goUps > 0 && !isAtTop(adding))
        {
            adding -= numberOfRows;
            //add event listener to cell "adding"
            goUps--;
        }

        while (goRights > 0 && !isAtRight(adding))
        {
            adding++;
            //add event listener to cell "adding"
            goRights--;
        }
        ups--;
        rights++;
    }

    while (rights > 0)
    {
        let adding = at;
        let goRights = rights;
        let goDowns = downs;

        while (goRights > 0 && !isAtRight(adding))
        {
            adding++;
            //add event listener to cell "adding"
            goRights--;
        }

        while (goDowns > 0 && !isAtBottom(adding))
        {
            adding += numberOfColumns
            //add event listener to cell "adding"
            goDowns--;
        }
        rights--;
        downs++;
    }

    while (downs > 0)
    {
        let adding = at;
        let goDowns = downs;
        let goLefts = lefts;

        while (goDowns > 0 && !isAtBottom(adding))
        {
            adding += numberOfColumns
            //add event listener to cell "adding"
            goDowns--;
        }

        while (goLefts > 0 && !isAtLeft)
        {
            adding--;
            //add event listener to cell "adding"
            goLefts--;
        }

        downs--;
        lefts++;
    }
    
    while (lefts > 0)
    {
        let adding = at;
        let goLefts = lefts;
        let goUps = ups;

        while (goLefts > 0 && !isAtLeft)
        {
            adding--;
            //add event listener to cell "adding"
            goLefts--;
        }

        while (goUps > 0 && !isAtTop(adding))
        {
            adding -= numberOfRows;
            //add event listener to cell "adding"
            goUps--;
        }
    }
}

function isAtEdge(num)
{
    return isAtTop(num) && isAtBottom(num) && isAtRight(num) && isAtLeft(num);
}

function isAtTop(num)
{
    return num < numberOfRows;
}

function isAtLeft(num)
{
    return num % numberOfRows == 0;
}

function isAtRight(num)
{
   return num % numberOfRows == (numberOfRows - 1);
}

function isAtBottom(num)
{
    return num > (numberOfColumns-1)*numberOfRows;
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

    numberOfRows = rows;
    numberOfColumns = colunms;
}
 
generateGrid(10,15);
chooseYourShips();

//console.log(25%13);
// EACH CELL HAS
    // ID
    // obstacle/no obstacle
    // player/no player