// variable for later use
let cell

// create main game table
const game_table = document.createElement('table')

// set game table attributes and add eventlister that is looking for clicks. this will show then hide the questions
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

//start setting up the game table 5 deep 
for (let i = 0; i < 5; i++) {
    let rows = game_table.insertRow(i)
    rows.id = `${i + 1}r${i + 1}c` 
    
    //setting up the cells 4 wide 
    for(let y = 0; y < 4; y++) {

        cell = rows.insertCell(y)
        cell.id = `r${i + 1}c${y + 1}`
        cell.innerText = cell.id 
        cell.setAttribute('class', 'boxes')

        // creating the elements that will be "inside" each sell 
        const question = document.createElement('div')
        const question_p = document.createElement('p')
        const choices = document.createElement('div')
        const timer_container = document.createElement('div')
        const timer_bar = document.createElement('div')

        // creating the choices and options
        for(let k = 0; k < 3; k++) {
            const choices_option = document.createElement('p')
            choices_option.innerHTML = `${k}`   
            choices.setAttribute('data-choice', 'choice')
            choices_option.setAttribute('data-choice', 'option')
            choices.appendChild(choices_option)
        }

        // setting attributes for styling
        timer_bar.setAttribute('class', "timer-bar")
        timer_container.setAttribute('class', "timer-container")
        choices.setAttribute('class', "choices")
        question_p.setAttribute('class', "question-color")
        question.setAttribute('class', "questions")

        // glueing everything together 
        timer_container.appendChild(timer_bar)
        question.appendChild(question_p)    
        question.appendChild(choices)
        question.appendChild(timer_container)
        cell.appendChild(question)

    }
} document.body.appendChild(game_table) //added it all to the document body

// create and add the header section to the game table 
let headers = game_table.insertRow(0)
headers.setAttribute('class', 'headers')
for(let i = 0; i < 4; i++) {
    headers.insertCell()
}

// variables to be used in the foreach loops 
let choices = document.querySelectorAll('[data-choice="choice"]')
let cells = document.querySelectorAll('.boxes')
let test = document.querySelectorAll('.boxes')
let questions = document.querySelectorAll('.questions')
let questions_text = document.querySelectorAll('.question-color')

//set id for each question. this will be used later 
questions.forEach((element, index) => {
    element.id = `q${index + 1}`
})

// fetch json
// use info to add headers, questions, answers and wrong answers to the game table 
// add question worth to each cell 
// use foreach and for loops to iterate through different elements to set questions headers ect..
// made randomnum gen to get a random place for each question everytime you load the page 
// added if statements to check if the chosen spot was already occupuied by a differnt answer 
// do-while loop will iterate through the if statement until an empty spot has been found 
fetch('./questions.json')
    .then((response) => response.json())
    .then((info) => {
        // get and set category headers from JSON 
        for(let i = 0; i < info['headings'].length; i++) {
            headers.children[i].innerHTML = info['headings'][i]
        }
        // set question worth & set questions for each cell
        cells.forEach((element, index) => {
            element.childNodes[0].textContent = info['questions'][index].value
            element.childNodes[1].children[0].innerHTML = info['questions'][index].q
        })
        // get and set the correct answer for each question from JSON and apply the answer to a random position
        choices.forEach((element, index) => {
            let pickedOption = element.children[pickRadomElement(3)]
            pickedOption.innerHTML = info['questions'][index].a
            pickedOption.setAttribute('data-correct', 'correct')
        })
        // get and set the fist wrong answer from JSON and apply it to the next open random position
        choices.forEach((element, index) => {
            getRandomOptionSlot(element, index, 'w1', info)
        })
        // get and set the second wrong answer from JSON and apply it to the last random position
        choices.forEach((element, index) => {
            getRandomOptionSlot(element, index, 'w2', info)
        })
    })
// function to get random position for question options
function getRandomOptionSlot(element, index, option, json) {
    let pickedSlot = element.children[pickRadomElement(3)]
    let pickedValidSlot = false
    do {
        if(pickedSlot.hasAttribute('data-correct', 'correct') || pickedSlot.hasAttribute('data-correct', 'w1')) {
            pickedSlot = element.children[pickRadomElement(3)] // run function again until a spot has been found
        } else {
            pickedValidSlot = true
            pickedSlot.innerHTML = json['questions'][index][`${option}`]
            //if a question is only True/False we want to remove a third option that will be undefined
            if(pickedSlot.innerHTML === "undefined") {
                pickedSlot.remove()
            }
            pickedSlot.setAttribute('data-correct', `${option}`)
        }
    }
    while (pickedValidSlot == false)
}


//random gen function
function pickRadomElement(max) {
    return Math.floor(Math.random() * max)
}   