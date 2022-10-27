import '../Styles/Page.css';
import { Summury } from './Summury';
import { Quran } from './Quran';
import { Ayah } from './Ayah';
import interact from 'interactjs'
import pageBackground from '../Images/pageBackground.jpg'
import Background from '../Images/BackGroundImage2.png'
let Ayahs = [];
let pages = [];
function sideBar () {
    let ayahsSideBar = [];
    function fillSideSectionAya () 
    {
        let goto = document.querySelector('.goToAya')

        ayahsSideBar.forEach(ayah => {
            ayah.remove();
        })

        for(let i = 0; i < Ayahs.length; i++){
            
            let ayanum = document.createElement('p');
            ayanum.setAttribute('class', 'ayaNum')
            ayanum.textContent ='Aya ' + (i + 1);
            ayanum.onclick = () => {
                let aya = document.getElementById(i + 1)
                aya.scrollIntoView()
            }
            goto.appendChild(ayanum)
        }
    }
    async function fillSideSection() {
        let sideBar = document.querySelector(".sideSection");
        sideBar.style = `background-image: url(${Background})`;
    let sourahs = await Summury.getSummury()
    let i = 0;
    sourahs.forEach(sourah => {
        i++;
        let sourahElement = (n) => {
            let a = document.createElement('a');
            let element = document.createElement('p');
            element.setAttribute('class', 'sourahElement')
            element.textContent = sourah;
            let quranSection = document.querySelector('.quranSection')
            element.onclick = () => {
                while (document.querySelector('.quranSection').firstChild) {
                    document.querySelector('.quranSection').removeChild(document.querySelector('.quranSection').lastChild);
                }
                Page.fillSourah(n)
            }
            ayahsSideBar.push(element);
            return element;
        }
        sideBar.appendChild(sourahElement(i))
    })
    }
    fillSideSection();
    fillSideSectionAya();
    //this.fillSideSectionAya();
    
}
export class Page {
    static async fillSourah(Sourah) {
        let quran = new Quran();
        if (quran.isSourah(Sourah)) {
            let sourahArray = await quran.getSourah(Sourah);
            this.quranSection = document.querySelector('.quranSection')
            this.quranSection.innerHTML += '<h1 class = headerBSM>g</h1>'
            sourahArray.data.ayahs[0].text = sourahArray.data.ayahs[0].text.replace("بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", " ")
            let Ayahs = [];
            let pages = [];
            sourahArray.data.ayahs.forEach
            (ayah =>
            {
                Ayahs.push(new Ayah(ayah.number,ayah.numberInSurah, ayah.text, ayah.page));
            })


            let tempAyahs = [];
            for(let i = 0; i < Ayahs.length -1; i++)
            {
                let previusePage = parseInt(Ayahs[i + 1].pageNum.textContent);
                let currentPage = parseInt(Ayahs[i].pageNum.textContent);

                tempAyahs.push(Ayahs[i]);
                if (previusePage != currentPage)
                {
                    pages.push(tempAyahs);
                    tempAyahs = [];
                }
                
            }


            for(let i = 0; i < pages.length; i++)
            {
                let page = document.createElement('div');
                

                page.setAttribute('class', 'pageQ')
                page.setAttribute('id', 'page' + (i + 1))
                this.quranSection.appendChild(page)
                let pageNumber = document.createElement('p');
                pageNumber.setAttribute('class', 'pageNumber')
                pages[i].forEach(ayah => {
                    
                    pageNumber.textContent = ayah.pageNum.textContent;

                    page.appendChild(ayah.aya)
                    page.appendChild(ayah.ayaSep)
                    page.style = `
                    background-image: url(${pageBackground});
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                    background-position: center;
                    `
                })
                page.appendChild(pageNumber)
            }
        }
    }
    async createComboBox() {
        let ComboBox = document.querySelector(".ComboBoxSourahs");
        let sourahs = await Summury.getSummury()
        let i = 0;
        sourahs.forEach(sourah => {
            i++;
            let option = document.createElement('option');
            option.setAttribute('class', 'optionComboBox')
            option.setAttribute('value', i);
            option.textContent = sourah;
            ComboBox.onchange = () => {
                while (this.quranSection.firstChild) {
                    this.quranSection.removeChild(this.quranSection.lastChild);
                }
                this.fillSourah(parseInt(ComboBox.value))
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
    constructor(Sourah) {
        //================================================================================================
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
                                <input class = "searchAya"> </input>
                            </aside>
                            <aside class = "sideSection">
                                <h4> Select Sourah </h4>
                                <input class = "searchSourah"> </input>
                            </aside>
                    </div>
                    <div class = "downBar">
                        <div class="quranSection">
                        </div>
                    </div>
                </div>
        </div>
        
        `

        //================================================================================================
        document.querySelector(".backButton").onclick = () => {
            while (body.firstChild) {
                body.removeChild(body.lastChild);
            }
            const summury = new Summury()
            summury.showData('')
        }
        document.querySelector(".ShowSourahsMenu").onclick = () => {
            let sideBar = document.querySelector(".sideSection");
            if (sideBar.style.display == 'none') {
                sideBar.style.display = 'flex'
            } else {
                sideBar.style.display = 'none'
            }
        }
        document.querySelector(".ShowAyaMenu").onclick = () => {
            let sideBar = document.querySelector(".goToAya");
            if (sideBar.style.display == 'none') {
                sideBar.style.display = 'flex'
            } else {
                sideBar.style.display = 'none'
            }
        }
        document.querySelector(".ComboBoxReader").onchange = () => {
            this.reciterName = document.querySelector(".ComboBoxReader").value;
        }

        //================================================================================================
        Page.fillSourah(Sourah);
        this.createComboBox();
        //this.fillSideBar();
        this.fillReaders();
        sideBar();

        this.quran = new Quran();
        //================================================================================================
        interact('.sideSection').resizable({
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
}