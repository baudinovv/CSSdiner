import levelsObject from '../JSON/levels.json';

// variables for Levels changing info

let table = document.querySelector('#table');
let tableLow = document.querySelector('#tableLow');
let arrowL = document.querySelector('#arrow-left');
let arrowR = document.querySelector('#arrow-right');
let levelTitle = document.querySelector('#level-title');
let taskTitle = document.querySelector('#task-title');
let asideTitle = document.querySelector('#asideTitle');
let asideSubTitle = document.querySelector('#asideSubTitle');
let asideSelector = document.querySelector('#asideSelector');
let asideText = document.querySelector('#asideText');
let asideExamples = document.querySelector('#asideExamples');
let asideCheckbox = document.querySelector('#checkbox');
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
    return (answer) ? (Array.from(htmlEditor.querySelectorAll(`${answer}`))
        .map((value) => value.hasAttributes('choosen')).filter(Boolean).length == currentLevel.answer 
        && !Array.from(htmlEditor.querySelectorAll(`${answer}`))
        .map((value) => value.hasAttributes('choosen')).includes(false)) ? true : false : 0;   
}


// getting value from input to check if it is right
btn.addEventListener("click", () => {
    let answer = input.value;
    if(answerReduce(answer)){
        localStorage.setItem(`level${levelCounter}`, 1) 
        arrowR.click();
        input.value = '';
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

const modalReduce = (nodeIn, mode) => {
    const modal = document.createElement('div');   
    modal.classList = 'modal';
    nodeIn.addEventListener('mouseover', (event) => {
        event.stopPropagation();
        tableLow.append(modal);
        modal.innerHTML = `&lt;${nodeIn.className}&gt;`
        document.body.style.position = 'relative';
        modal.style.left = `${nodeIn.getBoundingClientRect().x + nodeIn.getBoundingClientRect().width/4}px`;
        modal.style.top = `${nodeIn.getBoundingClientRect().y - nodeIn.getBoundingClientRect().height/mode}px`;
        nodeIn.setAttribute("modal", "true");
    });
    nodeIn.addEventListener('mouseout', () => {
        nodeIn.removeAttribute('modal');
        (Array.from(tableLow.children).includes(modal)) ? tableLow.removeChild(modal) : 0;
    });
}


// checkbox is green when lvl is complete
const levelDone = () => {
    (localStorage.getItem(`level${levelCounter}`) == 1) ?
        checkBox.style.filter = "brightness(0) saturate(100%) invert(39%) sepia(89%) saturate(1196%) hue-rotate(67deg) brightness(98%) contrast(101%)"
    : checkBox.style.filter = "none";
}

const levelUpdate = () => {
    table.innerHTML = ''; 
    
    let prevNode = table;
    let currentLevel = levelsObject.levels[levelCounter - 1];

    levelTitle.innerHTML = `Level ${levelCounter} of 32`;
    taskTitle.innerHTML = `Select the ${currentLevel.select}`;
    htmlEditor.innerHTML = currentLevel.HTMLeditor;

    asideTitle.innerHTML = currentLevel.asideTitle;
    asideSubTitle.innerHTML = currentLevel.asideSubTitle;
    asideSelector.innerHTML = currentLevel.asideSelector;
    asideText.innerHTML = currentLevel.asideText;
    asideExamples.innerHTML = currentLevel.asideExamples;

    levelDone();

    for(let i = 0; i < currentLevel.tags[0].length; i++){
        let surface = table;
        for(let j = 0; j < currentLevel.tags.length; j++){
            if(!currentLevel.tags[j][i]) continue;

            const nodeIn = document.createElement('div');
            
            if(j > 1) nodeIn.style.top = `${-j + 6}0px`;
            if(j == 0){
                if(currentLevel.tags[0][i].includes("bento") || currentLevel.tags[0][i].includes("plate") || currentLevel.tags[0][i].includes("plate-fancy")){
                    nodeIn.classList = currentLevel.tags[j][i];
                    table.append(nodeIn);
                    surface = nodeIn;
                    modalReduce(nodeIn, 3);
                    // nodeIn.setAttribute("choosen", "a");
                    continue;
                }
            }
            modalReduce(nodeIn , 1);
            nodeIn.classList = currentLevel.tags[j][i];
            // nodeIn.setAttribute("choosen", "a");
            surface.append(nodeIn);
        } 
    }
};    
levelUpdate();