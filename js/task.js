let table = document.querySelector('#table');
let arrowL = document.querySelector('#arrow-left');
let arrowR = document.querySelector('#arrow-right');
let levelTitle = document.querySelector('#level-title');
let taskTitle = document.querySelector('#task-title');
let levelCounter = 1;

let square =  document.createElement('div');
let circle =  document.createElement('div');
let aquaCircle =  document.createElement('div');
square.className = 'square';
circle.className = 'circle';
aquaCircle.className = 'aqua-circle';

let levelsObject = {
    levels : [
        {
            level : 1,
            tags : [`circle`, circle, circle],
            select: 'apples',
            in: ['', '']
        },
        {
            level : 2,
            tags : [circle , circle , circle],
            select: 'bananas',
        },
        {
            level : 3,
            tags : [aquaCircle],
            select: 'orange',
        }
    ],
}

// table.innerHTML = levelsObject.levels[levelCounter - 1].tags;
levelTitle.innerHTML = `Level ${levelCounter} of 32`;
taskTitle.innerHTML = `Select the ${levelsObject.levels[levelCounter - 1].select}`
for(let el of levelsObject.levels[0].tags){
    table.append(el);
}

arrowL.addEventListener( "click" , () => {
    levelCounter--;
    if (levelCounter < 1) levelCounter = 1;
    levelUpdate();
});
arrowR.addEventListener( "click" , () => {
    levelCounter++;
    if (levelCounter > levelsObject.levels.length) levelCounter = levelsObject.levels.length;
    levelUpdate();
});

const levelUpdate = () => {
    // table.innerHTML = levelsObject.levels[levelCounter - 1].tags;
    table.innerHTML = '';

    levelTitle.innerHTML = `Level ${levelCounter} of 32`;
    taskTitle.innerHTML = `Select the ${levelsObject.levels[levelCounter - 1].select}`;
    for(let el of levelsObject.levels[levelCounter - 1].tags){
        table.append(el);
    }
    // for(let el of levelsObject.levels[levelCounter - 1].in){}
};    
