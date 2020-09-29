/* globals fetch */
const url = 'http://localhost:3000/notes'

document.addEventListener('submit', function (event) {
    event.preventDefault()
    const notesInput = document.querySelector('#notes-input').value
    console.log(notesInput)

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify ({ notesInput })
    })
})   
    .then(res => res.json())
    .then(data => {
    const notesList = document.querySelector('.notes-list')
    const notesItemEl = document.createElement('li')
    notesItemEl.innerText = data.notesItem
    notesList.appendChild(notesItemEl)
    })  

fetch(url)
.then(res => res.json)
.then(notesData => {
    const notesList = document.querySelector('#notes-list')
    const notesEl = notesList.appendchild(document.createElement('ul'))
    
    for (const item of notesData) {
    console.log(item)
    const notesItemEl = document.createElement('li')
    notesItemEl.innerText = item.notesItem
    notesEl.appendChild(notesItemEl)
    }
})
