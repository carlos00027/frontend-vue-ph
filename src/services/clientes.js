import Axios from 'axios'

export const clientesListar = (payload) => Axios(`/clientes`,{params:{...payload}})
export const clientesCrear = (payload) => Axios.post(`/clientes`,payload)
export const clientesEliminar = (id) => Axios.delete(`/clientes/${id}`)
export const clientesActualizar = (id,payload) => Axios.put(`/clientes/${id}`,payload)

export default {
    clientesListar,
    clientesCrear,
    clientesEliminar,
    clientesActualizar
}