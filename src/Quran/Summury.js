import { summuryElement } from "./SummuryElement";
import './Summury.css'
export class Summury
{
    constructor()
    {
    }
    async getData(){
        let url = 'https://api.quran.com/api/v4/chapters?language=en'
        const response = await fetch(url)
        const data = await response.json()
        this.data = data;
        return data;
    }
    async showData(body)
    {
        let data = await this.getData();
        let bodySummury = document.createElement('div');
        bodySummury.setAttribute("class","bodySummury");
        let i = 0;
        data.chapters.forEach(Sourah => {
            i++;
            let s = new summuryElement(Sourah.name_simple,(i),`Ayat ${Sourah.verses_count}`);
            bodySummury.appendChild(s);
        })
        body.appendChild(bodySummury)
    }
    async getSummury()
    {
        let i = 0;
        let summuryList = [];
        let data = await this.getData();
        data.chapters.forEach(Sourah => {
            summuryList.push(Sourah.name_simple);
        })
        return summuryList
    }

    //fetch data from api https://api.quran.com/api/v4/chapters?language=en


}