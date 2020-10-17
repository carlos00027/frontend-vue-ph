<template>
    <section class="container">
        <div  class="row justify-content-center align-items-center caja">
            <div class="col-12 col-sm-8 col-xl-4 py-3 shadow-lg">
                <validation-observer ref="el-form-login">
                    <form>
                        <div class="row">
                            <div class="col-12 text-center mb-3 d-flex flex-column justify-content-center">
                                <div class="my-0">
                                    <svg id="Capa_1" style="height: 120px; width:120px" enable-background="new 0 0 512 512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m119.485 153.168h-87.485v-77.501h30v47.501h57.485z" fill="#3c4a83"/><path d="m47 94c-25.916 0-47-21.084-47-47s21.084-47 47-47 47 21.084 47 47-21.084 47-47 47z" fill="#60e2f4"/><path d="m480 153.168h-85.629v-30h55.629v-47.501h30z" fill="#2a386b"/><path d="m465 94c-25.916 0-47-21.084-47-47s21.084-47 47-47 47 21.084 47 47-21.084 47-47 47z" fill="#29c5ec"/><path d="m62 436.333h-30v-77.501h85.628v30h-55.628z" fill="#3c4a83"/><path d="m47 512c-25.916 0-47-21.084-47-47s21.084-47 47-47 47 21.084 47 47-21.084 47-47 47z" fill="#60e2f4"/><path d="m480 436.333h-30v-47.501h-55.629v-30h85.629z" fill="#2a386b"/><path d="m465 512c-25.916 0-47-21.084-47-47s21.084-47 47-47 47 21.084 47 47-21.084 47-47 47z" fill="#29c5ec"/><path d="m15 241h60.667v30h-60.667z" fill="#3c4a83"/><path d="m436.333 241h60.667v30h-60.667z" fill="#2a386b"/><path d="m241 436.33h30v60.67h-30z" fill="#3c4a83"/><path d="m256 436.33h15v60.67h-15z" fill="#2a386b"/><path d="m241 15h30v60.67h-30z" fill="#3c4a83"/><path d="m256 15h15v60.67h-15z" fill="#2a386b"/><circle cx="256" cy="256" fill="#48588b" r="195.33"/><path d="m451.33 256c0 107.885-87.445 195.33-195.33 195.33v-390.66c107.885 0 195.33 87.445 195.33 195.33z" fill="#3c4a83"/><path d="m311.98 192.72v28.88h-30v-28.88c0-14.32-11.66-25.97-25.98-25.97s-25.98 11.65-25.98 25.97v28.88h-30v-28.88c0-30.86 25.11-55.97 55.98-55.97s55.98 25.11 55.98 55.97z" fill="#cddbf9"/><path d="m311.98 192.72v28.88h-30v-28.88c0-14.32-11.66-25.97-25.98-25.97v-30c30.87 0 55.98 25.11 55.98 55.97z" fill="#afc2e8"/><path d="m176.09 206.6v147.48h64.91l15-6.19 15 6.19h64.91v-147.48z" fill="#fea000"/><path d="m335.91 206.6v147.48h-64.91l-15-6.19v-141.29z" fill="#f78002"/><path d="m241 264.13h30v89.95h-30z" fill="#fbe200"/><path d="m256 264.13h15v89.95h-15z" fill="#febf01"/></svg>
                                </div>
                                <div>
                                    <h3 class="font-weight-bold">Inicio de sesión</h3>
                                </div>
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
                                    @keyup.enter="ingresar"
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
    metaInfo: ()=>({title: 'Inicio de sesión'}),
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