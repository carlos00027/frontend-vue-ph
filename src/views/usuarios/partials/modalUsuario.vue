<template>
    <div 
    ref="modal"
    class="modal fade" 
    id="exampleModal8787" 
    tabindex="-1" 
    aria-labelledby="exampleModal8787Label" 
    aria-hidden="true"
    >
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModal8787Label">Usuario</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <validation-observer ref="el-form-login">
                    <form>
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
                                    <div class="w-100 text-danger text-left">
                                        <span class="error ">
                                            {{errors[0]}}
                                        </span>
                                    </div>
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
                                :rules="{required: esEditar ? false : true,min:6,max:100}"
                                v-slot="{errors,classes}"
                                vid="contrasena"
                                >
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">
                                            <i class="icon-key"></i>
                                        </span>
                                    </div>
                                    <input 
                                    v-model="form.password"
                                    :type="verClave ? 'text' : 'password'" 
                                    class="form-control" 
                                    :class="classes"
                                    placeholder="Contraseña" 
                                    aria-label="password" 
                                    >
                                    <div 
                                    class="input-group-append" 
                                    style="cursor:pointer;"
                                    @click="verClave = !verClave"
                                    >
                                        <span class="input-group-text">
                                            <i :class="verClave ? 'icon-eye-off' : 'icon-eye'" />
                                        </span>
                                    </div>
                                    <div class="w-100">
                                        <span class="w-100 text-danger error">
                                            {{errors[0]}}
                                        </span>
                                    </div>
                                </validation-provider>
                            </div>
                            <!-- confirmar contrasena -->
                            <div class="col-sm-12 form-group text-left">
                                <validation-provider 
                                tag="div" 
                                name="confirmar contraseña"
                                class="input-group mb-3"
                                :rules="{required: form.password.length ? true : false, confirmed:'contrasena'}"
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
                        </div>
                    </form>
                </validation-observer>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">
                    Cerrar
                </button>
                <button 
                v-if="!esEditar"
                type="button" 
                class="btn btn-primary"
                :disabled="cargando"
                @click="guardar"
                >
                    <span 
                    class="spinner-border-sm" 
                    :class="{'spinner-border': cargando}"
                    role="status" 
                    aria-hidden="true" 
                    />
                    Crear
                </button>
                <button 
                v-else
                type="button" 
                class="btn btn-primary"
                :disabled="cargando"
                @click="actualizar"
                >
                    <span 
                    class="spinner-border-sm" 
                    :class="{'spinner-border': cargando}"
                    role="status" 
                    aria-hidden="true" 
                    />
                    Actualizar
                </button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'
import { rolesListar } from '../../../services/roles'
import { registrar } from '../../../services/auth'
import { mensaje } from '../../../utils/helper'
import { usuariosActualizar } from '../../../services/usuarios'
export default {
    props:{
        usuario:{
            type: Object,
            default: ()=>({id:null})
        }
    },
    data(){
        return {
            verClave: false,
            cargando: false,
            form:{
                rol_id: null,
                name: '',
                email: '',
                password: '',
                password_confirm:''
            },
            roles: []
        }
    },
    computed:{
        esEditar(){
            if(this.usuario.id) return true
            return false
        }
    },
    watch:{
        'usuario.id'(id){
            if(id){
                this.form.name = this.usuario.name
                this.form.rol_id = this.usuario.rol_id
                this.form.email = this.usuario.email
                this.form.password = ''
                this.form.password_confirm = ''
                return
            }
            this.limpiar()
        }
    },
    mounted(){
         rolesListar().then(({data})=>{
            this.roles = data
        })
    },
    methods:{
        toggle(){
            $(this.$refs.modal).modal('toggle')
        },
        async guardar(){
            
            let esValido = await this.$refs['el-form-login'].validate()
            console.log(esValido);
            if(!esValido) return 

            try {
                this.cargando = true
                const {status} = await registrar(this.form)
                this.cargando = false
                if(status === 201) mensaje('Mensaje','Usuario creado con éxito','success')
                //this.limpiar()
                this.$emit("usuario-creado")
                this.toggle()
            } catch (error) {
                this.cargando = false
                console.error(error);
            }
        },
        async actualizar(){
            let esValido = await this.$refs['el-form-login'].validate()
            console.log(esValido);
            if(!esValido) return 
            
            try {
                this.cargando = true
                const {status} = await usuariosActualizar(this.usuario.id,this.form)
                this.cargando = false
                if(status === 200) mensaje('Mensaje','Usuario actualizado con éxito','success')
                //this.limpiar()
                this.$emit("usuario-actualizado")
                this.toggle()
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