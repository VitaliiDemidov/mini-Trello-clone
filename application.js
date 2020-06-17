const Application = {
    save() {
        const obj = {
            columns: {
                idCounter: Column.idCounter,
                items: []
            },
            notes: {
                idCounter: Note.idCounter,
                items: []
            }
        }

        document.querySelectorAll('.column')
            .forEach(element => {
                const column = {
                    id: +element.getAttribute('data-column-id'),
                    noteId: []
                }
                element.querySelectorAll('.note')
                    .forEach(noteElement => {
                        column.noteId.push(parseInt(noteElement.getAttribute('data-note-id')))
                    })

                obj.columns.items.push(column)
            });
        document.querySelectorAll('.note')
            .forEach(noteElement => {
                const note = {
                    title,
                    id: +noteElement.getAttribute('data-note-id'),
                    content: noteElement.textContent
                }
                obj.notes.items.push(note)
            })
        const json = JSON.stringify(obj)
        console.log(json);
        localStorage.setItem('trello', json)
    },
    load() {
        if (!localStorage.getItem('trello')) {
            return
        }
        const mountPoint = document.querySelector('.columns')
        mountPoint.innerHTML = '';

        const object = JSON.parse(localStorage.getItem('trello'))
        const getNoteById = id => object.notes.items.find(note => note.id === id)
        console.log(object);

        for (let column of object.columns.items) {
            let columnElement = Column.create(column.id)
            mountPoint.append(columnElement)
            for (let noteId of column.noteId) {
                const note = getNoteById(noteId)
                console.log(note);
                const noteElement = Note.create(note.id, note.content)
                columnElement.querySelector('[data-notes]').append(noteElement)
            }
        }

    }
}