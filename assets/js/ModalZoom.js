// Script for updating modal content (see examples on lab resources page)

$('#zoom-modal').on('show.bs.modal', function (event) {
    var image = $(event.relatedTarget) // Image that triggered the modal
    var fullImage = image.data('full-image') // Extract src of higher resolution image from data-* attribute of clicked image
    var imageCaption = image.data('modal-caption') // Extract caption from data-* attribute of clicked image
    // Upadte modal contents
    var modal = $(this)
    modal.find('.modal-body img').attr('src', fullImage)
    modal.find('.modal-body figcaption').text(imageCaption)
})