fetch('./questions.json')
    .then((response) => response.json())
    .then((info) => console.log(info))
let cell
const game_table = document.createElement('table')

game_table.setAttribute('id', 'main_table')
game_table.setAttribute('class', 'main_table')

for (let i = 0; i < 5; i++) {
    let rows = game_table.insertRow(i)
    rows.id = `${i + 1}r${i + 1}c`
    
    for(let y = 0; y < 4; y++) {

        cell = rows.insertCell(y)
        cell.id = `r${i + 1}c${y + 1}`
        cell.innerText = cell.id 
        cell.setAttribute('class', 'boxes')

        const question = document.createElement('div')
        const question_p = document.createElement('p')
        const choices = document.createElement('div')
        const timer_container = document.createElement('div')
        const timer_bar = document.createElement('div')

        for(let k = 0; k < 4; k++) {
            const choices_option = document.createElement('p')
            choices_option.innerHTML = `${k}`
            choices_option.setAttribute('id', `${k}`)
            choices.appendChild(choices_option)
        }

        timer_bar.setAttribute('class', "timer-bar")
        timer_container.setAttribute('class', "timer-container")
        choices.setAttribute('class', "choices")
        question_p.setAttribute('class', "question-color")
        question.setAttribute('class', "questions")
        question.id = `${y}`

        timer_container.appendChild(timer_bar)
        question.appendChild(question_p)    
        question.appendChild(choices)
        question.appendChild(timer_container)
        cell.appendChild(question)

    }
} document.body.appendChild(game_table)

let headers = game_table.insertRow(0)
headers.setAttribute('class', 'headers')

for(let i = 0; i < 4; i++) {
    let headercells = headers.insertCell()
    headercells.innerHTML = `Header ${i + 1}`
}

let questions = document.querySelectorAll('.questions')
questions.forEach((element, index) => {
    element.id = `q${index + 1}`
})