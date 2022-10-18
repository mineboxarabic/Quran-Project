import './subDetail.css';
export class subDetails 
{
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
    }
}