import { Summury } from './Summury';
export class Quran
{
    async isSourah(Sourah){
        let data = await Summury.getData();
        data.chapters.forEach(Sourah => {
            if(Sourah.id == Sourah){
                return true
            }
        })
        return false
    }
    constructor()
    {
        console.log('Quran Constucted')
        this.quranData = this.getQuranData();
    }
    async getQuranData()
    {
        let url = 'http://api.alquran.cloud/v1/quran/en.asad'
        const response = await fetch(url)
        const data = await response.json()
        return data
    }
    static async  getTranslationAyah(aya)
    {
        let response = await fetch(`http://api.alquran.cloud/v1/ayah/${aya}/editions/quran-uthmani,en.asad,en.pickthall`)
        let data = await response.json()
        return data
    }
    async getSourah(Sourah)
    {
        if(Sourah > 0 && Sourah < 115)
        {
            if (typeof Sourah === 'number')
            {
                let url = 'http://api.alquran.cloud/v1/surah/' + Sourah + '/ar.asad'
                const response = await fetch(url)
                const data = await response.json()
                return data
            }
            else
            {
                console.log('Sourah not found')
            }
        }else
        {
            console.log('Sourah not found')
        }
    }
    getEditions()
    {
        return this.quranData;
    }
}