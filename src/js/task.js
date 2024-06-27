import levelsObject from '../JSON/levels.json';

// variables for Levels changing info on level counter

let table = document.querySelector('#table');
let arrowL = document.querySelector('#arrow-left');
let arrowR = document.querySelector('#arrow-right');
let levelTitle = document.querySelector('#level-title');
let taskTitle = document.querySelector('#task-title');

// variables for checking answer

let htmlEditor = document.querySelector('#html-editor');
let input = document.querySelector('.dev__css-editor__input-1');
let btn = document.querySelector('.dev__css-editor__input-2');
let answer;
//

let levelCounter = 1;

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


const answerReduce = (answer) => {
    let currentLevel = levelsObject.levels[levelCounter - 1];
    return (answer) ? 
        (Array.from(htmlEditor.querySelectorAll(`${answer}`)).map((value) => {return value.hasAttributes('choosen')}).filter(Boolean).length == currentLevel.answer) ?
            true 
            : false
        : 0;    
}

btn.addEventListener("click", () => {
    let answer = input.value;
    (answerReduce(answer)) ? 
        arrowR.click()
        : alert(false);
});

const levelUpdate = () => {
    table.innerHTML = '';
    
    let prevNode = table;
    let currentLevel = levelsObject.levels[levelCounter - 1];

    levelTitle.innerHTML = `Level ${levelCounter} of 32`;
    taskTitle.innerHTML = `Select the ${currentLevel.select}`;
    htmlEditor.innerHTML = currentLevel.HTMLeditor;
    
    for(let i = 0; i < currentLevel.tags[0].length; i++){
        for(let j = 0; j < currentLevel.tags.length; j++){
            if(!currentLevel.tags[j][i]) continue;
            const nodeIn = document.createElement('div');
            let surface = prevNode;
            nodeIn.classList.add(currentLevel.tags[j][i]);
            prevNode = nodeIn;
            surface.append(nodeIn);
        } 
        prevNode = table;
    }
};    
levelUpdate();