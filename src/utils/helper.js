import Swal from 'sweetalert2'

export const mensaje = (title='',message='',icon='info')=>Swal.fire(title,message,icon)

export const confirmar = (title='Estás seguro?') => Swal.fire({
    title: '',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: `Si`,
    denyButtonText: `No`,
})

export default {
    mensaje
}