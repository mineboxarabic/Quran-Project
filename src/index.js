import { summuryElement } from './Quran/SummuryElement.js'
import { Quran } from './Quran/Quran.js'
import { Summury } from './Quran/Summury.js'
import './style.css'

let body = document.querySelector('body');
const summury = new Summury(body)
//console.log(summury.getSummuryData())