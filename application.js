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
            .forEach(columnElement => {
                const column = {
                    title: columnElement.querySelector('.column-header').textContent,
                    id: +columnElement.getAttribute('data-column-id'),
                    noteIds: []
                }
                columnElement.querySelectorAll('.note')
                    .forEach(noteElement => {
                        column.noteIds.push(parseInt(noteElement.getAttribute('data-note-id')))
                    })

                obj.columns.items.push(column)
            });
        document.querySelectorAll('.note')
            .forEach(noteElement => {
                const note = {
                    id: +noteElement.getAttribute('data-note-id'),
                    content: noteElement.textContent
                }
                obj.notes.items.push(note)
            })
        const json = JSON.stringify(obj)
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

        for (let { id, noteIds, title } of object.columns.items) {
            let column = new Column(id, title)
            mountPoint.append(column.element)

            for (let noteId of noteIds) {
                const { id, content } = getNoteById(noteId)
                const note = new Note(id, content)
                column.add(note)
            }
        }

    }
}