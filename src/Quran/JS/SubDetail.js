import '../Styles/SubDetail.css';
import { Quran } from './Quran';

export class SubDetails{

    async fillSub(aya)
    {
        let data = await Quran.getTranslationAyah(aya);
        let ayaTranslation = data.data[2].text
        console.log(ayaTranslation)
    
        let p = document.querySelector('.ayaText')
        p.textContent = ayaTranslation
    }
    constructor (aya) {
        console.log('testtest')
        let body =  document.querySelector('body');

        this.detailSection = document.createElement('div')
        this.detailSection.setAttribute("class","detailSection")
        this.detailSection.innerHTML = `
        <button class="removeDetailSection">X</button>
        <p class="ayaText"></p>
        `

        this.fillSub(aya)
        let backButton = this.detailSection.querySelector('.removeDetailSection')
        backButton.onclick = function () {
            document.querySelector('.detailSection').remove()
        }
        document.querySelector('body').insertBefore(this.detailSection, document.querySelector('.page'))
    }

}