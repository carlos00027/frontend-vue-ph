<template>
    <section class="container px-0">
        <div class="row mx-0 mt-3 justify-content-between">
            <div class="col-sm-6 mb-1 px-0">
                <input type="search" class="form-control" placeholder="Buscar...">
            </div>
            <div class="col-sm-6 mb-1 text-right px-0">
                <button 
                type="button" 
                class="btn btn-primary"
                @click="clienteCrear"
                >
                    <i class="icon-plus"></i>
                    Crear
                </button>
            </div>
        </div>
        <div class="row mt-3 mx-0">
            <div class="col-12 px-0" style="overflow:auto; border-radius: 6px;">
                <table class="table table-striped w-100" style="min-width:1100px;">
                    <thead class="bg-primary text-light">
                        <tr>
                            <th style="width:  90px;" class="text-right">ID</th>
                            <th style="width: 200px;" class="text-left">Nombres</th>
                            <th style="width: 200px;" class="text-left">Documento</th>
                            <th style="width: 200px;" class="text-left">Correo electrónico</th>
                            <th style="width: 300px;" class="text-left">Dirección</th>
                            <th style="width: 190px;">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(cliente,k) in clientes.data">
                            <tr :key="k">
                                <td class="text-right align-middle">{{cliente.id}}</td>
                                <td style="width: 200px;" class="text-left align-middle">{{cliente.nombres}}</td>
                                <td style="width: 200px;" class="text-left align-middle">{{cliente.documento}}</td>
                                <td style="width: 200px;" class="text-left align-middle">{{cliente.correo}}</td>
                                <td style="width: 300px;" class="text-left align-middle">
                                    <div 
                                    style="max-height: 45px; overflow:hidden;"
                                    data-toggle="popover" 
                                    title="Dirección" 
                                    :data-content="cliente.direccion"
                                    >
                                        {{cliente.direccion}}
                                    </div>
                                </td>
                                <td style="width: 190px;">
                                    <button 
                                    type="button" 
                                    class="btn btn-sm px-2 btn-primary m-1"
                                    >
                                        Editar
                                    </button>
                                    <button 
                                    type="button" 
                                    class="btn btn-sm px-2 btn-danger m-1"
                                    @click="clienteEliminar(cliente)"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>
        <modalCliente 
        ref="m-cliente"
        @cliente-creado="fetch_clientes"
        />
    </section>
</template>

<script>
import $ from 'jquery'
import { clientesEliminar, clientesListar } from '../../services/clientes'
import { confirmar, mensaje } from '../../utils/helper'
export default {
    metaInfo: ()=>({title: 'Clientes'}),
    components:{
        modalCliente: ()=>import('./partials/modalCliente')
    },
    mounted(){
        this.fetch_clientes()  
    },
    updated(){
        this.$nextTick(()=>{
            $('[data-toggle="popover"]').popover({
                trigger: 'hover',
                placement: 'top'
            })
        })
    },
    data(){
        return {
            clientes : {
                data: []
            },
            clienteSel:{
                id: null
            }
        }
    },
    methods:{
        async fetch_clientes(){
            try {
                const {status,data} = await clientesListar()
                if(status === 200) this.clientes = data
                
            } catch (error) {
                console.error(error);
            }
        },
        clienteCrear(){
            this.clienteSel = {id:null}
            this.$refs['m-cliente'].toggle()
        },
        clienteEliminar(cliente){
            this.clienteSel = {...cliente}
            confirmar().then(result=>{
                if(result.isConfirmed){
                    clientesEliminar(cliente.id).then(({status})=>{
                        if(status === 200 ){
                            mensaje('Mensaje','Cliente eliminado con éxito','success')
                            this.fetch_clientes()
                        }
                    })
                }
            })
        }
    }
}
</script>

<style>

</style>