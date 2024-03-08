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
const moveLeftChildBlock = () => {
    if (moveLeft < 450) {
        moveLeft += 5
        childBlock.style.left = `${moveLeft}px`
        requestAnimationFrame(moveLeftChildBlock)
    }
}
moveLeftChildBlock()
