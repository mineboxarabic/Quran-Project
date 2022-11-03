//import { summuryElement } from "./SummuryElement";
import { Book } from "./Book";
import '../Styles/Summury.css';


import AyaSepartor from '../Images/AyaSepartor.png' ;
import CoverImage from '../Images/Quran_Kareem_Cover.jpg' ;
import BackGroundImage from '../Images/BackGroundImage2.png' ;



let summuryElement = function (nameSourah, numberSourah, numberAya) 
{   
  let body = document.querySelector('body');
  let elementBody = document.querySelector('template').content.cloneNode(true);
  elementBody.querySelector('.summuryElementBody').setAttribute("data-id",numberSourah);
  elementBody.querySelector('.summuryElementBody').onclick = () => {
  while (body.firstChild) {
          body.removeChild(body.lastChild);  
  }
      const book = new Book(numberSourah);
  };

  elementBody.querySelector('.numAya').textContent = numberAya;
  elementBody.querySelector('.numberSourah').textContent = numberSourah;
  elementBody.querySelector('.nameSourah').textContent = nameSourah;
  let test = elementBody.querySelector('.backSquare');
  test.style = `background-image: url(${AyaSepartor});
    background-repeat: no-repeat;
  background-size: 100% 100%;`;

  return elementBody.querySelector('a');}
export class Summury
{
    constructor()
    {
        let body = document.querySelector('body');
        body.innerHTML += `
        <template id="SourahSummuryTemp" >
        <a data-id="" class="summuryElementBody">
          <div class="backSquare">
            <h3 class="numberSourah"></h3>
          </div>
          <p class="numAya"></p>
          <h3 class="nameSourah"></h3>
        </a>
        </template>
        <div class = "bodySummury">
            <img class = "Cover">
            <div class = "topBar">
            <input class= "search" placeholder = "Search"></input>
            </div>
            <div class = "downBars">
            <div class="SourahsContainer"></div>
            </div>
        </div>
        `
        document.querySelector('.Cover').src = CoverImage;
        document.querySelector('.SourahsContainer').style = `background-image: url(${BackGroundImage})`;

        
        this.search = document.querySelector('.search')
        document.querySelector('.search').onkeyup = () => {
            let searchValue = this.search.value
            this.showData(searchValue,document.querySelector('.bodySummury'))
        }
        this.elementArray = [];
        this.fillSummury()
        
    }

    async fillSummury()
    {
        let data = await Summury.getData();
        //console.log(data)
        let i = 0;
        data.chapters.forEach(Sourah => {
            i++;
            let s = new summuryElement(`${Sourah.name_simple} | ${Sourah.name_arabic} `,(i),`Ayat ${Sourah.verses_count}`);
            this.elementArray.push(s);
            document.querySelector('.SourahsContainer').appendChild(s);
        })
    }
    async showData(searchValue)
    {      

        this.elementArray.forEach(element => {
            if(element.querySelector('.nameSourah').textContent.toLowerCase().includes(searchValue.toLowerCase()) || searchValue == '')
            {
                
                element.style.display = 'inline-block'
            }
            else
            {
                element.style.display = 'none'
            }
        })
    }
    static async getData(){
        let url = 'https://api.quran.com/api/v4/chapters?language=en'
        const response = await fetch(url)
        const data = await response.json()
        return data;
    }
    static async getSummury()
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