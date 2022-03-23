import './style.css'

import Experience from './Experience/Experience.js'

let journalModal = document.getElementById('journal_wrapper')

let audio = new Audio('/audio/got_so_high.mp3')
audio.currentTime = 5;

document.getElementById('close_journal').addEventListener('click', () => {
    journalModal.style.display = 'none'
    journalModal.style.opacity = 0
})

let instructionsModal = document.getElementById('instructions_wrapper') 

document.getElementById('close_instructions').addEventListener('click', () => {
    instructionsModal.style.display = 'none'
    instructionsModal.style.opacity = 0
    audio.play()
})

const experience = new Experience(document.querySelector('canvas.webgl'))