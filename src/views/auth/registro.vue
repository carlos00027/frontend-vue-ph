<template>
    <section class="container" >
        <div class="row justify-content-center caja align-items-center">        
            <div class="col-12 col-sm-4 py-3 shadow-lg">
                <validation-observer ref="el-form-login">
                    <form>
                        <div class="row">
                            <div class="col-12 mb-3">
                                <h3 class="font-weight-bold">Formulario de registro</h3>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12 form-group">
                                <validation-provider
                                :rules="{required:true}"
                                name="rol"
                                v-slot="{errors,classes}"
                                >
                                    <label for="" class="text-left w-100 mb-0">Rol</label>
                                    <select v-model="form.rol_id" class="form-control" :class="classes">
                                        <option 
                                        v-for="(rol,k) in roles" 
                                        :key="k" 
                                        :value="rol.id" 
                                        placeholder="Seleccionar"
                                        >
                                            {{rol.name}}
                                        </option>
                                    </select>
                                    <span class="w-100 text-danger error">
                                        {{errors[0]}}
                                    </span>
                                </validation-provider>
                            </div>
                            <!-- nombres y apellidos -->
                            <div class="col-sm-12 form-group text-left">

                                <validation-provider 
                                tag="div" 
                                name="nombres"
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
                                    v-model="form.name"
                                    type="text" 
                                    class="form-control" 
                                    :class="classes"
                                    placeholder="Nombres y apellidos" 
                                    aria-label="Username" 
                                    aria-describedby="basic-addon1"
                                    >
                                    <span class="w-100 text-danger error">
                                        {{errors[0]}}
                                    </span>
                                </validation-provider>
                                
                            </div>
                            <!-- correo  -->
                            <div class="col-sm-12 form-group text-left">
                                <validation-provider 
                                tag="div" 
                                name="correo electrónico"
                                class="input-group mb-3"
                                :rules="{required:true,max:100,email:true}"
                                v-slot="{errors,classes}"
                                >
                                
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="basic-addon1">
                                            <i class="icon-mail"></i>
                                        </span>
                                    </div>
                                    <input 
                                    v-model="form.email"
                                    type="email" 
                                    class="form-control" 
                                    :class="classes"
                                    placeholder="Correo electrónico" 
                                    aria-label="Username" 
                                    aria-describedby="basic-addon1"
                                    >
                                    <span class="w-100 text-danger error">
                                        {{errors[0]}}
                                    </span>
                                </validation-provider>
                            </div>
                            <!-- contrasena -->
                            <div class="col-sm-12 form-group text-left">
                                <validation-provider 
                                tag="div" 
                                name="contraseña"
                                class="input-group mb-3"
                                :rules="{required:true,min:6,max:100}"
                                v-slot="{errors,classes}"
                                vid="contrasena"
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
                                    placeholder="Contraseña" 
                                    aria-label="Username" 
                                    aria-describedby="basic-addon1"
                                    >
                                    <span class="w-100 text-danger error">
                                        {{errors[0]}}
                                    </span>
                                </validation-provider>
                            </div>
                            <!-- confirmar contrasena -->
                            <div class="col-sm-12 form-group text-left">
                                <validation-provider 
                                tag="div" 
                                name="confirmar contraseña"
                                class="input-group mb-3"
                                :rules="{required:true,confirmed:'contrasena'}"
                                v-slot="{errors,classes}"
                                >
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="basic-addon1">
                                            <i class="icon-key"></i>
                                        </span>
                                    </div>
                                    <input 
                                    v-model="form.password_confirm"
                                    type="password" 
                                    class="form-control" 
                                    :class="classes"
                                    placeholder="Confirmar contraseña" 
                                    aria-label="Username" 
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
                                @click="guardar"
                                >
                                    <span 
                                    class="spinner-border-sm" 
                                    :class="{'spinner-border': cargando}"
                                    role="status" 
                                    aria-hidden="true" 
                                    />
                                    Registrarme
                                </button>
                            </div>
                        </div>
                    </form>
                </validation-observer>
            </div>
        </div>
    </section>
</template>

<script>
import {registrar} from '../../services/auth'
import {mensaje} from '../../utils/helper'
import {rolesListar} from '../../services/roles.js'
export default {
    layout: 'basic',
    middleware: 'guest',
    metaInfo: ()=>({title: 'Registro'}),
    data(){
        return {
            form:{
                rol_id: 1,
                name: '',
                email: '',
                password: '',
                password_confirm: ''
            },
            cargando: false,
            roles: []
        }
    },
    mounted(){
        rolesListar().then(({data})=>{
            this.roles = data
        })
    },
    methods:{
        async guardar(){
            
            let esValido = await this.$refs['el-form-login'].validate()
            console.log(esValido);
            if(!esValido) return 

            try {
                this.cargando = true
                const {status} = await registrar(this.form)
                this.cargando = false
                if(status === 201) mensaje('Mensaje','Usuario creado con exito','success')
                this.$router.push({name: 'auth.login',query: {email:this.form.email}})
                this.limpiar()
            } catch (error) {
                this.cargando = false
                console.error(error);
            }
        },
        limpiar(){
            this.form.rol_id = null
            this.form.name = ''
            this.form.email = ''
            this.form.password = ''
            this.form.password_confirm = ''
            this.$refs['el-form-login'].reset()
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