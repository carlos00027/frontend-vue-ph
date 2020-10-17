<template>
    <section class="container">
        <div  class="row justify-content-center align-items-center caja">
            <div class="col-12 col-sm-4 py-3 shadow-lg">
                <validation-observer ref="el-form-login">
                    <form>
                        <div class="row">
                            <div class="col-12 text-center mb-3">
                                <h3 class="font-weight-bold">Inicio de sesión</h3>
                            </div>
                            <div class="col-12">
                                <validation-provider 
                                tag="div" 
                                name="correo electrónico"
                                class="input-group mb-3"
                                :rules="{required:true,max:100}"
                                v-slot="{errors,classes}"
                                >
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="basic-addon1">
                                            <i class="icon-user"></i>
                                        </span>
                                    </div>
                                    <input 
                                    v-model="form.email"
                                    type="email" 
                                    class="form-control" 
                                    :class="classes"
                                    placeholder="correo electrónico" 
                                    aria-label="Username" 
                                    aria-describedby="basic-addon1"
                                    >
                                    <span class="w-100 text-danger error">
                                        {{errors[0]}}
                                    </span>
                                </validation-provider>
                            </div>
                            <div class="col-12">
                                <validation-provider 
                                tag="div" 
                                name="password"
                                class="input-group mb-3"
                                :rules="{required:true,max:100}"
                                v-slot="{errors,classes}"
                                >
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="basic-addon1">
                                            <i class="icon-key"></i>
                                        </span>
                                    </div>
                                    <input 
                                    v-model="form.password"
                                    type="password" 
                                    class="form-control" 
                                    :class="classes"
                                    placeholder="contraseña" 
                                    aria-label="password" 
                                    aria-describedby="basic-addon1"
                                    >
                                    <span class="w-100 text-danger error">
                                        {{errors[0]}}
                                    </span>
                                </validation-provider>
                            </div>
                            <div class="col-12">
                                <button 
                                type="button" 
                                class="btn btn-primary btn-block"
                                :disabled="cargando"
                                @click="ingresar"
                                >
                                    <span 
                                    class="spinner-border-sm" 
                                    :class="{'spinner-border': cargando}"
                                    role="status" 
                                    aria-hidden="true" 
                                    />
                                    Ingresar
                                </button>
                            </div>
                            <div class="col-12 my-2">
                                <router-link 
                                :to="{name: 'auth.registrar'}"
                                class="btn btn-outline-primary btn-block"
                                >
                                    Registrarme
                                </router-link>
                            </div>
                        </div>
                    </form>
                </validation-observer>
            </div>
            
        </div>
    </section>
</template>

<script>
import {login} from '../../services/auth'
import { mensaje } from '../../utils/helper'
export default {
    layout: 'basic',
    middleware: 'guest',
    data(){
        return {
            cargando: false,
            form:{
                email: '',
                password: ''
            }
        }
    },
    mounted(){
        let email = this.$route.query.email
        if(email) this.form.email = email
    },
    methods:{
        async ingresar(){
            const esValido = await this.$refs['el-form-login'].validate()
            if(!esValido) return 
            
            try {
                this.cargando = true
                const {status,data} = await login(this.form)
                this.cargando = false
                if(status === 200){
                    await this.$store.dispatch('auth/saveToken',data)
                    await this.$store.dispatch('auth/fetchUser')
                    this.$router.push({name: 'Home'})
                }   
            } catch (error) {
                this.cargando = false
                console.error(error);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.caja{
    height: 100vh;
    
    .error {
        font-size: 12px;
    }
}
</style>