import levelsObject from '../JSON/levels.json';
import { levelUpdate } from './task';

let levelTitle = document.querySelector('#level-title');

let asideCheckbox = document.querySelector('#burger-checkbox');

let topStick = document.querySelector('#top-stick');
let bottomStick = document.querySelector('#bottom-stick');
let midStick = document.querySelector('#mid-stick');

let burgerMain = document.querySelector('#burger-content');
let burgerBox = document.querySelector('#burger-box');


let levelCounter = (levelTitle.getAttribute('level')) ? levelTitle.getAttribute('level') : 1;

let observer = new MutationObserver(MutationRecord => {
    levelCounter = levelTitle.getAttribute('level');
});

observer.observe(levelTitle, {
    attributes: true
});


const burgerReduce = (boolean) => {
    if(boolean){
        bottomStick.style.transform = "rotate(-45deg)";
        bottomStick.style.width = "28px";
        topStick.style.transform = "rotate(45deg)";
        topStick.style.width = "28px";
        
        midStick.style.opacity = "0";
        burgerMain.style.right = "0px";
    } else{
        bottomStick.style.transform = "rotate(0deg)";
        bottomStick.style.width = "26px";
        topStick.style.transform = "rotate(0deg)";
        topStick.style.width = "26px";

        midStick.style.opacity = "1";
        
        burgerMain.style.right = "-100%";
        burgerBox.innerHTML = "";
    }
    topStick.style.transformOrigin = "left";
    bottomStick.style.transformOrigin = "left";
}

asideCheckbox.addEventListener( "click" , () => {
    if(asideCheckbox.hasAttribute('active')){
        asideCheckbox.removeAttribute('active');
        burgerReduce(false);
        burgerModal()
    } else{
        asideCheckbox.setAttribute('active', 'true')
        burgerReduce(true);
        burgerModal()
    }
});

const burgerLvlCheck = (level) => { // checkbox is green when lvl is complete in aside menu
    return localStorage.getItem(`level${level}`) ? 
        "filter: brightness(0) saturate(100%) invert(39%) sepia(89%) saturate(1196%) hue-rotate(67deg) brightness(98%) contrast(101%)"
    : "filter: none";
}
const burgerModal = () => { // creating burger menu 
    if(asideCheckbox.hasAttribute('active')){
        for(let i = 0; i < levelsObject.levels.length ; i++){
            const burgerItem = document.createElement('div');
            burgerItem.className = 'level__burger-box__item';
            burgerItem.innerHTML = `<img src="./public/img/checkbox.svg" alt="" style="${burgerLvlCheck(i + 1)}"><span>${i + 1}</span>&emsp;${levelsObject.levels[i].asideSelector}`;
            if(levelCounter == i + 1){
                burgerItem.style.backgroundColor = "rgb(50, 50, 50)"; // currentlevel item bckgrnd in burger menu 
            }
            burgerItem.addEventListener('click', () => {
                levelCounter = i + 1;
                asideCheckbox.removeAttribute('active');
                burgerReduce(false); // where burgerItem is clicked, burger menu is closed 
                levelUpdate(levelCounter);
            });
            burgerBox.append(burgerItem);
        }
    } 
}


export {burgerReduce};