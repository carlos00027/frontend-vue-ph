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
                    <valitation-observer>
                        <form action="">
                            <div class="row">
                                <div class="col-sm-12">
                                    <validation-provider
                                    :rules="{required: true, max:100}"
                                    >
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon1">@</span>
                                            </div>
                                            <input 
                                            v-model="form.nombres"
                                            type="text" 
                                            class="form-control" 
                                            placeholder="Username" 
                                            aria-label="Username" 
                                            aria-describedby="basic-addon1"
                                            >
                                        </div>
                                    </validation-provider>
                                </div>
                            </div>
                        </form>
                    </valitation-observer>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-primary">Guardar</button>
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
                nombres: ''
            }
        }
    },
    methods:{
        toggle(){
            $(this.$refs.modal).modal('toggle')
        }
    }
}
</script>

<style>

</style>