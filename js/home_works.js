const gmailInput = document.querySelector('#gmail_input')
const gmailButton = document.querySelector('#gmail_button')
const gmailSpan = document.querySelector('#gmail_result')

const regEx = /^[a-zA-Z0-9._%+-]+@gmail\.com$/

gmailButton.addEventListener('click', () =>{
    if (regEx.test(gmailInput.value.trim())){
        gmailSpan.innerHTML = 'Email валиден'
        gmailSpan.style.color = 'green'
    } else {
        gmailSpan.innerHTML = 'Email не является Gmail почтой'
        gmailSpan.style.color = 'red'
    }
})


const childBlock = document.querySelector('.child_block')
const parentBlock = document.querySelector('.parent_block')

let moveLeft = 0
let moveLeft2 = 0

const maxOffsetWidth = parentBlock.offsetWidth - childBlock.offsetWidth
const maxOffsetHeight = parentBlock.offsetHeight - childBlock.offsetHeight

const moveLeftChildBlock = () => {
    if (moveLeft < maxOffsetWidth && moveLeft2 === 0) {
        moveLeft ++
        childBlock.style.left = `${moveLeft}px`
        requestAnimationFrame(moveLeftChildBlock)
    } else if (moveLeft >= maxOffsetWidth && moveLeft2 < maxOffsetHeight) {
        moveLeft2 ++
        childBlock.style.top = `${moveLeft2}px`
        requestAnimationFrame(moveLeftChildBlock)
    } else if (moveLeft2 === maxOffsetHeight && moveLeft !== 0) {
        moveLeft--
        childBlock.style.left = `${moveLeft}px`
        requestAnimationFrame(moveLeftChildBlock)
    } else if (moveLeft === 0 && moveLeft2 !== 0){
        moveLeft2 --
        childBlock.style.top = `${moveLeft2}px`
        requestAnimationFrame(moveLeftChildBlock)
    }
}
moveLeftChildBlock()

const startButton = document.querySelector('#start')
const stopButton = document.querySelector('#stop')
const resetButton = document.querySelector('#reset')
const seconds = document.querySelector('#seconds')

let count = 0
let interval;
let flag = false

const timer = () => {
    count ++
    seconds.textContent = count
}
const startTimer = () => {
    if (!flag ){
        interval = setInterval(timer, 1000)
        flag = true
    }
}
startButton.addEventListener('click', startTimer)
const stop = () => {
    clearInterval(interval)
    seconds.textContent = count
    flag = false
}
stopButton.addEventListener('click', stop)
const reset = () => {
    clearInterval(interval)
    count = 0
    seconds.textContent = count
    flag = false
}
resetButton.addEventListener('click', reset)