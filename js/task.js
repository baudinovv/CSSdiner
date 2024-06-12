let table = document.querySelector('#table');
let arrowL = document.querySelector('#arrow-left');
let arrowR = document.querySelector('#arrow-right');
let levelTitle = document.querySelector('#level-title');
let taskTitle = document.querySelector('#task-title');
let levelCounter = 1;

const circle = document.createElement('div');
const square = document.createElement('div');

circle.classList.add('circle');
square.classList.add('square');
let levelsObject = {
    levels : [
        {
            level : 1,
            tags : [table, 
                ['circle', 'circle', 'circle'],
                ['square', 'square', 'square'],
                ['aqua-circle', 'aqua-circle', 'aqua-circle']
            ],
            select: 'apples',
        },
        {
            level : 2,
            tags : ['circle' , 'circle' , 'circle'],
            select: 'bananas',
        },
        {
            level : 3,
            tags : ['aqua-circle'],
            select: 'orange',
        }
    ],
}

// table.innerHTML = levelsObject.levels[levelCounter - 1].tags;
levelTitle.innerHTML = `Level ${levelCounter} of 32`;
taskTitle.innerHTML = `Select the ${levelsObject.levels[levelCounter - 1].select}`
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

const toBox = (smth) => {
    return smth
} 
let prevNode = table;
const levelUpdate = () => {
    // table.innerHTML = levelsObject.levels[levelCounter - 1].tags;
    table.innerHTML = '';

    levelTitle.innerHTML = `Level ${levelCounter} of 32`;
    taskTitle.innerHTML = `Select the ${levelsObject.levels[levelCounter - 1].select}`;
    for(let i = 0; i < levelsObject.levels[levelCounter - 1].tags[1].length; i++){
        for(let j = 1; j < levelsObject.levels[levelCounter - 1].tags.length; j++){
            if(!levelsObject.levels[levelCounter - 1].tags[j][i]) continue;
            const nodeIn = document.createElement('div');
            let surface = prevNode;
            nodeIn.classList.add(levelsObject.levels[levelCounter - 1].tags[j][i]);
            prevNode = nodeIn;
            surface.append(nodeIn);
            console.log(j);
        } 
        prevNode = table;
    }
    // for(let i = 0; i < levelsObject.levels[levelCounter - 1].tags.length; i++){
    //     if(levelsObject.levels[levelCounter - 1].in[i] === undefined) continue;

    //     const nodeIn = document.createElement('div');
        
    //     nodeIn.classList.add(levelsObject.levels[levelCounter - 1].in[i]);
    //     .append(nodeIn);
    // }
};    
levelUpdate();
