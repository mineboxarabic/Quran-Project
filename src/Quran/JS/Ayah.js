import { SubDetails } from "./SubDetail"
let Audio = async (numberOfAyah) =>
{
    let Reader = document.querySelector(".ComboBoxReader").value;
    function stopAudio() {
        let audio = document.querySelector('audio')
        if (audio != null) {
            audio.pause()
            audio.remove()
        }
    }
    async function getAudioData()
    {
        let audioAyahUrl = await fetch(`https://api.quran.com/api/v4/recitations/${Reader}/by_ayah/${numberOfAyah}`).catch((error) => {
            throw new Error('Audio not Found ' + error);
        })
        let audioAyahData = await audioAyahUrl.json()
        return audioAyahData;

    }
    async function playSound()
    {
        let audioAyahData = await getAudioData();
        let audio = document.createElement('audio')
        if(audioAyahData.audio_files[0].url.includes('//mirrors') == true)
        {
            audio.src = `${audioAyahData.audio_files[0].url}`
        }
        else
        {
            audio.src = `https://verses.quran.com/${audioAyahData.audio_files[0].url}`
            console.log(audio.src)
        }
        stopAudio()
        document.querySelector('body').appendChild(audio)
        audio.play()
    }

    playSound();

}
export class Ayah
{
    static idCounter = 0;
    async playAyah(ayah) {
        let aud = Audio(ayah)
        new SubDetails(ayah)
    }
    appendChildren(body)
    {
        body.appendChild(this.Aya)
        body.appendChild(this.AyaSep);
    }
    static async getPageNum()
    {
        let pageNum = document.createElement('div');
        pageNum.textContent = page;
        return pageNum;
    }
    constructor(numInQuran, ayaNumberInSourah , text, page)
    {
        this.ayaNumberInSourah = ayaNumberInSourah;
        this.numInQuran = numInQuran;
        this.text = text;
        this.pageNum = page;
        
        let aya = document.createElement('p')
        

        aya.setAttribute('class', 'ayah');
        aya.setAttribute('id', ayaNumberInSourah);
        aya.textContent = text;
        aya.onclick = () => {
            this.playAyah(this.numInQuran);
            let sub = new SubDetails(numInQuran)
        }

        let ayaSep = document.createElement('p');
        ayaSep.setAttribute('class', 'ayahSep');
        ayaSep.textContent = `{${ayaNumberInSourah}}`;


        this.Aya = aya;
        this.AyaSep = ayaSep;


        let pageNum = document.createElement('div');
        pageNum.textContent = page;



        return {aya, ayaSep, pageNum};
    }
}