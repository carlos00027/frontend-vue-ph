import Swal from 'sweetalert2'

export const mensaje = (title='',message='',icon='info')=>Swal.fire(title,message,icon)

export default {
    mensaje
}