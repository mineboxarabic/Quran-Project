import { Summury } from './Summury';
export class Quran
{
    isSourah(Sourah){
        if(Sourah > 0 && Sourah < 115)
        {
            return true
        }
        return false;
    }
    constructor()
    {
        console.log('Quran Constucted')
    }
    static async  getTranslationAyah(aya)
    {
        let response = await fetch(`http://api.alquran.cloud/v1/ayah/${aya}/editions/quran-uthmani,en.asad,en.pickthall`).catch((error) => {
            throw new Error('Translation not Found' + error);
        });
        let data = await response.json()
        return data
    }
    async getSourah(Sourah)
    {
        if(this.isSourah(Sourah))
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
                throw new Error('Please Enter the number of the Sourah')
            }
        }else
        {
            throw new Error('Sourah is not Found')
        }
    }
    static async getReaders()
    {
        let url = 'https://api.quran.com/api/v4/resources/recitations?language=en'
        const response = await fetch(url).catch((error) => {
            throw new Error('Readers not Found Or could not be fetched ' + error);
        })
        const data = await response.json()
        return data
    }
}