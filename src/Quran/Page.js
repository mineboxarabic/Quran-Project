import './Page.css';
import { Summury } from './Summury';
import { Quran } from './Quran';
import { SubDetails } from './SubDetail';

export class Page {

    addSep(ayaArray, i) {
        let currentPage = ayaArray[i - 1].page
        if (i < ayaArray.length) {
            if (currentPage != ayaArray[i].page) {
                let sep = document.createElement('hr')
                sep.setAttribute('class', 'sepPage')
                this.quranSection.appendChild(sep)
            }
        }
    }
    async fillSourah(Sourah) {
        let quran = new Quran();

        if (quran.isSourah(Sourah)) {
            let sourahArray = await quran.getSourah(Sourah);
            this.quranSection = document.querySelector('.quranSection')
            console.log(Sourah)
            let ayaArray = sourahArray.data.ayahs;
            let i = 0;
            //Filling the ayahs of the sourah in the page of the quran with ayahs and their number and their audio
            sourahArray.data.ayahs.forEach(ayah => {
                i++;
                this.addSep(ayaArray, i)
                sourahArray.data.ayahs[0].text = sourahArray.data.ayahs[0].text.replace("بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", " ")


                
                let ayahElement = document.createElement('p')
                ayahElement.onclick = async function () {
                    if (document.querySelector('.detailSection') != null) {
                        document.querySelector('.detailSection').remove()
                    }
                    console.log('test')
                    let audioAyahUrl = await fetch(`https://api.quran.com/api/v4/recitations/10/by_ayah/${ayah.number}`)
                    let audioAyahData = await audioAyahUrl.json()

                    
                    let sub = new SubDetails(ayah.number)

                    console.log(audioAyahData.audio_files[0].url)
                    //Adding the audio and playing it
                    function stopAudio() {
                        let audio = document.querySelector('audio')
                        if (audio != null) {
                            audio.pause()
                            audio.remove()
                        }
                    }
                    stopAudio()
                    let audio = document.createElement('audio')
                    audio.src = `https://verses.quran.com/${audioAyahData.audio_files[0].url}`
                    document.querySelector('body').appendChild(audio)
                    audio.play()
                }
                ayahElement.setAttribute('class', 'ayah')
                let ayahSep = document.createElement('p')
                ayahSep.setAttribute('class', 'ayahSep')
                ayahElement.textContent = ayah.text
                ayahSep.textContent = `{${ayah.numberInSurah}}`
                this.quranSection.appendChild(ayahElement)
                this.quranSection.appendChild(ayahSep)

            })
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
            //ComboBox.appendChild(option);
        })

    }
    goToSummury(body) {

        console.log('back')

    }
    constructor(Sourah, body2) {


        let body = document.querySelector('body');
        body.innerHTML += `
        <div class="page">
            <div class="topBar">
                <button type=button class="backButton">Bsack</button>
                <select class="ComboBoxSourahs"></select>
            </div>
            <div class = "downBar">
                <div class="quranSection">
                    <h1 class = headerBSM>g</h1>
                </div>
            </div>
            
        </div>
        `

        document.querySelector("button").onclick = () => {
            while (body.firstChild) {
                body.removeChild(body.lastChild);
            }
            const summury = new Summury()
            summury.showData('')
        }
        this.createComboBox();
        this.fillSourah(Sourah);

        this.quran = new Quran();
    }
}