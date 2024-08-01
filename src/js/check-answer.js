import levelsObject from '../JSON/levels.json';

let htmlEditor = document.querySelector('#html-editor');
let input = document.querySelector('.dev__css-editor__input-1');
let btn = document.querySelector('.dev__css-editor__input-2');
let levelTitle = document.querySelector('#level-title');

let arrowR = document.querySelector('#arrow-right');

let levelCounter = levelTitle.getAttribute('level');
let htmlEditorClone = htmlEditor.cloneNode(true);
Array.from(htmlEditorClone.querySelectorAll('br , span')).map(el => el.remove());

let observer = new MutationObserver(() => {
    levelCounter = levelTitle.getAttribute('level');
    htmlEditorClone = htmlEditor.cloneNode(true);
    Array.from(htmlEditorClone.querySelectorAll('br , span')).map(el => el.remove());
});

observer.observe(levelTitle, {
    attributes: true
});

// checking answer
const answerReduce = (answer) => {
    try {
        let currentLevel = levelsObject.levels[levelCounter - 1];
        let array = Array.from(htmlEditorClone.querySelectorAll(`${answer}`));
        return (answer) ? (array
            .map((value) => value.hasAttribute('choosen')).filter(Boolean).length == currentLevel.answer 
            && !array
            .map((value) => value.hasAttribute('choosen')).includes(false)) ? true : false : 0; 
    } catch (err) {
        console.log('Error!')
        return false;
    }  
}


// getting value from input to check if it is right
btn.addEventListener("click", () => {
    let answer = input.value;
    if(answerReduce(answer)){
        localStorage.setItem(`level${levelCounter}`, 1);
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