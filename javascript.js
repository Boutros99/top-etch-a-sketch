

/* Defining variables */

let grid = document.querySelector(".gridSection");
let gridWidth = grid.offsetWidth;
let gridHeight = grid.offsetHeight;
let gridColor = 'slategrey'

let isRainbowModeOn=false; /* a variable used to know if the last mode before resizing the grid is rainbow mode */
let isShadowModeOn=false; /* a variable used to know if the last mode before resizing the grid is shadow mode */



/* Grid Functions */

/* Didn't use wrap because when reducing the window without the pixel dimension in % they would overflow from the containe, perhaps the loop is not usefull now*/

function createGrid(gridDimension) {
    let pixelSize=100/gridDimension;
    let row;
    let pixel;
    for (let i=1 ; i<=gridDimension; i++) {
        row = document.createElement("div");
        row.classList.toggle("row")
        row.setAttribute("style",` height : ${pixelSize}% ; background : ${gridColor} ; flex: 1 1 0 ; display : flex ; margin:0px ; padding : 0px` );

        for (let j=1 ; j<=gridDimension; j++) {
            pixel = document.createElement("div");
            pixel.classList.toggle("pixel")
            pixel.setAttribute("style",` height : 100% ; width : ${pixelSize}% ;aspect-ratio: 1/1; border : 1px solid black ; background : ${gridColor}; flex: 1 1 0` );
            row.appendChild(pixel);   
        }

        grid.appendChild(row);
    }
}; 



/*Different functions to use  */

/* Delete the grid */
function deleteGrid() {
    while (grid.firstChild) {
        grid.removeChild(grid.lastChild);
    }

}


/* Input function  */
function inputDimension() {
    let value=prompt("Input Grid Size");
    while (isNaN(value) || Number(value)>100) {
        value=prompt("Invalid or too great value, try again");
    }
    return value
}

/*Reset the grid */

function resetGridColor() {
    const pixelList=document.querySelectorAll(".pixel");
    pixelList.forEach((button) => {
        button.style.background = gridColor;
        isShadowModeOn==true? button.style.opacity=0 : button.style.opacity=1;
        });
}



/* set the event listeners with a standard color*/
function setNormalColorEvent() {
    resetGridColor();
    const pixelList=document.querySelectorAll(".pixel");

    pixelList.forEach((button) => {
        button.addEventListener("mouseenter", function (e) {
            e.target.style.background = "black"
        });
    });
}


/* set the event listeners with a rainbow color*/

function createRandomRbGCode() {
    let r= Math.floor(255*Math.random()) +1 , g= Math.floor(255*Math.random()) +1 , b= Math.floor(255*Math.random()) +1 ;
    return (`rgb(${r},${g},${b})`);
}


function setRainbowColorEvent() {
    resetGridColor();
    const pixelList=document.querySelectorAll(".pixel");

    pixelList.forEach((button) => {
        button.addEventListener("mouseenter", function (e) {
            e.target.style.background = createRandomRbGCode()
        });
    });
}

/* Set the color mode to shadow */

function setShadowColorEvent() {
    resetGridColor();
    const pixelList=document.querySelectorAll(".pixel");

    pixelList.forEach((button) => {
        button.style.opacity=0;

        button.addEventListener("mouseenter", function (e) {
            e.target.style.background = "black";
            let currentOpacity = Number(e.target.style.opacity);
            currentOpacity<1 ? e.target.style.opacity= currentOpacity +0.1 : e.target.style.opacity=1;
        });
    });
}






/* Event listeners on buttons */

/* new grid creation */
const sizeButton=document.querySelector("#sizeButton");
sizeButton.addEventListener("click", () => {
    deleteGrid();
    let dimensionInput=inputDimension();
    createGrid(dimensionInput);
    /* to keep the previous color mode */
    if (isRainbowModeOn==true) {
        setRainbowColorEvent();
    } else if (isShadowModeOn==true) {
        setShadowColorEvent();
    } else setNormalColorEvent();

})


/* reset the grid color*/
const resetButton=document.querySelector("#resetButton");
resetButton.addEventListener("click",() =>{
    resetGridColor();
} ) 

/* set the mode to Rainbow color*/
const rainbowMode=document.querySelector("#rainbowMode");
rainbowMode.addEventListener("click",() =>{
    isRainbowModeOn=true;
    isShadowModeOn=false;
    setRainbowColorEvent();
} ) 

/* set the mode to normal color*/
const normalMode=document.querySelector("#normalMode");
normalMode.addEventListener("click",() =>{
    isRainbowModeOn=false;
    isShadowModeOn=false;
    setNormalColorEvent();
} ) 


/* set the mode to shadow color*/
const shadowMode=document.querySelector("#shadowMode");
shadowMode.addEventListener("click",() =>{
    isRainbowModeOn=false;
    isShadowModeOn=true;
    setShadowColorEvent();
} ) 
