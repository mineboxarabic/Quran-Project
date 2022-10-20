import './subDetail.css';
import { Quran } from './Quran';
export class subDetails 
{
    async fillDetailSection(aya)
    {
        let data = await Quran.getTranslationAyah(aya);
        console.log(data)
        let ayaTranslation = data.data[2].text
        console.log(ayaTranslation)
        this.detailSection.innerHTML = `
        <p class = "ayaTranslation">${ayaTranslation}</p>
        `
    }
    constructor(aya)
    {
        this.detailSection = document.createElement('div')
        this.detailSection.setAttribute('class','detailSection')


        this.removeDetailSection = document.createElement('button')
        this.removeDetailSection.setAttribute('class','removeDetailSection')
        this.removeDetailSection.textContent = 'X'
        this.removeDetailSection.onclick = () => {
            this.detailSection.remove()
        }
        this.detailSection.appendChild(this.removeDetailSection)
        
        let body = document.querySelector('body')
        body.insertBefore(this.detailSection,document.querySelector('.page'))
        this.fillDetailSection(aya)
    }

}
