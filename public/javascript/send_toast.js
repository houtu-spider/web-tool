export let send_toast = function(message, level = 'success') {
    Swal.fire({
        title: message,
        icon: level,
        timer: 1000,
        toast: true,
        showConfirmButton: false,
        position: 'top-end',
    })
}

export default {send_toast}


