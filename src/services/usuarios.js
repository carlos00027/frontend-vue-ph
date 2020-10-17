import Axios from 'axios'

export const usuariosTraer = (queryParams={}) => Axios(`/usuarios`,{params:{...queryParams}})
export const usuariosActualizar = (id,payload) => Axios.put(`/usuarios/${id}`,payload)
export const usuariosEliminar = (id) => Axios.delete(`/usuarios/${id}`)

export default {
    usuariosTraer,
    usuariosActualizar,
    usuariosEliminar
}