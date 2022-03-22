import './style.css'

import Experience from './Experience/Experience.js'

const experience = new Experience(document.querySelector('canvas.webgl'))

let modal = document.getElementById('journal_wrapper')

document.getElementById('close_journal').addEventListener('click', () => {
    modal.style.display = 'none'
    modal.style.opacity = 0
})