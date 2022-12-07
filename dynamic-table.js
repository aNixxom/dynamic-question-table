const main_table = document.getElementById('main_table')
const main_table_body = document.createElement('tbody')
const header_tr = document.createElement("tr")
header_tr.setAttribute('class', "headers")

for (let i=0; i < 4; i++) { //create table heading
    const table_header = document.createElement('td')
    table_header.innerText = `Header ${i}`
    header_tr.appendChild(table_header)
    main_table_body.appendChild(header_tr)
}
for (let i = 0; i < 5; i++) { //create rows
    const row = document.createElement('tr')
    for(let j = 0; j < 4; j++) { // create cell
        const cell = document.createElement('td')
        const question = document.createElement('div')
        const question_p = document.createElement('p')
        const choices = document.createElement('div')
        const timer_container = document.createElement('div')
        const timer_bar = document.createElement('div')
        let cellText = document.createTextNode(`col ${j}, cel ${i}`)

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
        question.setAttribute('id', `q${j}`)
        cell.setAttribute('class', `boxes`)
            
        timer_container.appendChild(timer_bar)
        question.appendChild(question_p)    
        question.appendChild(choices)
        question.appendChild(timer_container)
        cell.appendChild(cellText)
        cell.appendChild(question)
        row.appendChild(cell)

    }

    main_table_body.appendChild(row)
}

main_table.appendChild(main_table_body)
for(let i=0; i < main_table.rows[0].cells.length; i++) {
    console.log(main_table.rows[1].cells[i].children)
}

window.addEventListener("click", function(event) {
    let main = document.getElementById("main_table")
    console.log(main.rows.length)
    const clicked_element = event.target
    let question = clicked_element.children[0]
    let choices = question.children[1]

    choices.addEventListener("click", function() {
        main.style.visibility= "visible"
        question.style.visibility = "hidden"
    })

    main.style.visibility= "hidden"
    question.style.visibility = "visible"
    question.style.top = "0px"
    question.style.right = "0px"
    question.style.left = "0px"
})