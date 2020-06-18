Application.load()

document.querySelector('[data-action-addColumn]')
    .addEventListener('click', function (e) {
        const column = new Column
        document.querySelector('.columns').append(column.element)
        Application.save()
    })