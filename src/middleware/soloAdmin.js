import store from '../store'
export default (to,from,next) =>{
    if(store.getters['auth/user'].rol_id === 1){
        return next()
    }
    next({name: 'error.401'})
}