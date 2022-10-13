import './Page.css';
import { Summury } from './Summury';
import { Quran } from './Quran';
export class Page
{
    async fillSourah(Sourah)
    {
        const quran = new Quran()
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
    constructor(Sourah,body)
    {
        this.fillSourah(Sourah)
        this.page = document.createElement('div')
        this.page.setAttribute('class','page')
        this.quranSection = document.createElement('div')
        this.quranSection.setAttribute('class','quranSection')
        this.backButton = document.createElement('button')
        this.backButton.setAttribute('class','backButton')
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