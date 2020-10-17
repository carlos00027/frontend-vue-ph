<template>
    <section class="container ">
        <div class="row mt-3 justify-content-between">
            <div class="col">
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
        <modalCliente 
        ref="m-cliente"
        />
    </section>
</template>

<script>
export default {
    metaInfo: ()=>({title: 'Clientes'}),
    components:{
        modalCliente: ()=>import('./partials/modalCliente')
    },
    data(){
        return {
            clienteSel:{
                id: null
            }
        }
    },
    methods:{
        clienteCrear(){
            this.clienteSel = {id:null}
            this.$refs['m-cliente'].toggle()
        }
    }
}
</script>

<style>

</style>