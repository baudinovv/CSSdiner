let table = document.querySelector('#table');
let arrowL = document.querySelector('#arrow-left')
let arrowR = document.querySelector('#arrow-right')
let lvlTitle = document.querySelector('#lvl-title')
let lvlCounter = 1;
let levelsObj = {
    levels : [
        {
            lvl : 1,
            tags : `
             <div class="circle"><div class="square"><div class="aqua-circle"></div></div></div>
            `, 
        },
        {
            lvl : 2,
            tags : `
             <div class="circle"><div class="square"></div></div>
             <div class="circle"><div class="square"></div></div>
             <div class="circle"><div class="square"></div></div>
            `,
        },
        {
            lvl : 3,
            tags : `
            <div class="circle"></div>
            <div class="circle"></div>
            `,
        }
    ],
}
const lvlReduce = () => {    
    arrowL.addEventListener( "click" , () => {
        lvlCounter--;
    });
    arrowR.addEventListener( "click" , () => {
        lvlCounter++;
    });
    table.innerHTML = levelsObj.levels[lvlCounter - 1].tags;
    lvlTitle.innerHTML = `Level ${lvlCounter} of 32`;
    console.log(lvlCounter);
}
setInterval(lvlReduce, 100);
