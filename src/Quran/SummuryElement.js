import { Quran } from "./Quran";
import { Page } from "./Page";
export class summuryElement 
{   static numberSourah = 0;
    clicked(id)
    {
        let body = document.querySelector('body');
        while (body.firstChild) {
            body.removeChild(body.lastChild);
        }
        const page = new Page(id,document.querySelector('body'));

    }
    constructor(nameSourah,numberSourah,numberAya)
    {
        
        this.elementBody = document.createElement('a');
        this.elementBody.setAttribute("class","summuryElementBody");
        this.elementBody.setAttribute("data-id",numberSourah);
        this.elementBody.onclick = () => this.clicked(numberSourah-1);

        
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
} 