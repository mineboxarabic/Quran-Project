import './subDetail.css';
import { Quran } from './Quran';

export class SubDetails{

    async fillSub()
    {
        let data = await Quran.getTranslationAyah(this.aya);
        let ayaTranslation = data.data[2].text
        console.log(ayaTranslation)
    
        let p = document.querySelector('.ayaText')
        p.textContent = ayaTranslation
    }
    constructor (aya) {
        this.aya = aya;
        let body = document.querySelector('body')
        
        if(document.querySelector('.detailSection') != null){
            document.querySelector('.detailSection').remove();
        }
        body.innerHTML += `
        <div class="detailSection">
            <button class="removeDetailSection">X</button>
            <p class="ayaText"></p>
        </div>
        `
        this.detailSection = document.querySelector('.detailSection');
        document.querySelector('.removeDetailSection').onclick = () => {
            this.detailSection.remove()
        }
    
        body.insertBefore(document.querySelector('.detailSection'), document.querySelector('.page'))
    
        
    }

}