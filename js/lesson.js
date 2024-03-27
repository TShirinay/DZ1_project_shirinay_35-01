// PHONE CHECKER

const phoneInput = document.querySelector('#phone_input')
const phoneButton = document.querySelector('#phone_button')
const phoneSpan = document.querySelector('#phone_sp')

const regEx = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}/

phoneButton.addEventListener('click', () => {
    if (regEx.test(phoneInput.value.trim())){
        phoneSpan.innerHTML = 'OK'
        phoneSpan.style.color = 'green'
    } else {
        phoneSpan.innerHTML = 'NOT OK'
        phoneSpan.style.color = 'red'
    }
})

// TAB SLIDER

const tabContent = document.querySelectorAll('.tab_content_block')
const tabs = document.querySelectorAll('.tab_content_item')
const tabsParent = document.querySelector('.tab_content_items')

const hideTabContent = () => {
    tabContent.forEach((content) => {
        content.style.display = 'none'
    })
    tabs.forEach((tab) => {
        tab.classList.remove('tab_content_item_active')
    })
}

const showTabContent = (index = 0) => {
    tabContent[index].style.display = 'block'
    tabs[index].classList.add('tab_content_item_active')
}

hideTabContent()
showTabContent()


tabsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')){
        tabs.forEach((tab, tabIndex) => {
            if (event.target === tab){
                hideTabContent()
                showTabContent(tabIndex)
            }
        })
    }
}
const showSlider = (i = 0) => {
    setInterval(()=> {
        i++
        if (i > tabContent.length - 1){
            i = 0
        }
        hideTabContent()
        showTabContent(i)
    },3000)
}
showSlider()


// CONVERTER

const usdInput = document.querySelector('#usd')
const somInput = document.querySelector('#som')
const eurInput = document.querySelector('#eur')
const converter = (element, targetElement, targetElement2, current) => {
    element.oninput = () => {
        const request = new XMLHttpRequest()
        request.open('GET', '../data/converter.json')
        request.setRequestHeader('content-type', 'application/json')
        request.send()

        request.onload = () => {
            const data = JSON.parse(request.response)

            switch (current) {
                case 'som':
                    targetElement.value = (element.value / data.usd).toFixed(2)
                    targetElement2.value = (element.value / data.eur).toFixed(2)
                    break
                case 'usd':
                    targetElement.value = (element.value / data.usd).toFixed(2)
                    targetElement2.value = (element.value *  data.eur / data.usd).toFixed(2)
                    break
                case 'eur':
                    targetElement.value = (element.value * data.eur).toFixed(2)
                    targetElement2.value = (element.value * (data.usd / data.eur)).toFixed(2)
                default:
                    break
            }

            element.value === '' && (targetElement.value = '')
            if(element.value === '' || targetElement.value ==='') {
                targetElement.value = ''
                targetElement2.value = ''
            }

        }
    }
}

converter(somInput,usdInput,eurInput, 'som')
converter(usdInput,somInput,eurInput, 'usd')
converter(eurInput,somInput,usdInput,'eur')

//card switcher

const cardBlock = document.querySelector('.card')
const btnPrev = document.querySelector('#btn-prev')
const btnNext = document.querySelector('#btn-next')

let count = 1

const cardRequest = (num) =>{
    fetch(`https://jsonplaceholder.typicode.com/todos/${num}`)
        .then(response => response.json())
        .then(data => {
            cardBlock.innerHTML = `
                <p>${data.title}</p>
                <p style="color: ${data.completed ? 'green' : 'red'}">${data.completed}.</p>
                <span>${data.id}</span>
            `
        })
}
cardRequest(count)

btnNext.onclick = () => {
    count++
    if (count > 200) {
        count = 1
    }
    cardRequest(count)
}

btnPrev.onclick = () => {
    count --
    if (count < 1){
        count = 200
    }
    cardRequest(count)
}

fetch('https://jsonplaceholder.typicode.com/posts')
.then(request => request.json())
.then(data => {
    console.log(data)
})