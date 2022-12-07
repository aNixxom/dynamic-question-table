let cell
const game_table = document.createElement('table')

game_table.setAttribute('id', 'main_table')
game_table.setAttribute('class', 'main_table')

for (let i = 0; i < 6; i++) {
    let rows = game_table.insertRow(i)
    rows.id = `${i}r${i}c`
    
    for(let y = 0; y < 4; y++) {

        cell = rows.insertCell(y)
        cell.id = `r${i}c${y}`
        cell.innerText = cell.id
        cell.setAttribute('class', 'boxes')

        const question = document.createElement('div')
        const question_p = document.createElement('p')
        const choices = document.createElement('div')
        const timer_container = document.createElement('div')
        const timer_bar = document.createElement('div')

        for(let k = 0; k < 4; k++) { // choices 
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

        timer_container.appendChild(timer_bar)
        question.appendChild(question_p)    
        question.appendChild(choices)
        question.appendChild(timer_container)
        cell.appendChild(question)

    }
} document.body.appendChild(game_table)

let header = document.getElementById('0r0c')
header.setAttribute('class', 'headers')

for (let i = 0; i < header.children.length; i++) {
    header.children[i].removeAttribute('class', 'boxes')
}