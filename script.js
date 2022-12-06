let main_table = document.getElementById('main_table')
let main_table_body = document.createElement('tbody')
let header_tr = document.createElement("tr")
let every_id = document.querySelectorAll('*[data-]')


header_tr.setAttribute('class', "headers")
for (let i=0; i < 4; i++) {
    const table_header = document.createElement('td')
    table_header.innerText = `Header ${i}`
    header_tr.appendChild(table_header)
    main_table_body.appendChild(header_tr)
}
for (let i = 0; i < 5; i++) {
    const row = document.createElement('tr')
    for(let j = 0; j < 4; j++) {
        const cell = document.createElement('td')
        const question = document.createElement('div')
        const question_p = document.createElement('p')
        const choices = document.createElement('div')
        const timer_container = document.createElement('div')
        const timer_bar = document.createElement('div')
        const cellText = document.createTextNode(`col ${j}, cel ${i}`)

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
main_table.setAttribute("border", "1 solid")
main_table.setAttribute("class", "main_table")

window.addEventListener("click", function(event) {
    let main = document.getElementById("main_table")
    const clicked_element = event.target
    let question = clicked_element.children[0]
    let choices = question.children[1]

    choices.addEventListener("click", function(event) {
        let clicked_answer = event.target
        if(clicked_answer.id.includes(question.id)) {
            main.style.visibility= "visible"
            question.style.visibility = "hidden"
        } else {
            main.style.visibility= "visible"
            question.style.visibility = "hidden"    
            console.log("failed, should have gotten " + question.id)
        }

    })

    main.style.visibility= "hidden"
    question.style.visibility = "visible"
    question.style.top = "0px"
    question.style.right = "0p"
})