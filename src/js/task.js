import levelsObject from '../JSON/levels.json';

// variables for Levels changing info

let table = document.querySelector('#table');
let tableLow = document.querySelector('#tableLow');
let levelTitle = document.querySelector('#level-title');
let taskTitle = document.querySelector('#task-title');
let asideTitle = document.querySelector('#asideTitle');
let asideSubTitle = document.querySelector('#asideSubTitle');
let asideSelector = document.querySelector('#asideSelector');
let asideText = document.querySelector('#asideText');
let asideExamples = document.querySelector('#asideExamples');
let htmlEditor = document.querySelector('#html-editor');
let checkBox = document.querySelector('#checkbox');
let exampleTitle = document.querySelector('#exampleTitle')


let arrowL = document.querySelector('#arrow-left');
let arrowR = document.querySelector('#arrow-right');

let input = document.querySelector('.dev__css-editor__input-1');

let levelCounter = (localStorage.getItem('lastLevelUser')) ? localStorage.getItem('lastLevelUser') : 1;

arrowL.addEventListener( "click" , () => {
    levelCounter--;
    if (levelCounter < 1) levelCounter = 1;
    levelUpdate(levelCounter);
});
arrowR.addEventListener( "click" , () => {
    levelCounter++;
    if (levelCounter > levelsObject.levels.length) levelCounter = levelsObject.levels.length;
    levelUpdate(levelCounter);
});

// checkbox is green when lvl is complete
const levelDone = (levelCounter) => {
    (localStorage.getItem(`level${levelCounter}`) == 1) ?
        checkBox.style.filter = "brightness(0) saturate(100%) invert(39%) sepia(89%) saturate(1196%) hue-rotate(67deg) brightness(98%) contrast(101%)"
    : checkBox.style.filter = "none";
}


const modalReduce = (nodeIn, mode) => { // creating mini-modal around table elements
    const modal = document.createElement('div');   
    modal.classList = 'modal';
    nodeIn.addEventListener('mouseover', (event) => {
        event.stopPropagation();
        tableLow.append(modal); 
        modal.innerHTML = `&lt;${nodeIn.className.replace('-', ' ').replace(' choosen ', '').replace('small', ' class = "small"').replace('fancy', 'id ="fancy"')}&gt;` // rewriting modal text
        // document.body.style.position = 'relative';
        modal.style.left = `${nodeIn.getBoundingClientRect().x + nodeIn.getBoundingClientRect().width/4}px`; // position relative to e.target element
        modal.style.top = `${nodeIn.getBoundingClientRect().y - nodeIn.getBoundingClientRect().height/mode}px`; // position relative to e.target element
        nodeIn.setAttribute("modal", "true");
    });
    nodeIn.addEventListener('mouseout', () => {
        nodeIn.removeAttribute('modal');
        (Array.from(tableLow.children).includes(modal)) ? tableLow.removeChild(modal) : 0;
    });
}
const levelUpdate = (levelCounter) => {
    table.innerHTML = ''; 
    
    localStorage.setItem(`lastLevelUser`, levelCounter); 
    let currentLevel = levelsObject.levels[levelCounter - 1];
    
    
    let prevNode = table;
    
    levelTitle.innerHTML = `Level ${levelCounter} of ${levelsObject.levels.length}`;
    levelTitle.setAttribute('level', `${levelCounter}`);
    taskTitle.innerHTML = `Select ${currentLevel.select}`;
    htmlEditor.innerHTML = currentLevel.HTMLeditor;
    
    asideTitle.innerHTML = currentLevel.asideTitle;
    asideSubTitle.innerHTML = currentLevel.asideSubTitle;
    asideSelector.innerHTML = currentLevel.asideSelector;
    asideText.innerHTML = currentLevel.asideText;
    asideExamples.innerHTML = currentLevel.asideExamples;

    input.value = "";
    (currentLevel.example) ? exampleTitle.innerHTML = "Examples" : exampleTitle.innerHTML = "";


    levelDone(levelCounter);

    for(let i = 0; i < currentLevel.tags[0].length; i++){
        let surface = table;
        let pastNodeIn;
        for(let j = 0; j < currentLevel.tags.length; j++){
            if(!currentLevel.tags[j][i]) continue;

            const nodeIn = document.createElement('div');
            const nodeTags = currentLevel.tags;           
            if(j > 1){
                nodeIn.style.top = `${-j + 6}0px`;
                nodeIn.style.zIndex = `${j}`;
            }
            if(j == 0){
                if(nodeTags[j][i].includes('choosen')) nodeIn.style.animation = "anti-chooseme 1s linear infinite";
                if(nodeTags[0][i].includes("bento") || nodeTags[0][i].includes("plate") || nodeTags[0][i].includes("plate-fancy")){
                    nodeIn.classList = currentLevel.tags[j][i];
                    table.append(nodeIn);
                    surface = nodeIn;
                    modalReduce(nodeIn, 3);
                    nodeIn.style.zIndex = "2";
                    nodeIn.style.top = "0";
                    pastNodeIn = nodeIn;  
                    continue;
                }
                if(nodeTags[j][i].includes('apple') || nodeTags[j][i].includes('blueberry')) nodeIn.style.position = "relative";
                if(nodeTags[j][i].includes('for')){
                    const nodeFor = document.createElement('div');
                    nodeFor.style = "position: relative; outline: none; z-index: -1";
                    nodeIn.classList = "task__picture-for";
                    nodeIn.style = "outline: none; top: 95px; width: 70px; height: 70px;";
                    nodeIn.textContent = `${nodeTags[j][i].slice(nodeTags[j][i].indexOf(`'`) + 1, nodeTags[j][i].length - 1)}`;
                    nodeIn.style.transformOrigin = "center";
                    nodeFor.append(nodeIn);
                    table.append(nodeFor);
                    surface = nodeIn;
                    continue;
                }
                pastNodeIn = nodeIn;  
            }
            if(nodeTags[0][i].includes('for')){
                nodeIn.style.top = "-10px";
            }
            if(nodeTags[j][i].includes('bento')){
                nodeIn.style.width = "80px";
                nodeIn.style.height = "80px";
                nodeIn.style.position = "absolute";
                modalReduce(nodeIn , 2)
                nodeIn.classList = nodeTags[j][i]; 
                surface.append(nodeIn);
                continue;
            }
            (nodeTags[j][i].includes('small')) ? modalReduce(nodeIn , 0.5) : (nodeTags[j][i].includes('plate') ? modalReduce(nodeIn , 3) : modalReduce(nodeIn , 1));
            nodeIn.classList = nodeTags[j][i];   
            surface.append(nodeIn);
        } 
    }
};
levelUpdate(levelCounter);
export {levelUpdate}