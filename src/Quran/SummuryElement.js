export class summuryElement 
{
    constructor(nameSourah,numberSourah,numberAya)
    {
        console.log('test')
        this.elementBody = document.createElement('a');
        this.elementBody.setAttribute("class","summuryElementBody");


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

        return this.elementBody;
    }
} 