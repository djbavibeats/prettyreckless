// import './style.css'

// import Experience from './Experience/Experience.js'

// console.log('hey')

// let journalModal = document.getElementById('journal_wrapper')

// let audio = new Audio('/audio/got_so_high.mp3')
// audio.currentTime = 5;

// document.getElementById('close_journal').addEventListener('click', () => {
//     journalModal.style.display = 'none'
//     journalModal.style.opacity = 0
// })

// let instructionsModal = document.getElementById('instructions_wrapper') 

// document.getElementById('close_instructions').addEventListener('click', () => {
//     instructionsModal.style.display = 'none'
//     instructionsModal.style.opacity = 0
//     audio.play()
// })

// const experience = new Experience(document.querySelector('canvas.webgl'))

// import { ApiVideoClient } from '@api.video/nodejs-client'
window.onload = function () {

    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Basic Tk81RmFTZmFBSW9xM2RqbTV0NmZ2OW1ha0E2QmVhTzhadG5reU9XYkdMNzo='
        },
        body: JSON.stringify({ttl: 0})
    }
    
    let token
    
    fetch('https://ws.api.video/upload-tokens', options)
        .then(response => response.json())
        .then(response => {
            token = response.token
            console.log(token)
        })
        .catch(err => console.error(err))
    
    const video = document.querySelector('#video')
    const startButton = document.getElementById("start")
    const stopButton = document.getElementById("stop")
    const videoLink = document.getElementById("video-link")
    
    let stream
    
    var constraints = window.constraints = {
        audio: true,
        video: true
    }
    
    navigator.mediaDevices.getUserMedia(constraints).then((s) => {
        stream = s
        video.srcObject = s
        video.play()
        startButton.disabled = false
    })
    
    document.getElementById("start").addEventListener("click", () => {
        recorder = new ApiVideoMediaRecorder(stream, {
            uploadToken: token
        })
        
        // video.play()
        recorder.start()
        
        startButton.disabled = true
        stopButton.disabled = false
    })

    document.getElementById("stop").addEventListener("click", () => {
        startButton.disabled = false
        stopButton.disabled = true
    
        recorder.stop().then(v => videoLink.innerHTML = v.assets.player)
    })
}
// const client = new ApiVideoClient({ apiKey: "" })