import { Summury } from './Summury';
export class Quran
{
    /*async getSourahByname(name)
    {
        let sourah = this.quranData.chapters.find(sourah => sourah.name == name)
        return sourah;
    }*/
    async isSourah(Sourah){
        const summury = new Summury()
        let data = await summury.getData();
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
    async getSourah(Sourah)
    {
        let SourahRe;
        if(Sourah > 0 && Sourah < 115)
        {
            if (typeof Sourah === 'number')
            {
                SourahRe = async function()
                {
                    let url = 'http://api.alquran.cloud/v1/surah/' + Sourah + '/ar.asad'
                    const response = await fetch(url)
                    const data = await response.json()
                    console.log(data)
                    return data
                }()
            }
            else
            {
                console.log('Sourah not found')
            }
        }else
        {
            console.log('Sourah not found')
        }
        return SourahRe;
    }
    getEditions()
    {
        return this.quranData;
    }
}