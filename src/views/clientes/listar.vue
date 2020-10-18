<template>
    <section class="container px-0">
        <div class="row mx-0 mt-3 justify-content-between">
            <div class="col-12 col-sm-6 col-md-4 px-0">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text bg-primary text-light border-primary" id="basic-addon1">
                            <i class="icon-search"></i>
                        </span>
                    </div>
                    <input 
                    ref="i-buscar"
                    v-model="valor"
                    type="search"
                    class="form-control" 
                    aria-label="Username" 
                    aria-describedby="basic-addon1"
                    placeholder="Buscar..."
                    >
                </div>
            </div>
            <div class="col-12 col-sm-6 col-md-4 text-right px-0">
                <button 
                type="button" 
                class="btn btn-primary"
                @click="clienteCrear"
                >
                    <i class="icon-plus"></i>
                    Agregar cliente
                </button>
            </div>
        </div>
        <div class="row mt-3 mx-0">
            <div class="col-12 px-0" style="overflow:auto; border-radius: 6px;">
                <table class="table table-striped w-100" style="min-width:1100px;">
                    <caption class="w-100 text-center">
                        No se encontraron clientes
                    </caption>
                    <thead class="bg-primary text-light">
                        <tr>
                            <th style="width:  40px;" class="text-right">ID</th>
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
                                    @click="clienteEditar(cliente)"
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
        <div class="row justify-content-center my-3">
            <nav aria-label="Page navigation example">
                <paginate
                v-model="pagina"
                :page-count="clientes.last_page"
                :click-handler="functionName"
                :page-range="5"
                :prev-text="'Atrás'"
                :next-text="'Siguiente'"
                :container-class="'pagination '"
                prevLinkClass="page-link"
                nextLinkClass="page-link"
                pageClass="page-item"
                pageLinkClass="page-link"
                />
            </nav>
        </div>
        <modalCliente 
        ref="m-cliente"
        :cliente="clienteSel"
        @cliente-creado="fetch_clientes"
        @cliente-actualizado="fetch_clientes"
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
    data(){
        return {
            buscar_ttl: 600, //milisengundos
            pagina: +this.$route.query.page,
            valor: this.$route.query.valor || '',
            clientes : {
                path: '',
                last_page: 0,
                data: []
            },
            clienteSel:{
                id: null
            }
        }
    },
    watch:{
        valor(a){
            if(window.buscando) clearInterval(window.buscando)
            window.buscando = setTimeout(()=>{
                
                //const query = {...this.$route.query}
                const query = {}
                query.page = 1
                query.valor = a
                
                this.$router.push({query})
            },this.buscar_ttl)
        }
    },
    mounted(){
        this.fetch_clientes()
        if(this.$route.query.valor){
            this.$refs['i-buscar'].focus()
        }
    },
    updated(){
        this.$nextTick(()=>{
            $('[data-toggle="popover"]').popover({
                trigger: 'hover',
                placement: 'top'
            })
        })
    },
    methods:{
        functionName(pageNum){
            console.log(`${this.clientes.path}?page=${pageNum}`);
            const query = {...this.$route.query}
            query.page = pageNum
            this.$router.push({query})
        },
        async fetch_clientes(){
            try {
                const query = {...this.$route.query}
                const {status,data} = await clientesListar({...query})
                if(status === 200) this.clientes = data
                
            } catch (error) {
                console.error(error);
            }
        },
        clienteCrear(){
            this.clienteSel = {id:null}
            this.$refs['m-cliente'].toggle()
        },
        clienteEditar(cliente){
            this.clienteSel = {...cliente}
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