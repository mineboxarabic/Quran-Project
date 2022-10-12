export class Quran
{

    constructor()
    {
        console.log('test')
        this.quranData = this.getQuranData();
    }
    async getQuranData()
    {
        console.log('tesfeefef')
        let url = 'http://api.alquran.cloud/v1/quran/en.asad'
        const response = await fetch(url)
        const data = await response.json()
        return data
    }
    getEditions()
    {
        return this.quranData;
    }
}