import { Quran } from "./Quran";
import { Page } from "./Page";
export let summuryElement = function (nameSourah, numberSourah, numberAya) {   
        let nameSou = nameSourah;
        this.elementBody = document.createElement('a');
        this.elementBody.setAttribute("class","summuryElementBody");
        this.elementBody.setAttribute("data-id",numberSourah);
        this.elementBody.onclick = () => {
            let body = document.querySelector('body');
            while (body.firstChild) {
                body.removeChild(body.lastChild);
            }
            const page = new Page(numberSourah - 1,document.querySelector('body'));
    
        };
        this.numAyaH = document.createElement('p');
        this.numAyaH.setAttribute("class","numAya");
        this.numberSourahH = document.createElement('h3');
        this.numberSourahH.setAttribute("class","numberSourah");
        this.nameSourahH = document.createElement('h3');
        this.nameSourahH.setAttribute("class","nameSourah");
        this.backSquare = document.createElement('div');
        this.backSquare.setAttribute("class","backSquare");
        this.backSquare.appendChild(this.numberSourahH);
        this.numAyaH.textContent = numberAya;
        this.numberSourahH.textContent = numberSourah;
        this.nameSourahH.textContent = nameSourah;
        this.elementBody.appendChild(this.backSquare);
        this.elementBody.appendChild(this.numAyaH);
        this.elementBody.appendChild(this.nameSourahH);
        numberSourah++;

        return this.elementBody;

} 