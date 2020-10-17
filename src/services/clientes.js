import Axios from 'axios'

export const clientesListar = (payload) => Axios(`/clientes`,{params:{...payload}})
export const clientesCrear = (payload) => Axios.post(`/clientes`,payload)
export const clientesEliminar = (id) => Axios.delete(`/clientes/${id}`)

export default {
    clientesListar,
    clientesCrear,
    clientesEliminar
}