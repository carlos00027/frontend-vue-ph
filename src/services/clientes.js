import Axios from 'axios'

export const clienteCrear = (payload) => Axios.post(`/clientes`,payload)

export default {
    clienteCrear
}