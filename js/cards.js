const URL = 'https://jsonplaceholder.typicode.com/posts'

const cards = document.querySelector('.cards')
const cardsFetch = async (url) => {
    try {
        const cardsRequest = await fetch(url)
        const data = await cardsRequest.json()
        data.forEach (men => {
            const person = document.createElement('div')
            person.classList.add('card')
            person.innerHTML = `
                <div class="cards_person">
                <div class="cards_image"><img src="https://vetson.ru/upload/iblock/1bd/c73x437pcxc6afyjij70rduo6rw7g0rh.png" alt="#"></div>
                <h2>${men.title}</h2>
                <p>${men.body}</p>
</div>
            `
            cards.append(person)
        })
    } catch (error) {
        console.error(error)
    }
}
cardsFetch(URL)