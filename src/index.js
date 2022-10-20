import { Summury } from './Quran/Summury.js'
import { Page } from './Quran/Page.js'
import './style.css'

let body = document.querySelector('body');
const summury = new Summury()
summury.showData('',document.querySelector('.bodySummury'))
