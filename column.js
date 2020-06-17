const Column = {
    idCounter: 4,
    dragged: null,
    droped: null,

    create(id = null) {
        const columnElement = document.createElement('div')
        columnElement.setAttribute('draggable', true)

        if (id) {
            columnElement.setAttribute('data-column-id', id)
        } else {
            columnElement.setAttribute('data-column-id', Column.idCounter)
            Column.idCounter++
        }

        columnElement.classList.add('column')
        columnElement.innerHTML = `<p class="column-header">Future plans</p>
       <div data-notes>
       </div>
       <p class="column-footer">
           <span data-action-addNote class="action">+ Add Card</span>
       </p>`
        Column.process(columnElement)
        return columnElement
    },

    process(elem) {
        const spanAddNote = elem.querySelector('[data-action-addNote]')

        spanAddNote.addEventListener('click', function (e) {
            const noteElem = Note.create()

            elem.querySelector('[data-notes]').append(noteElem)

            noteElem.setAttribute('contenteditable', true)
            noteElem.focus()
            Application.save()

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

        elem.addEventListener('dragstart', Column.dragstart)
        elem.addEventListener('dragend', Column.dragend)
        elem.addEventListener('dragover', Column.dragover)
        elem.addEventListener('drop', Column.drop)
    },
    dragstart(e) {
        e.stopPropagation()
        Column.dragged = this
        this.classList.add('dragged')

    },
    dragend(e) {
        Column.dragged = null
        Column.droped = null
        this.classList.remove('dragged')
        Application.save()
    },

    dragover(e) {
        e.preventDefault()
        if (Column.dragged === this) {
            if (Column.droped) {
                Column.droped.classList.remove('under')
            }
            Column.droped = null
        }
        if (!Column.dragged || this === Column.dragged) {
            return
        }
        Column.droped = this
        document.querySelectorAll('.column')
            .forEach(noteElement => noteElement.classList.remove('under'))
        this.classList.add('under')
    },

    drop(e) {
        e.stopPropagation()
        if (!Column.dragged || this === Column.dragged) {
            return
        }
        const column = Array.from(document.querySelector('.columns').children)
        const indexA = column.indexOf(this)
        const indexB = column.indexOf(Column.dragged)
        if (indexA < indexB) {
            document.querySelector('.columns').insertBefore(Column.dragged, this)
        } else {
            document.querySelector('.columns').insertBefore(Column.dragged, this.nextElementSibling)
        }
        document.querySelectorAll('.column')
            .forEach(noteElement => noteElement.classList.remove('under'))
    }

}




