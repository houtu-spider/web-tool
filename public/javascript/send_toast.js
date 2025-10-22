export let send_toast = function(message, level = 'success') {
    send_message_toast(message, undefined, level)
}

export let send_message_toast = function (title, message, level = 'success') {
    Swal.fire({
        title,
        text: message,
        icon: level,
        timer: 1000,
        toast: true,
        showConfirmButton: false,
        position: 'top-end',
    })
}

export default {send_toast, send_message_toast}


