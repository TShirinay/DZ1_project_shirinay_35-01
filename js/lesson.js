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

// DRY - don`t repeat yourself
// KISS - keep it simple, stupid
