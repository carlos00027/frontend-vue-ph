import Axios from 'axios'

export const usuariosTraer = (queryParams={})=> Axios(`/usuarios`,{params:{...queryParams}})

export default {
    usuariosTraer
}