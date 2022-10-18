import './Page.css';
import { Summury } from './Summury';
import { Quran } from './Quran';
import { subDetails } from './SubDetail';
export class Page
{
    addSep(ayaArray,i)
    {
        let currentPage = ayaArray[i - 1].page
        if(i < ayaArray.length){
            if(currentPage != ayaArray[i].page)
            {
                let sep =document.createElement('hr')
                sep.setAttribute('class','sepPage')
                this.quranSection.appendChild(sep)
            }
        }
    }
    async fillSourah(Sourah)
    {
        let quran = new Quran();

        if(quran.isSourah(Sourah))
        {
            let sourahArray = await quran.getSourah(Sourah)
            let header = document.createElement('h1')
            header.textContent = 'g'
            header.setAttribute('class','headerBSM')
            this.quranSection.appendChild(header)
            let ayaArray = sourahArray.data.ayahs;
            let i = 0;
            
            //Filling the ayahs of the sourah in the page of the quran with ayahs and their number and their audio
            sourahArray.data.ayahs.forEach(ayah => {
                i++;
                this.addSep(ayaArray,i)
                sourahArray.data.ayahs[0].text = sourahArray.data.ayahs[0].text.replace("بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"," ")
                let ayahElement = document.createElement('p')
                ayahElement.onclick = async function() {
                    if(document.querySelector('.detailSection') != null){
                        document.querySelector('.detailSection').remove()
                    }
                    let subDetail = new subDetails(ayah)
                        
                    let audioAyahUrl = await fetch(`https://api.quran.com/api/v4/recitations/3/by_ayah/${ayah.number}`)
                    let audioAyahData = await audioAyahUrl.json()
                    console.log(audioAyahData.audio_files[0].url)
                    //Adding the audio and playing it
                    function stopAudio() {
                        let audio = document.querySelector('audio')
                        if(audio != null)
                        {
                            audio.pause()
                            audio.remove()
                        }
                    }
                    
                    stopAudio();
                    let audio = document.createElement('audio')
                    audio.src = `https://verses.quran.com/${audioAyahData.audio_files[0].url}`
                    document.querySelector('body').appendChild(audio)
                    audio.play()

                }
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
            option.setAttribute('class','optionComboBox')
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
            summury.showData('',document.querySelector('.bodySummury'))
            
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