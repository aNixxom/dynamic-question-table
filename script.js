let main_table = document.createElement('table')
let main_table_body = document.createElement('tbody')
let header_tr = document.createElement("tr")

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
        const cellText = document.createTextNode(`cell in row ${i}, column${j}`)

        for(let k = 0; k < 3; k++) {
            const choices_option = document.createElement('p')
            choices_option.innerHTML = "t"
            choices.appendChild(choices_option)
        }

        timer_bar.setAttribute('class', "timer-bar")
        timer_container.setAttribute('class', "timer-container")
        choices.setAttribute('class', "choices")
        question_p.setAttribute('class', "question-color")
        question.setAttribute('class', "questions")
        question.setAttribute('id', `q${j}`)
        cell.setAttribute('class', `boxes q${j}`)
        
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
document.body.appendChild(main_table)
main_table.setAttribute("border", "1 solid")
main_table.setAttribute("class", "main_table")