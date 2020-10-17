import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_URL

import store from '../store'
import router from '../router'
import Swal from 'sweetalert2'

// Request interceptor
axios.interceptors.request.use(request => {
  const token = store.getters['auth/token']
  if (token) {
    request.headers.common['Authorization'] = `Bearer ${token}`
  }

  request.headers.common['Accept-Language'] = 'en'

  return request
})

// Response interceptor
axios.interceptors.response.use(response => response, error => {
  const { status } = error.response

  if (status >= 500) {
    Swal.fire({
      type: 'error',
      title:'Error ',
      text: 'Crítico',
      reverseButtons: true,
      confirmButtonText: 'Ok',
      cancelButtonText: 'Cancelar'
    })
  }

  if (status === 401 && store.getters['auth/check']) {
    Swal.fire({
      icon: 'warning',
      title: 'Advertencia',
      text: 'la sesión ha expirado',
      reverseButtons: true,
      confirmButtonText: 'Ok',
      cancelButtonText: 'Cancelar'
    }).then(() => {
      store.commit('auth/LOGOUT')

      router.push({ name: 'auth.login' })
    })
  }

  return Promise.reject(error)
})