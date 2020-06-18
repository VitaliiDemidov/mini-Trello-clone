class Column {
    constructor(id = null, title = 'set Title') {
        const instance = this
        this.notes = []
        const element = this.element = document.createElement('div')
        element.setAttribute('draggable', true)

        if (id) {
            element.setAttribute('data-column-id', id)
        } else {

            element.setAttribute('data-column-id', Column.idCounter)
            Column.idCounter++
        }

        element.classList.add('column')
        element.innerHTML = `<p class="column-header">Future plans</p>
       <div data-notes>
       </div>
       <p class="column-footer">
           <span data-action-addNote class="action">+ Add Card</span>
       </p>`
        const spanAddNote = element.querySelector('[data-action-addNote]')

        spanAddNote.addEventListener('click', function (e) {

            const note = new Note
            instance.add(note)

            note.element.setAttribute('contenteditable', true)
            note.element.focus()
        })
        const headerEl = element.querySelector('.column-header')
        headerEl.textContent = title
        headerEl.addEventListener('dblclick', function (e) {
            headerEl.setAttribute('contenteditable', true)
            headerEl.focus()
        })
        headerEl.addEventListener('blur', function (e) {
            headerEl.removeAttribute('contenteditable', true)
            Application.save()
        })

        element.addEventListener('dragover', function (e) {
            e.preventDefault()
        })
        element.addEventListener('drop', function () {
            if (Note.dragged) {
                element.querySelector('[data-notes]').append(Note.dragged)
            }
        })

        element.addEventListener('dragstart', this.dragstart.bind(this))
        element.addEventListener('dragend', this.dragend.bind(this))
        element.addEventListener('dragover', this.dragover.bind(this))
        element.addEventListener('drop', this.drop.bind(this))

    }

    add(...notes) {
        for (let note of notes) {
            if (!this.notes.includes(note)) {
                this.notes.push(note)
                this.element.querySelector('[data-notes]').append(note.element)

            }
        }
    }

    dragstart(e) {
        e.stopPropagation()
        Column.dragged = this.element
        this.element.classList.add('dragged')

    }
    dragend(e) {
        Column.dragged = null
        Column.droped = null
        this.element.classList.remove('dragged')
        document.querySelectorAll('.note')
            .forEach(noteElem => noteElem.setAttribute('draggable', true))

        document.querySelectorAll('.column')
            .forEach(noteElement => {
                noteElement.classList.remove('under')
            })
        Application.save()
    }
    dragover(e) {
        e.preventDefault()
        if (Column.dragged === this.element) {
            if (Column.droped) {
                Column.droped.classList.remove('under')
            }
            Column.droped = null
        }
        if (!Column.dragged || this.element === Column.dragged) {
            return
        }
        Column.droped = this.element
        document.querySelectorAll('.column')
            .forEach(noteElement => noteElement.classList.remove('under'))
        this.element.classList.add('under')
    }
    drop(e) {
        e.stopPropagation()
        if (!Column.dragged || this.element === Column.dragged) {
            return
        }
        const column = Array.from(document.querySelector('.columns').children)
        const indexA = column.indexOf(this.element)
        const indexB = column.indexOf(Column.dragged)
        if (indexA < indexB) {
            document.querySelector('.columns').insertBefore(Column.dragged, this.element)
        } else {
            document.querySelector('.columns').insertBefore(Column.dragged, this.element.nextElementSibling)
        }
        document.querySelectorAll('.column')
            .forEach(noteElement => noteElement.classList.remove('under'))
    }
}
Column.idCounter = (new Date()).getMilliseconds() + Math.floor(Math.random() * 1000)
Column.dragged = null
Column.droped = null



