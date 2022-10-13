import { summuryElement } from "./SummuryElement";
import './Summury.css'
export class Summury
{
    async getSummuryData(body){
        let url = 'https://api.quran.com/api/v4/chapters?language=fr'
        const response = await fetch(url)
        const data = await response.json()
        this.showData(data,body)
        /*return fetch('https://api.quran.com/api/v4/chapters?language=fr')
        .then(response => response.json())
        .then(data => data)*/
    }
    showData(data,body)
    {
        console.log(data)
        let bodySummury = document.createElement('div');
        bodySummury.setAttribute("class","bodySummury");
        let i = 0;
        data.chapters.forEach(Sourah => {
            i++;
            let s = new summuryElement(Sourah.name_simple,(i),`Ayat ${Sourah.verses_count}`);
            bodySummury.appendChild(s);
        })
        //let body = document.querySelector('body')
        body.appendChild(bodySummury)
    }
    constructor(body)
    {
       this.getSummuryData(body);
    }
    //fetch data from api https://api.quran.com/api/v4/chapters?language=en


}