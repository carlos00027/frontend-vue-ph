<template>
    <section class="container">
        <div class="row mt-3 justify-content-between">
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
        </div>
        <div class="row">
            <div class="col-sm-12 px-0" style="overflow: auto; border-radius:6px;">
                <table class="table table-striped" style="min-width:800px;">
                    <thead class="bg-primary text-light">
                        <tr>
                            <th class="text-left">Expediente</th>
                            <th class="text-left">Medicamento</th>
                            <th class="text-left">Principio activo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(row,k) in medicamentos.data">
                            <tr :key="k">
                                <td class="text-left align-middle" style="width: 160px;">
                                    {{row.expediente}}
                                </td>
                                <td class="text-left align-middle">
                                    <div 
                                    style="max-height: 40px; overflow: hidden;"
                                    :title="row.producto"
                                    >
                                        {{row.producto}}
                                    </div>
                                </td>
                                <td class="text-left align-middle">
                                    <div 
                                    style="max-height: 40px; overflow: hidden;" 
                                    :title="row.principioactivo"
                                    >
                                        {{row.principioactivo}}
                                    </div>
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
                :page-count="medicamentos.last_page"
                :click-handler="functionName"
                :page-range="10"
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
    </section>
</template>

<script>
import {medicamentosListar} from '../../services/medicamentos'
export default {
    data(){
        return {
            valor: this.$route.query.valor || '',
            pagina: +this.$route.query.page,
            buscar_ttl: 600, //milisegundos
            medicamentos:{
                per_page: 0,
                path: '',
                last_page: 0,
                data:[]
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
        if(this.$route.query.valor){
            this.$refs['i-buscar'].focus()
        }
        this.fetch_medicamentos()

    },
    methods:{
        async fetch_medicamentos(){
            const query = {...this.$route.query}
            try {
                const {status,data} = await medicamentosListar({...query})
                if(status === 200){
                    this.medicamentos = data
                }
            } catch (error) {
                console.error(error);
            }
        },
        functionName(pageNum){
            console.log(`${this.medicamentos.path}?page=${pageNum}`);
            const query = {...this.$route.query}
            query.page = pageNum
            this.$router.push({query})
        },
    }
}
</script>

<style>

</style>