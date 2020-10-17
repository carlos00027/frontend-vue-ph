import Axios from "axios"

export const rolesListar = ()=>Axios(`/roles`)

export default {
    rolesListar
}