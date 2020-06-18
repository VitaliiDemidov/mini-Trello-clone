Application.load()
// document.querySelectorAll('.column')
//     .forEach(Column.process)

// document.querySelectorAll('.note')
//     .forEach(Note.process)

document.querySelector('[data-action-addColumn]')
    .addEventListener('click', function (e) {
        const column = new Column
        document.querySelector('.columns').append(column.element)
        Application.save()
    })