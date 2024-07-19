import { burgerMain } from "./task";
import { burgerModal } from "./task";
import { burgerBox } from "./task";
let asideCheckbox = document.querySelector('#burger-checkbox');

let topStick = document.querySelector('#top-stick');
let bottomStick = document.querySelector('#bottom-stick');
let midStick = document.querySelector('#mid-stick');



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
export {burgerReduce};