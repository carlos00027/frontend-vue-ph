<template>
    <div 
    ref="modal"
    class="modal fade" 
    id="exampleModal" 
    tabindex="-1" 
    aria-labelledby="exampleModalLabel" 
    aria-hidden="true"
    >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Agregar cliente</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <validation-observer ref="form-cliente">
                        <form action="">
                            <div class="row">
                                <!-- nombres -->
                                <div class="col-sm-12">
                                    <validation-provider
                                    :rules="{required: true, max:100}"
                                    name="nombres"
                                    v-slot="{errors,classes}"
                                    >
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon1">
                                                    <i class="icon-user"></i>
                                                </span>
                                            </div>
                                            <input 
                                            v-model="form.nombres"
                                            type="text" 
                                            class="form-control" 
                                            :class="classes"
                                            placeholder="Nombres" 
                                            aria-label="Nombres" 
                                            aria-describedby="basic-addon1"
                                            >
                                            <div class="invalid-feedback text-left">
                                                {{errors[0]}}
                                            </div>
                                        </div>
                                    </validation-provider>
                                </div>
                                <!-- documento -->
                                <div class="col-sm-12">
                                    <validation-provider
                                    :rules="{required: true, max:30}"
                                    name="documento"
                                    v-slot="{errors,classes}"
                                    >
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon1">
                                                    <i class="icon-user"></i>
                                                </span>
                                            </div>
                                            <input 
                                            v-model="form.documento"
                                            type="text" 
                                            class="form-control" 
                                            :class="classes"
                                            placeholder="Documento" 
                                            aria-label="Documento" 
                                            aria-describedby="basic-addon1"
                                            >
                                            <div class="invalid-feedback text-left">
                                                {{errors[0]}}
                                            </div>
                                        </div>
                                    </validation-provider>
                                </div>
                                <!-- correo electronico -->
                                <div class="col-sm-12">
                                    <validation-provider
                                    :rules="{required: true, max:255,email: true}"
                                    name="correo"
                                    v-slot="{errors,classes}"
                                    >
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon1">
                                                    <i class="icon-user"></i>
                                                </span>
                                            </div>
                                            <input 
                                            v-model="form.correo"
                                            type="text" 
                                            class="form-control" 
                                            :class="classes"
                                            placeholder="Correo electrónico" 
                                            aria-label="Correo electrónico" 
                                            aria-describedby="basic-addon1"
                                            >
                                            <div class="invalid-feedback text-left">
                                                {{errors[0]}}
                                            </div>
                                        </div>
                                    </validation-provider>
                                </div>
                                <!-- direccion -->
                                <div class="col-sm-12">
                                    <validation-provider
                                    :rules="{required: true, max:700}"
                                    name="correo"
                                    v-slot="{errors,classes}"
                                    >
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon1">
                                                    <i class="icon-user"></i>
                                                </span>
                                            </div>
                                            <textarea 
                                            v-model="form.direccion"
                                            rows="3"
                                            type="text" 
                                            class="form-control" 
                                            :class="classes"
                                            placeholder="direccion" 
                                            aria-label="direccion" 
                                            aria-describedby="basic-addon1"
                                            />
                                            <div class="invalid-feedback text-left">
                                                {{errors[0]}}
                                            </div>
                                        </div>
                                    </validation-provider>
                                </div>
                            </div>
                        </form>
                    </validation-observer>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                    <button 
                    type="button" 
                    class="btn btn-primary"
                    @click="guardar"
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'
export default {
    data(){
        return {
            form:{
                nombres: '',
                docuemnto: '',
                correo: '',
                direccion: '',
            }
        }
    },
    methods:{
        toggle(){
            $(this.$refs.modal).modal('toggle')
        },
        async guardar(){
            const esValido = await this.$refs['form-cliente'].validate()
            if(!esValido) return 
        }
    }
}
</script>

<style>

</style>