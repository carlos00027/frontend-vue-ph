import axios from 'axios'

export const login = (payload)=> axios.post(`/auth/login`,payload)
export const registrar = (payload) => axios.post(`/auth/registrar`,payload)

export default {
    login,
    registrar
}