import '../Styles/Page.css';
import { Summury } from './Summury';
import { Quran } from './Quran';
import { Ayah } from './Ayah';
import interact from 'interactjs'
import pageBackground from '../Images/pageBackground.png'
import Background from '../Images/BackGroundImage2.png'
import smallAyaBackground from '../Images/smallAyaBackground.png'
let Ayahs = [];
let pages = [];
let quranPages = [];
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
                let aya = document.getElementById(i)
                console.log(aya)
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
export class Page
{
    static async fillSourah(Sourah) {
        let quran = new Quran();
        if (quran.isSourah(Sourah)) {
            let sourahArray = await quran.getSourah(Sourah);
            this.quranSection = document.querySelector('.quranSection')
            this.quranSection.innerHTML += '<h1 class = headerBSM>g</h1>'
            sourahArray.data.ayahs[0].text = sourahArray.data.ayahs[0].text.replace("بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", " ")
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
            Ayahs.forEach(ayah => 
                {
                let currentPage = parseInt(ayah.pageNum.textContent);
                tempAyahs.push(ayah);
                if(currentPage != lastPage || ayah.ayaSep.textContent == `{${Ayahs.length}}`)
                {
                    pages.push(tempAyahs);
                    tempAyahs = [];
                }
                lastPage = currentPage;
            })


            for(let i = 0; i < pages.length; i++)
            {
                let doesPageChange = () =>{
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
                    if(doesPageChange() || page.id == 'page'+1 && Sourah == 2)
                    {
                        page.style = `
                        font-size: 14px;
                        width: 33%;
                        padding: 35% 20%;   
                        background-image: url(${smallAyaBackground});
                        background-size: 800px 1050px;
                        background-repeat: no-repeat;
                        background-position: center;
                    `
                    }
                    else
                    {
                        page.style = `
                        background-image: url(${pageBackground});
                        background-size: 100% 100%;
                        background-repeat: no-repeat;
                        background-position: center;
                        `
                    }

                })
                page.appendChild(pageNumber)
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
        document.querySelector('.quranSection').style = `background-image: url(${Background});`;
        document.querySelector('.downBar').style = `background-image: url(${Background});`;
        //================================================================================================
        let visibleSideBar = () => 
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
        document.querySelector(".backButton").onclick = () => {
            while (body.firstChild) {
                body.removeChild(body.lastChild);
            }
            const summury = new Summury()
            summury.showData('')
        }
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
        document.querySelector(".ShowAyaMenu").onclick = () => {
            let sideSection = document.querySelector(".goToAya");

            if (sideSection.style.display == 'none') {
                sideSection.style.display = 'flex'
            } else {
                sideSection.style.display = 'none'
            }
            visibleSideBar();
        }
        document.querySelector(".ComboBoxReader").onchange = () => {
            this.reciterName = document.querySelector(".ComboBoxReader").value;
        }

        //================================================================================================
        Page.fillSourah(Sourah);
        this.createComboBox();
        this.fillReaders();

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