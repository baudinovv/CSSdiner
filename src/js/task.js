import levelsObject from '../JSON/levels.json';

// variables for Levels changing info

let table = document.querySelector('#table');
let arrowL = document.querySelector('#arrow-left');
let arrowR = document.querySelector('#arrow-right');
let levelTitle = document.querySelector('#level-title');
let taskTitle = document.querySelector('#task-title');

// variables for checking answer

let htmlEditor = document.querySelector('#html-editor');
let input = document.querySelector('.dev__css-editor__input-1');
let btn = document.querySelector('.dev__css-editor__input-2');
let checkBox = document.querySelector('#checkbox');
let answer;

//
let editors = document.querySelector('#editors');


let levelCounter = 1;

arrowL.addEventListener( "click" , () => {
    levelCounter--;
    if (levelCounter < 1) levelCounter = 1;
    (localStorage.getItem(`level${levelCounter}`)) ?
        checkBox.style.filter = "brightness(0) saturate(100%) invert(72%) sepia(80%) saturate(4649%) hue-rotate(87deg) brightness(115%) contrast(111%);"
        : checkBox.style.filter = "none";
    levelUpdate();
});
arrowR.addEventListener( "click" , () => {
    levelCounter++;
    if (levelCounter > levelsObject.levels.length) levelCounter = levelsObject.levels.length;
    levelUpdate();
});

// checking answer
const answerReduce = (answer) => {
    let currentLevel = levelsObject.levels[levelCounter - 1];
    return (answer) ? 
        (Array.from(htmlEditor.querySelectorAll(`${answer}`)).map((value) => {return value.hasAttributes('choosen')}).filter(Boolean).length == currentLevel.answer) ?
            true 
            : false
        : 0;    
}


// getting value from input to check if it is right
btn.addEventListener("click", () => {
    let answer = input.value;
    if(answerReduce(answer)){
        localStorage.setItem(`level${levelCounter}`, 1) 
        arrowR.click();
    } else{ // shaking animation if answer is wrong
        editors.style.animation = "shake 0.3s ease";
        setTimeout(() => {editors.style.animation = "none";}, 300)
    }
});

// click btn when user press enter 
input.addEventListener('keypress', function(e){
    if(e.which === 13){
        e.preventDefault();
        btn.click();
    }
});


// checkbox is green when lvl is complete
const levelDone = () => {
    (localStorage.getItem(`level${levelCounter}`) == 1) ?
        checkBox.style.filter = "brightness(0) saturate(100%) invert(39%) sepia(89%) saturate(1196%) hue-rotate(67deg) brightness(98%) contrast(101%)"
    : checkBox.style.filter = "none";
}

const levelUpdate = () => {
    table.innerHTML = ''; // clean table for div's
    
    let prevNode = table;
    let currentLevel = levelsObject.levels[levelCounter - 1];

    levelTitle.innerHTML = `Level ${levelCounter} of 32`;
    taskTitle.innerHTML = `Select the ${currentLevel.select}`;
    htmlEditor.innerHTML = currentLevel.HTMLeditor;
    
    levelDone();

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