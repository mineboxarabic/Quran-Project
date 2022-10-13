import { summuryElement } from './Quran/SummuryElement.js'
import { Quran } from './Quran/Quran.js'
import { Summury } from './Quran/Summury.js'
import './style.css'
const s = new summuryElement('test',2,3)
const summury = new Summury()
let body = document.querySelector('body')
body.appendChild(s)
console.log(summury.getSummuryData())