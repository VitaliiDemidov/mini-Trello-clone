const Note = {
    idCounter: 8,
    dragged: null,
    process(noteEl) {
        noteEl.addEventListener('dblclick', function (e) {

            noteEl.setAttribute('contenteditable', true)
            noteEl.removeAttribute('draggable')
            noteEl.closest('.column').removeAttribute('draggable')
            noteEl.focus()
        })
        noteEl.addEventListener('blur', function (e) {
            noteEl.removeAttribute('contenteditable')
            noteEl.setAttribute('draggable', true)
            noteEl.closest('.column').setAttribute('draggable', true)

            if (!noteEl.textContent.trim().length) {
                noteEl.remove()
            }
        })

        noteEl.addEventListener('dragstart', Note.dragstart)
        noteEl.addEventListener('dragend', Note.dragend)
        noteEl.addEventListener('dragenter', Note.dragenter)
        noteEl.addEventListener('dragover', Note.dragover)
        noteEl.addEventListener('dragleave', Note.dragleave)
        noteEl.addEventListener('drop', Note.drop)
    },
    dragstart(e) {
        Note.dragged = this
        this.classList.add('dragged')
        e.stopPropagation()
    },
    dragend(e) {

        Note.dragged = null
        this.classList.remove('dragged')
        document.querySelectorAll('.note')
            .forEach(el => el.classList.remove('under'))
    },
    dragenter(e) {
        if (this === Note.dragged) {
            return
        }
        this.classList.add('under')
    },
    dragover(e) {
        e.preventDefault()
        if (this === Note.dragged) {
            return
        }

    },
    dragleave(e) {
        if (this === Note.dragged) {
            return
        }
        this.classList.remove('under')

    },
    drop(e) {
        e.stopPropagation()
        if (this === Note.dragged) {
            return
        }

        if (this.parentElement === Note.dragged.parentElement) {
            const note = Array.from(this.parentElement.querySelectorAll('.note'))
            const indexA = note.indexOf(this)
            const indexB = note.indexOf(Note.dragged)
            if (indexA < indexB) {
                this.parentElement.insertBefore(Note.dragged, this)
            } else {
                this.parentElement.insertBefore(Note.dragged, this.nextElementSibling)
            }
        } else {
            this.parentElement.insertBefore(Note.dragged, this)
        }
    }
}


