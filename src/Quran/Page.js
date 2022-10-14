import './Page.css';
import { Summury } from './Summury';
import { Quran } from './Quran';
export class Page
{
    async fillSourah(Sourah)
    {
        let quran = new Quran();
        if(quran.isSourah(Sourah))
        {
            let sourahArray = await quran.getSourah(Sourah)
            sourahArray.data.ayahs.forEach(ayah => {
                let ayahElement = document.createElement('p')
                ayahElement.setAttribute('class','ayah')
                let ayahSep = document.createElement('p')
                ayahSep.setAttribute('class','ayahSep')
                ayahElement.textContent = ayah.text
                ayahSep.textContent = `{${ayah.numberInSurah}}`
                this.quranSection.appendChild(ayahElement)
                this.quranSection.appendChild(ayahSep)
            })
        }
    }
    async createComboBox()
    {
        let body = document.querySelector('body'); // get the body element
        this.ComboBox = document.createElement('select') // create select element <ComboBox> to select a sourah from the page of the quran
        this.ComboBox.setAttribute('class','ComboBoxSourahs') // set class name for the combobox element

        let sourahs = await this.summury.getSummury()
        sourahs.forEach(sourah => {
            let option = document.createElement('option')
            option.setAttribute('value',sourah)
            option.textContent = sourah
            this.ComboBox.appendChild(option)
        })
        body.appendChild(this.ComboBox);

    }
    constructor(Sourah,body)
    {
        this.quran = new Quran();
        this.summury = new Summury();

        this.createComboBox();
        this.fillSourah(Sourah)

        
        this.page = document.createElement('div') // create div element <page> to contain the page of the quran
        this.page.setAttribute('class','page') // set class name for the page element


        this.quranSection = document.createElement('div') // create div element <quranSection> to contain the quran section of the page
        this.quranSection.setAttribute('class','quranSection') // set class name for the quranSection element


        this.backButton = document.createElement('button') // create button element <backButton> to go back to the summury page
        this.backButton.setAttribute('class','backButton')  // set class name for the backButton element
        this.backButton.textContent = 'Back'
        this.backButton.onclick = () => {
            while (body.firstChild) {
                body.removeChild(body.lastChild);
            }
            const summury = new Summury()
            summury.showData(body)
            
        }



        body.appendChild(this.backButton)
        this.page.appendChild(this.quranSection)
        body.appendChild(this.page)
    }
}