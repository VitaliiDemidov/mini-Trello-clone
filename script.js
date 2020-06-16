
let noteIdCounter = 8;
let columnIdCounter = 4;

document.querySelectorAll('.column')
    .forEach(columnProcess)

document.querySelector('[data-action-addColumn]')
    .addEventListener('click', function (e) {
        const columnElement = document.createElement('div')
        columnElement.setAttribute('draggable', "true")
        columnElement.setAttribute('data-column-id', columnIdCounter)
        columnElement.classList.add('column')


        columnElement.innerHTML = `<p class="column-header" contenteditable="true">Future plans</p>
       <div data-notes>
       </div>
       <p class="column-footer">
           <span data-action-addNote class="action">+ Add Card</span>
       </p>`
        columnIdCounter++
        document.querySelector('.columns').append(columnElement)
        columnProcess(columnElement)
    })

function columnProcess(elem) {
    const spanAddNote = elem.querySelector('[data-action-addNote]')

    spanAddNote.addEventListener('click', function (e) {
        const noteElem = document.createElement('div')
        noteElem.classList.add('note')
        noteElem.setAttribute('draggable', 'true')
        noteElem.setAttribute('data-note-id', noteIdCounter)
        noteIdCounter++

        elem.querySelector('[data-notes]').append(noteElem)

    })
}