import pageBackground from '../Images/pageBackground.png'
import Background from '../Images/BackGroundImage2.png'
import smallAyaBackground from '../Images/smallAyaBackground.png'
import BSMBackGround from '../Images/BSMBackGround.png'
export class Page
{
    static showPage(num)
    {
        let number = num;
        let pages = document.querySelectorAll('.pageQ');
        pages.forEach(page => 
            {
            if(page.classList[1] == 'pageInQuran' + number)
                page.style.display = 'block';
            else
                page.style.display = 'none';
        })
        //this.current_Page = number;
    }
    turnPageRight()
    {
        if((this.current_Page + 1) > 0 && (this.current_Page + 1) <= this.lastPageNum)
        {
            let nextPage = this.quranSection.querySelector('#page' + (this.current_Page + 1));
            let lastPage = this.quranSection.querySelector('#page' + (this.current_Page));
            lastPage.style.display = 'none';
            nextPage.style.display = 'block';
            this.current_Page += 1;
        }
        return this.current_Page;
    }
    turnPageLeft()
    {
        if((this.current_Page - 1) > 0 && (this.current_Page - 1) <= this.lastPageNum)
        {
            let lastPage = this.quranSection.querySelector('#page' + (this.current_Page - 1));
            let curentPage = this.quranSection.querySelector('#page' + (this.current_Page));

            curentPage.style.display = 'none';
            lastPage.style.display = 'block';
            this.current_Page -= 1;
        }

        return this.current_Page;
    }
    constructor(quranSection,pageAyahs,curentPage,id,doesPageChange,isBaqara,lastPageNum)
    {
        console.log(lastPageNum);
        this.quranSection = quranSection;
        this.lastPageNum = lastPageNum;
        this.id = id;
        this.current_Page = curentPage;
        let page = document.createElement('div');
        page.setAttribute('class', 'pageQ')
        page.setAttribute('id', 'page' + (this.id + 1))
        quranSection.appendChild(page);
        let pageNumber = document.createElement('p');
        pageNumber.setAttribute('class', 'pageNumber')

        pageAyahs.forEach(ayah => {
            pageNumber.textContent = ayah.pageNum.textContent;
            
            page.appendChild(ayah.aya)
            page.appendChild(ayah.ayaSep)
            page.classList.add('pageInQuran' + ayah.pageNum.textContent);
            if(doesPageChange || page.id == 'page'+1 && isBaqara)
            {
                page.style = `
                display: none;
                font-size: 14px;
                width: 33%;
                height: 100%;
                padding: 30% 20%;   
                background-image: url(${smallAyaBackground});
                background-size: 990px 1150px;
                background-repeat: no-repeat;
                background-position: center;
            `
            }
            else
            {
                page.style = `
                display: none;
                background-image: url(${pageBackground});
                background-size: 100% 100%;
                background-repeat: no-repeat;
                background-position: center;
                `
            } 
        })
        page.appendChild(pageNumber);
        quranSection.querySelector('#page' + 1).style.display = 'block';
        

    document.addEventListener('keydown', (e) => {
        if (e.key == 'ArrowRight') {
            this.turnPageRight();
        }
        else if (e.key == 'ArrowLeft') {
            this.turnPageLeft();
        }
    })
    document.querySelector('.next').onclick = () => 
    {
        this.turnPageRight();

    }
    document.querySelector('.prev').onclick = () => {
        this.turnPageLeft();
    }

    return page;
}
}
