import { summuryElement } from "./SummuryElement";
import './Summury.css'
export class Summury
{
    constructor()
    {
        const data = this.getSummuryData();
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
    //fetch data from api https://api.quran.com/api/v4/chapters?language=en
    async getSummuryData(){
        let url = 'https://api.quran.com/api/v4/chapters?language=fr'
        const response = await fetch(url)
        const data = await response.json()
        
        return data
    }

}