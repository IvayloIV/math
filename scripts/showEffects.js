$(document).on({
    ajaxStart: function () {
        $('#loadingBox').show();
    },
    ajaxStop: function () {
        $('#loadingBox').hide();
    }
});

$('#acceptBox').hide();
function acceptBox(message) {
    $('#loadingBox').hide();
    $('#acceptBox').show().text(message);
    setTimeout(function () {
        $('#acceptBox').hide();
    }, 3000);
}

$('#delete').on('click', handler.deleteTask);
$('#last').on('click', handler.decreaseCounter);
$('#next').on('click', handler.increaseCounter);


$('#viewMath').hide();
$('#visualMath').hide();
$('#errorBox').hide();
function errorBox(message) {
    $('#loadingBox').hide();
    $('#errorBox').show().text(message);
    setTimeout(function () {
        $('#errorBox').hide();
    }, 4000);
}