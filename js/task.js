let table = document.querySelector('#table');
let arrowL = document.querySelector('#arrow-left');
let arrowR = document.querySelector('#arrow-right');
let levelTitle = document.querySelector('#level-title');
let taskTitle = document.querySelector('#task-title');
let levelCounter = 1;

let levelsObject = {
    levels : [
        {
            level : 1,
            tags : [
                ['circle', 'circle', 'circle'],
                ['square', 'square', 'square'],
                ['aqua-circle', 'aqua-circle', 'aqua-circle']
            ],
            select: 'apples',
        },
        {
            level : 2,
            tags : [
                ['circle', 'circle', 'circle'],
                ['square', 'square', 'square'],
            ],
            select: 'bananas',
        },
        {
            level : 3,
            tags : [
                ['circle', 'circle', 'circle'],
            ],
            select: 'orange',
        }
    ],
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
    table.innerHTML = '';
    
    let prevNode = table;
    let currentLevel = levelsObject.levels[levelCounter - 1];
    
    levelTitle.innerHTML = `Level ${levelCounter} of 32`;
    taskTitle.innerHTML = `Select the ${currentLevel.select}`;

    
    for(let i = 0; i < currentLevel.tags[0].length; i++){
        for(let j = 0; j < currentLevel.tags.length; j++){
            if(!currentLevel.tags[j][i]) continue;
            const nodeIn = document.createElement('div');
            let surface = prevNode;
            nodeIn.classList.add(currentLevel.tags[j][i]);
            prevNode = nodeIn;
            surface.append(nodeIn);
            console.log(j);
        } 
        prevNode = table;
    }
};    
levelUpdate();
