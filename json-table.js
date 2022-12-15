let cell
const game_table = document.createElement('table')
game_table.setAttribute('id', 'main_table')
game_table.setAttribute('class', 'main_table')
game_table.addEventListener('click', function(e) {
    try {
        let question_clicked = e.target.children[0]
        document.getElementById('main_table').style.visibility = "hidden"
        question_clicked.style.visibility = "visible"
        question_clicked.style.right = "0px"
        question_clicked.style.left = "0px"
        question_clicked.style.top = "0px"
        setTimeout(function() {
            question_clicked.style.visibility = "hidden"
            document.getElementById('main_table').style.visibility = "visible"
        }, 6000)
    } catch(error) {
        // Do nothing
    }
})

fetch('./questions.json')
    .then((response) => response.json())
    .then((info) => {

        let headingsLength = info['headings'].length
        let questionsLength = info['questions'].length
        
        let rowCount = info['questions'].length / info['headings'].length
        for(let z = 0; z < rowCount; z++) {
            let row = game_table.insertRow(z)

            let tosub = questionsLength - headingsLength
            console.log(questionsLength - tosub)

            for(let k = 0; k < headingsLength; k++){ 
                cell = row.insertCell(k)
                cell.setAttribute('class', 'boxes')
                cell.id = `r${z + 1}c${k + 1}`
                cell.innerText = "value"

                const question = document.createElement('div')
                const question_p = document.createElement('p')
                const choices = document.createElement('div')
                const timer_container = document.createElement('div')
                const timer_bar = document.createElement('div')

                for(let y = 0; y < 3; y++) {
                    const choices_option = document.createElement('p')
                    choices_option.innerHTML = `${y}`   
                    choices.setAttribute('data-choice', 'choice')
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
        }

        let cells = document.querySelectorAll('.boxes')
        let choices = document.querySelectorAll('[data-choice="choice"]')

        cells.forEach((element, index) => {
            try {
                element.childNodes[0].textContent = info['questions'][index].value
                element.childNodes[1].children[0].innerHTML = info['questions'][index]['question']
            } catch (error){
                if(element.childNodes[0].textContent === "value") {
                    element.remove()
                }
            }



        })

        choices.forEach((element, index) => {
            getRandomOptionSlot(element, index, 'answer', info)
            getRandomOptionSlot(element, index, 'wrong_1', info)
            getRandomOptionSlot(element, index, 'wrong_2', info)
        })

        let headers = game_table.insertRow(0)
        for(let i = 0; i < info['headings'].length; i++) {
            headers.insertCell()
            headers.setAttribute('class', 'headers')
            headers.children[i].innerHTML = info['headings'][i]
        } 
    })

document.body.appendChild(game_table)

function getRandomOptionSlot(element, index, option, json) {
    let pickedSlot = element.children[pickRadomElement(3)]
    let pickedValidSlot = false
    do {
        if(pickedSlot.hasAttribute('data-choices', 'correct') || pickedSlot.hasAttribute('data-choices', 'wrong_1')) {
            pickedSlot = element.children[pickRadomElement(3)]
        } else {
            pickedValidSlot = true
            pickedSlot.innerHTML = json['questions'][index][`${option}`]
            if(pickedSlot.innerHTML === "undefined") {
                pickedSlot.remove()
            }
            pickedSlot.setAttribute('data-choices', `${option}`)
        }
    }
    while (pickedValidSlot == false)
}

function pickRadomElement(max) {
    return Math.floor(Math.random() * max)
}   