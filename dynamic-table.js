let cell
const game_table = document.createElement('table')
let correctAnswersList = []

game_table.setAttribute('id', 'main_table')
game_table.setAttribute('class', 'main_table')
game_table.addEventListener('click', function(e) {
    let question_clicked = e.target.children[0]
    question_clicked.style.visibility = "visible"
    question_clicked.style.right = "0px"
    question_clicked.style.left = "0px"
    question_clicked.style.top = "0px"
    setTimeout(function() {
        question_clicked.style.visibility = "hidden"
    }, 6000)
})

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

        for(let k = 0; k < 3; k++) {
            const choices_option = document.createElement('p')
            choices_option.innerHTML = `${k}`   
            choices.setAttribute('data-choice', 'choice')
            choices_option.setAttribute('data-choice', 'option')
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

let choices = document.querySelectorAll('[data-choice="choice"]')
let questions = document.querySelectorAll('.questions')
let questions_text = document.querySelectorAll('.question-color')
questions.forEach((element, index) => {
    element.id = `q${index + 1}`
})

fetch('./questions.json')
    .then((response) => response.json())
    .then((info) => {
        for(let i = 0; i < info['headings'].length; i++) {
            headers.children[i].innerHTML = info['headings'][i]
        }
        questions_text.forEach((element, index) => {
            element.innerText = info['questions'][index].q
        })
        choices.forEach((element, index) => {
            let pickedOption = element.children[pickRadomElement(3)]
            pickedOption.innerHTML = info['choices'][index].a
            pickedOption.setAttribute('data-correct', 'correct')
        })
        choices.forEach((element, index) => {
            let pickedOption = element.children[pickRadomElement(3)]
            let pickedFistWrong = false
            do {
                if(pickedOption.hasAttribute('data-correct', 'correct')) {
                    pickedOption = element.children[pickRadomElement(3)]
                } else {
                    pickedFistWrong = true 
                    pickedOption.innerHTML = info['choices'][index].w1
                    pickedOption.setAttribute('data-correct', 'w1')
                }
            }
            while (pickedFistWrong == false)
        })
        choices.forEach((element, index) => {
            let pickedOption = element.children[pickRadomElement(3)]
            let pickedFistWrong = false
            do {
                if(pickedOption.hasAttribute('data-correct', 'correct') || pickedOption.hasAttribute('data-correct', 'w1')) {
                    pickedOption = element.children[pickRadomElement(3)]
                } else {
                    pickedFistWrong = true 
                    pickedOption.innerHTML = info['choices'][index].w2
                    pickedOption.setAttribute('data-correct', 'w2')
                }
            }
            while (pickedFistWrong == false)
        })
    })

    
function pickRadomElement(max) {
    return Math.floor(Math.random() * max)
}