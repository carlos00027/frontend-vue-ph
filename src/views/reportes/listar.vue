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
            <div class="col px-0 text-right">
                <div class="dropdown">
                    <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Descargar
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" href="#" @click="descargar($event,1)">JSON</a>
                        <a class="dropdown-item" href="#" @click="descargar($event,2)">CSV</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="row justify-content-center">
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
        <div class="row">
            <div class="col-sm-12 px-0" style="overflow: auto; border-radius:6px;">
                <table class="table table-striped" style="min-width:800px;">
                    <caption v-if="medicamentos.data.length === 0" class="w-100 text-center">
                        No se encontraron resultados
                    </caption>
                    <thead class="bg-primary text-light">
                        <tr>
                            <th class="text-left">Expediente</th>
                            <th class="text-left">Producto</th>
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
        descargar(evt,tipo=1){
            evt.preventDefault()
            console.log('tipo',tipo);
            if(tipo === 1) this.armar_json() // es json
            else if(tipo === 2) this.armar_csv()            
        },
        armar_json(){
            const cuerpo = JSON.stringify(this.medicamentos.data)
            const blobExcel = new Blob([cuerpo],{type: 'application/json'})
            const elLink = document.createElement('a')
            elLink.href = URL.createObjectURL(blobExcel)
            elLink.download = `medicamentos-pagina-${this.$route.query.page}.json`
            elLink.click()
        },
        armar_csv(){
            let cuerpo = ''
            const indices = Object.keys(this.medicamentos.data[0] || {})
            const indicesNoPermitidos = ['id','created_at','updated_at']
            for (const row of this.medicamentos.data){
                for (const indice of indices) {
                    if(!indicesNoPermitidos.includes(indice)){
                        cuerpo += `${row[indice]},`
                    }
                }
                cuerpo += `\n`
            }

            const blobExcel = new Blob([cuerpo],{type: 'application/csv'})
            const elLink = document.createElement('a')
            elLink.href = URL.createObjectURL(blobExcel)
            elLink.download = `medicamentos-pagina-${this.$route.query.page}.csv`
            elLink.click()
        }
    }
}
</script>

<style>

</style>