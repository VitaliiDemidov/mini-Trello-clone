
let columnIdCounter = 4;

document.querySelectorAll('.column')
    .forEach(columnProcess)

document.querySelector('[data-action-addColumn]')
    .addEventListener('click', function (e) {
        const columnElement = document.createElement('div')
        columnElement.setAttribute('draggable', true)
        columnElement.setAttribute('data-column-id', columnIdCounter)
        columnElement.classList.add('column')


        columnElement.innerHTML = `<p class="column-header">Future plans</p>
       <div data-notes>
       </div>
       <p class="column-footer">
           <span data-action-addNote class="action">+ Add Card</span>
       </p>`
        columnIdCounter++
        document.querySelector('.columns').append(columnElement)
        columnProcess(columnElement)
    })

document.querySelectorAll('.note')
    .forEach(Note.process)

function columnProcess(elem) {
    const spanAddNote = elem.querySelector('[data-action-addNote]')

    spanAddNote.addEventListener('click', function (e) {
        const noteElem = document.createElement('div')
        noteElem.classList.add('note')
        noteElem.setAttribute('draggable', true)
        noteElem.setAttribute('data-note-id', Note.idCounter)

        Note.idCounter++

        elem.querySelector('[data-notes]').append(noteElem)
        Note.process(noteElem)
        noteElem.setAttribute('contenteditable', true)
        noteElem.focus()


    })
    const headerEl = elem.querySelector('.column-header')
    headerEl.addEventListener('dblclick', function (e) {
        headerEl.setAttribute('contenteditable', true)
        headerEl.focus()
    })
    headerEl.addEventListener('blur', function (e) {
        headerEl.removeAttribute('contenteditable', true)
    })

    elem.addEventListener('dragover', function (e) {
        e.preventDefault()
    })
    elem.addEventListener('drop', function () {
        if (Note.dragged) {
            elem.querySelector('[data-notes]').append(Note.dragged)
        }
    })
}


