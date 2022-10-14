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
    async createComboBox(body)
    {
        this.ComboBox = document.createElement('select') // create select element <ComboBox> to select a sourah from the page of the quran
        this.ComboBox.setAttribute('class','ComboBoxSourahs') // set class name for the combobox element
        body.appendChild(this.ComboBox);
        let sourahs = await this.summury.getSummury()
        let i = 0;
        sourahs.forEach(sourah => {
            i++;
            let option = document.createElement('option');
            option.setAttribute('value',i);
            option.textContent = sourah;
            this.ComboBox.onchange = () => {
                while(this.quranSection.firstChild)
                {
                    this.quranSection.removeChild(this.quranSection.lastChild);
                }
                this.fillSourah(parseInt(this.ComboBox.value))
            }
            this.ComboBox.appendChild(option);
            
        })
    
    }
    createButton(body)
    {
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
    }
    constructor(Sourah,body)
    {
        
        this.summury = new Summury();

        this.createButton(body);
        this.createComboBox(body);
        this.fillSourah(Sourah);
        
        this.quran = new Quran();

        
        this.page = document.createElement('div') // create div element <page> to contain the page of the quran
        this.page.setAttribute('class','page') // set class name for the page element


        this.quranSection = document.createElement('div') // create div element <quranSection> to contain the quran section of the page
        this.quranSection.setAttribute('class','quranSection') // set class name for the quranSection element

        this.page.appendChild(this.quranSection)
        body.appendChild(this.page)
    }
}