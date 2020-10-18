import Axios from 'axios'

export const medicamentosListar = (payload) =>Axios(`/medicamentos`,{params: {...payload}})

export default {
    medicamentosListar
}