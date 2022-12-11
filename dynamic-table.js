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
        question_clicked.style.visibility = "visible"
        question_clicked.style.right = "0px"
        question_clicked.style.left = "0px"
        question_clicked.style.top = "0px"
        setTimeout(function() {
            question_clicked.style.visibility = "hidden"
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
    let headercells = headers.insertCell()
}


// variables to be used in the foreach loops 
let choices = document.querySelectorAll('[data-choice="choice"]')
let cells = document.querySelectorAll('.boxes')
let questions = document.querySelectorAll('.questions')
let questions_text = document.querySelectorAll('.question-color')

//set id for each question. this will be used later 
questions.forEach((element, index) => {
    element.id = `q${index + 1}`
})


// fetch json
// use info to add headers, questions, answers and wrong answers to the game table 
// use foreach and for loops to iterate through different elements to set questions headers ect..
// made randomnum gen to get a random place for each question everytime you load the page 
// added if statements to check if the chosen spot was already occupuied my a differnt answer 
// do-while loop will iterate through the if statement until an empty spot has been found 
// TODO: add question worth to table cell. (I have no idea how I would do that)   

fetch('./questions.json')
    .then((response) => response.json())
    .then((info) => {
        // get and set category headers from JSON 
        for(let i = 0; i < info['headings'].length; i++) {
            headers.children[i].innerHTML = info['headings'][i]
        }
        // set question worth for each question
        cells.forEach((element, index) => {
            element.childNodes[0].textContent = info['question worth'][index]
        })
        // get and set questions from JSON 
        questions_text.forEach((element, index) => {
            element.innerText = info['questions'][index].q
        })
        // get and set the correct answer for each question from JSON and apply the anser to a random position
        choices.forEach((element, index) => {
            let pickedOption = element.children[pickRadomElement(3)]
            pickedOption.innerHTML = info['choices'][index].a
            pickedOption.setAttribute('data-correct', 'correct')
        })
        // get and set the fist wrong answer from JSON and apply it to the next open random position
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
        // get and set the second wrong answer from JSON and apply it to the last random position
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

//random gen function
function pickRadomElement(max) {
    return Math.floor(Math.random() * max)
} 