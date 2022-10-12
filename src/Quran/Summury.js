import { summuryElement } from "./SummuryElement";
import './Summury.css'
export class Summury
{
    constructor()
    {
        let bodySummury = document.createElement('div');
        bodySummury.setAttribute("class","bodySummury");
        for(let i = 0; i < 10; i++)
        {
            let s = new summuryElement('test',i,3)
            bodySummury.appendChild(s)
        }
        let body = document.querySelector('body')
        body.appendChild(bodySummury)
    }
}