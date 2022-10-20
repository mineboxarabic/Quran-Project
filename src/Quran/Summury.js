//import { summuryElement } from "./SummuryElement";
import { Page } from "./Page";
import './Summury.css'
let summuryElement = function (nameSourah, numberSourah, numberAya) 
{   
  let body = document.querySelector('body');
  const elementBody = document.querySelector('template').content.cloneNode(true);
  elementBody.querySelector('.summuryElementBody').setAttribute("data-id",numberSourah);
  elementBody.querySelector('.summuryElementBody').onclick = () => {
  while (body.firstChild) {
          body.removeChild(body.lastChild);  
            
  }
      const page = new Page(numberSourah,document.querySelector('body'));
  };
  elementBody.querySelector('.numAya').textContent = numberAya;
  elementBody.querySelector('.numberSourah').textContent = numberSourah;
  elementBody.querySelector('.nameSourah').textContent = nameSourah;
  return elementBody;
} 
export class Summury
{
    constructor()
    {

        let body = document.querySelector('body');
    
        this.elementArray = [];
        this.search = document.createElement('input')
        this.search.setAttribute('class','search')
        this.search.setAttribute('placeholder','Search')
        this.search.onkeyup = () => 
        {
            let searchValue = this.search.value
            this.showData(searchValue,document.querySelector('.bodySummury'))
        }
        this.bodySummury = document.createElement('div');
        this.bodySummury.setAttribute("class","bodySummury");
        this.bodySummury.innerHTML += `
        <template id="SourahSummuryTemp" >
        <a data-id="" class="summuryElementBody">
          <div class="backSquare">
            <h3 class="numberSourah"></h3>
          </div>
          <p class="numAya"></p>
          <h3 class="nameSourah"></h3>
        </a>
      </template>
        `
        body.appendChild(this.search)
        body.appendChild(this.bodySummury);
        
    }
    async getData(){
        let url = 'https://api.quran.com/api/v4/chapters?language=en'
        const response = await fetch(url)
        const data = await response.json()
        return data;
    }
    async fillSummury()
    {
        let data = await this.getData();
        let i = 0;
        data.chapters.forEach(Sourah => {
            i++;
            let s = new summuryElement(Sourah.name_simple,(i),`Ayat ${Sourah.verses_count}`);
            this.elementArray.push(s);
        })
        return this.elementArray
    }
    async showData(searchValue,body)
    {   
        let array =await this.fillSummury();
        array.forEach(element => {
            if(element.querySelector('.nameSourah').textContent.includes(searchValue) ||searchValue == '')
            {
                if(body.contains(element))
                {
                    element.remove()
                }else
                {
                    //console.log(element.querySelector('.nameSourah').textContent)
                    body.appendChild(element)
                    
                }

            }
            else
            {
                element.remove()
            }
        })
    }
    /*async showData(body)
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
    }*/
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