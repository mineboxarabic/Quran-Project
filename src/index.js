import { summuryElement } from './Quran/SummuryElement.js'
import { Quran } from './Quran/Quran.js'
import { Summury } from './Quran/Summury.js'
import { Page } from './Quran/Page.js'
import './style.css'

let body = document.querySelector('body');
const page = new Page(1,body);
//const summury = new Summury()
//summury.showData(body)
//console.log(summury.getSummuryData())