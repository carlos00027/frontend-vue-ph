import axios from 'axios'

export const login = (payload)=> axios.post(`/auth/login`,payload)
export const registrar = (payload) => axios.post(`/auth/registrar`,payload)
export const user = ()=> axios('/user')


export default {
    login,
    registrar,
    user
}