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
        },git add
        {
            level : 2,
            tags : [table, 
                ['circle', 'circle', 'circle'],
                ['square', 'square', 'square'],
            ],
            select: 'bananas',
        },
        {
            level : 3,
            tags : [table, 
                ['circle', 'circle', 'circle'],
            ],
            select: 'orange',
        }
    ],
}
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
const levelUpdate = () => {
    table.innerHTML = '';
    let currentLevel = levelsObject.levels[levelCounter - 1];
    let prevNode = table;
        
    levelTitle.innerHTML = `Level ${levelCounter} of 32`;
    taskTitle.innerHTML = `Select the ${currentLevel.select}`;
    for(let i = 0; i < currentLevel.tags[1].length; i++){
        for(let j = 1; j < currentLevel.tags.length; j++){
            if(!currentLevel.tags[j][i]) continue;
            const node = document.createElement('div');
            let surface = prevNode;
            node.classList.add(currentLevel.tags[j][i]);
            prevNode = node;
            surface.append(node);
        } 
        prevNode = table;
    }
};    
levelUpdate();
