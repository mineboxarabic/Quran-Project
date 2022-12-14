import '../Styles/Page.css';
import { Summury } from './Summury';
import { Quran } from './Quran';
import { Ayah } from './Ayah';
import {Page} from './Page'
import interact from 'interactjs'
import pageBackground from '../Images/pageBackground.png'
import Background from '../Images/BackGroundImage2.png'
import smallAyaBackground from '../Images/smallAyaBackground.png'
import BSMBackGround from '../Images/BSMBackGround.png'
let Ayahs = [];
let pages = [];
let quranPages = [];
function clearBody(){
    let body = document.querySelector('body');
    body.innerHTML = '';
}
function clear(element)
{
    element.forEach(element => {
        element.remove();
    })
}
function sideBar () {
    let ayahsSideBar = [];
    function fillSideSectionAya () 
    {
        let sideSection = document.querySelector('.sideBar')
        var goto = sideSection.querySelector('.goToAya')
        ayahsSideBar.forEach(ayah => 
        {
            ayah.remove();
        });
        for(let i = 0; i < Ayahs.length; i++){
            let ayanum = document.createElement('option');
            ayanum.setAttribute('value', (i + 1));
            goto.appendChild(ayanum);
            ayanum.setAttribute('class', 'ayaNum')
            ayanum.textContent ='Aya ' + (i + 1);
            ayanum.onclick = () => 
            {
                let aya = document.getElementById(i + 1)
                console.log('page Sent '+ parseInt(Ayahs[i].pageNum.textContent))
                console.log(aya)
                Page.showPage(parseInt(Ayahs[i].pageNum.textContent),'right');
                aya.scrollIntoView();
                
            }
            
        }
    }
    async function fillSideSection() {
        let sideBar = document.querySelector(".sideSection");
        //sideBar.style = `background-image: url(${Background})`;
        let sourahs = await Summury.getSummury()
        let i = 0;
        sourahs.forEach(sourah => 
        {
        i++;
        let sourahElement = (n) => 
        {
            let a = document.createElement('a');
            let element = document.createElement('option');
            element.setAttribute('class', 'sourahElement')
            element.textContent = sourah;
            let quranSection = document.querySelector('.quranSection')
            element.onclick = () => {
                while (document.querySelector('.quranSection').firstChild) {
                    document.querySelector('.quranSection').removeChild(document.querySelector('.quranSection').lastChild);
                }
                Book.fillSourah(n)
            }
            ayahsSideBar.push(element);
            return element;
        }
        sideBar.appendChild(sourahElement(i))
    })
    }
    clear(document.querySelectorAll('.sourahElement'))
    clear(document.querySelectorAll('.ayaNum'))
    fillSideSection();
    fillSideSectionAya();
    let sideBar = document.querySelector(".sideBar");
    let sideSection = sideBar.querySelector(".sideSection");
    
    let goto = sideBar.querySelector('.goToAya')
    let searchBar = sideSection.querySelector('.searchSourah')
    let searchAya = goto.querySelector('.searchAya')
    searchAya.onkeyup = () => {
        let sourahs = document.querySelectorAll('.ayaNum')
        sourahs.forEach(sourah => 
            {
        if(sourah.value == parseInt(searchAya.value) || searchAya.value == '')
            {
                sourah.style.display = 'block'
            }
            else
            {
                sourah.style.display = 'none'
            }
        })
    }

    searchBar.onkeyup = () => {
        let sourahs = document.querySelectorAll('.sourahElement')
        sourahs.forEach(sourah => {
            if(sourah.textContent.toLowerCase().includes(searchBar.value.toLowerCase()) == false)
            {
                sourah.style.display = 'none'
            }
            else
            {
                sourah.style.display = 'block'
            }
        })
    }
    //this.fillSideSectionAya();
    
}
function createEvents()
{        let visibleSideBar = () => 
    {
        let sideSection = document.querySelector(".sideSection");
        if(sideSection.style.display == "none" && document.querySelector(".goToAya").style.display == "none")
        {
            document.querySelector('.sideBar').style.display = 'none';
        }
        else
        {
            document.querySelector('.sideBar').style.display = 'block';
            document.querySelector('.sideBar').style = 
            `
            display:flex;
            flex-direction: row;
            width: 20%;
            `
        }
    };
    
    document.querySelector(".ShowSourahsMenu").onclick = () => {
        let sideSection = document.querySelector(".sideSection");
        
        if (sideSection.style.display == 'none' )
        {
            sideSection.style.display = 'flex'
        } else {
            sideSection.style.display = 'none'
        }
        visibleSideBar();
    }

    document.querySelector(".ShowAyaMenu").onclick = () => 
    {
        let sideSection = document.querySelector(".goToAya");

        if (sideSection.style.display == 'none') {
            sideSection.style.display = 'flex'
        } else {
            sideSection.style.display = 'none'
        }
        visibleSideBar();
    }

    document.querySelector(".backButton").onclick = () => {
        clearBody();
        const summury = new Summury()
        summury.showData('')
    }
}
function addInteractions()
{
    interact('.sideSection').resizable({
        edges: { left: false, right: false, bottom: true, top: false },
        listeners: 
        {
            move(event) {
                let {x , y} = event.target.dataset
                x = (parseInt(x) || 0) + event.deltaRect.left
                y = (parseInt(y) || 0) + event.deltaRect.top
                Object.assign(event.target.style, {
                    width: `${event.rect.width}px`,
                    height: `${event.rect.height}px`,
                    transform: `translate(${x}px, ${y}px)`
                })
                Object.assign(event.target.dataset, {x, y})
            }
        }
    })

    interact('.goToAya').resizable({
        edges: { left: false, right: true, bottom: true, top: false },
        listeners: 
        {
            move(event) {
                let {x , y} = event.target.dataset
                x = (parseInt(x) || 0) + event.deltaRect.left
                y = (parseInt(y) || 0) + event.deltaRect.top
                Object.assign(event.target.style, {
                    width: `${event.rect.width}px`,
                    height: `${event.rect.height}px`,
                    transform: `translate(${x}px, ${y}px)`
                })
                Object.assign(event.target.dataset, {x, y})
            }
        }
    })
    interact('.sideBar')
    .resizable({
        edges: { left: false, right: true, bottom: true, top: false },
        listeners: {
        move: function (event) {
            let { x, y } = event.target.dataset

            x = (parseFloat(x) || 0) + event.deltaRect.left
            y = (parseFloat(y) || 0) + event.deltaRect.top

            Object.assign(event.target.style, {
            width: `${event.rect.width}px`,
            height: `${event.rect.height}px`,
            transform: `translate(${x}px, ${y}px)`
            })

    Object.assign(event.target.dataset, { x, y })
  }
}
})
}
export class Book
{
    constructor(Sourah) {
        //================================================================================================
        this.current_Page = 1;
        this.Sourah = Sourah
        let body = document.querySelector('body');
        body.innerHTML += `
        <div class="page">
            <div class="topBar">
                <button type=button class="backButton">Bsack</button>
                <select class="ComboBoxSourahs"></select>
                <select class="ComboBoxReader"></select>
                <button type=button class="ShowSourahsMenu">&#9776, Show Sourahs</button>
                <button type=button class="ShowAyaMenu">&#9776, Show Ayas</button>
            </div>
            <div class="downSection">
                    <div class = "sideBar">
                            <aside class="goToAya">
                                <input class = "searchAya" placeholder="Search Aya"> </input>
                            </aside>
                            <aside class = "sideSection">
                                <h4> Select Sourah </h4>
                                <input class = "searchSourah" placeholder="Search Sourah"> </input>
                            </aside>
                    </div>
                    <div class = "downBar">
                        <button class= "prev" type=button>Prev</button>
                        <div class="quranSection"></div>
                        <button class= "next" type=button>Next</button>
                    </div>
                </div>
        </div>
        `
        this.quranSection = document.querySelector('.quranSection');
        document.querySelector('.quranSection').style = `background-image: url(${Background});`;
        document.querySelector('.downBar').style = `background-image: url(${Background});`;


        document.querySelector(".ComboBoxReader").onchange = () => 
        {
            this.reciterName = document.querySelector(".ComboBoxReader").value;
        }

        createEvents();
        Book.fillSourah(Sourah);
        this.createComboBox();
        this.fillReaders();
        this.quran = new Quran();
        addInteractions();
    }
    static async fillSourah(Sourah) {
        let quran = new Quran();
        if (quran.isSourah(Sourah)) {

            let sourahArray = await quran.getSourah(Sourah);
            console.log(sourahArray);
            this.quranSection = document.querySelector('.quranSection')
            this.quranSection.innerHTML += '<strong class = headerBSM>f</strong>'
            sourahArray.data.ayahs[0].text = sourahArray.data.ayahs[0].text.replace("???????????? ?????????????? ???????????????????????? ????????????????????", " ")


            document.querySelector('.headerBSM').style = `
            background-image: url(${BSMBackGround});
            background-size: 100% 100%;
            padding: 2px 400px;
            margin-top: 20px;
            margin-bottom: 20px;
            `


            Ayahs = [];
            pages = [];
            sourahArray.data.ayahs.forEach
            (ayah =>
            {
                Ayahs.push(new Ayah(ayah.number,ayah.numberInSurah, ayah.text, ayah.page));
            })
            sideBar();
            let tempAyahs = [];
            let lastPage = parseInt(Ayahs[0].pageNum.textContent);
            for(let i = 0 ; i < Ayahs.length ; i++)
            {
                let currentPage = parseInt(Ayahs[i].pageNum.textContent);
                if(i < Ayahs.length - 1)
                    lastPage = parseInt(Ayahs[i + 1].pageNum.textContent);
                tempAyahs.push(Ayahs[i]);
                if(currentPage != lastPage || Ayahs[i].ayaSep.textContent == `{${Ayahs.length}}`)
                {
                    pages.push(tempAyahs);
                    tempAyahs = [];
                }
            }

            for(let i = 0; i < pages.length; i++)
            {
                let doesPageChange = () =>
                {
                    let pageNum = parseInt(Ayahs[0].pageNum.textContent)
                    for(let j = 0 ; j < Ayahs.length; j++)
                    {
                        if(parseInt(Ayahs[j].pageNum.textContent) != pageNum)
                        {
                            return false;
                        }
                    }
                    return true;
                }
                let page = new Page(this.quranSection,pages[i],1,i,doesPageChange(),(Sourah == 2),pages.length);
            }
            
    }
}
async createComboBox() {
    let ComboBox = document.querySelector(".ComboBoxSourahs");
    let sourahs = await Summury.getSummury()
    let i = 0;
    sourahs.forEach(sourah => 
        {
        i++;
        let option = document.createElement('option');
        option.setAttribute('class', 'optionComboBox')
        option.setAttribute('value', i);
        
        option.textContent = sourah;
        ComboBox.onchange = () => {
            this.quranSection.innerHTML = '';
            Book.fillSourah(parseInt(ComboBox.value))
        }
        ComboBox.innerHTML += option.outerHTML;
    })

}
    async fillReaders()
    {

        let readers = await Quran.getReaders();
        let readerSelect = document.querySelector('.ComboBoxReader')
        readers.recitations.forEach(reader => {
            let option = document.createElement('option');
            option.setAttribute('class', 'optionComboBox')
            option.setAttribute('value', reader.id);
            option.textContent = reader.reciter_name;
            readerSelect.appendChild(option)
        })
    }
}
