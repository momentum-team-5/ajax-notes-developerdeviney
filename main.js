/* globals fetch moment */
const url = 'http://localhost:3000/notes'
const notesList = document.querySelector('#notes-list')

document.addEventListener('submit', function (event) {
    event.preventDefault()
    createNotes()
})

notesList.addEventListener('click', function (event) {
    if (event.target.matches('.delete')) {
    deleteNotes(event.target.parentElement.dataset.id)
    }
})

function showNotesList () {
fetch(url)
    .then(res => res.json())
    .then(notesData => {
        for (const notes of notesData) {
            showNotesItem(notes) 
        }
    })  
}

function showNotesItem (notes) {
        const notesList = document.querySelector('#notes-list')
        const notesItemEl = document.createElement('li')
        notesItemEl.dataset.id = notes.id
        notesItemEl.id = `item-${notes.id}`
        notesItemEl.innerText = notes.notesItem
        const deleteIcon = document.createElement('span')
        deleteIcon.classList.add('fas', 'fa-times', 'mar-l-xs', 'delete')
        notesItemEl.appendChild(deleteIcon)
        notesList.appendChild(notesItemEl)
}

function createNotes() {
    const notesInputField = document.querySelector('#notes-input')

    const requestData = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify ({ 
            notesItem: notesInputField.value, 
            created_at: moment().format() 
        })
    }

        fetch(url, requestData) 
            .then(res => res.json())
            .then(data => {
                notesInputField.value = ''
                showNotesItem(data)
        })
} 

function deleteNotes(notesId) {
    fetch(url + '/' + notesId, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(data => {
            const itemToRemove = document.querySelector(`#item-${notesId}`)
            itemToRemove.remove()
    })
}

showNotesList()

// const notesList = document.querySelector('#notes-list')
// const notesItemEl = document.createElement('li')
// notesItemEl.innerText = data.notesItem
// notesList.appendChild(notesItemEl)
// })  
// }