const game_table = document.createElement('table')
let cell
game_table.setAttribute('style', "1px solid red")

for (let i = 0; i < 4; i++) {
    let rows = game_table.insertRow(i)

    for(let y = 0; y < 5; i++) {
        cell = rows.insertCell(y)
        cell.id = `r${i}c${y}`
        cell.setAttribute('class', 'box')
    }
}

document.body.appendChild(game_table)