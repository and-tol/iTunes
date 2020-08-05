import "core-js/stable";
import "regenerator-runtime/runtime";

// import './styles/style.min.css'
import { audioPlayerInit } from './js/audioPlayer'
import { radioPlayerInit } from './js/radioPlayer'
import { videoPlayerInit } from './js/videoPlayer'

// Variable
const playerBtn: NodeListOf<Element> = document.querySelectorAll('.player-btn')
const playerBlock: NodeListOf<Element> = document.querySelectorAll('.player-block')
const temp: HTMLDivElement | null = document.querySelector('.temp')

const deactivationPlayer = () => {
  temp!.style.display = 'none'
  playerBtn.forEach((element) => element.classList.remove('active'));
  playerBlock.forEach((element) => element.classList.remove('active'));

  audioPlayerInit.stop();
  radioPlayerInit.stop();
  videoPlayerInit.stop();
}


// Events
playerBtn.forEach((btn: Element, i: number) => {
  btn.addEventListener('click', () => {
    deactivationPlayer()
    btn.classList.add('active')
    playerBlock[i].classList.add('active')
  })
})

audioPlayerInit()
radioPlayerInit()
videoPlayerInit()