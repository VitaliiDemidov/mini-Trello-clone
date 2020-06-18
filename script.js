Application.load()
document.querySelectorAll('.column')
    .forEach(Column.process)

document.querySelectorAll('.note')
    .forEach(Note.process)

document.querySelector('[data-action-addColumn]')
    .addEventListener('click', function (e) {
        const columnElement = Column.create()
        document.querySelector('.columns').append(columnElement)
        Application.save()
    })