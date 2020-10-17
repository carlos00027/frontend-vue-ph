<template>
    <section class="container">
        <div class="row my-4 justify-content-between">
            <div class="col-12 col-sm-6 col-md-4">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">@</span>
                    </div>
                    <input 
                    v-model="valor"
                    type="search"
                    class="form-control" 
                    aria-label="Username" 
                    aria-describedby="basic-addon1"
                    placeholder="Buscar..."
                    >
                </div>
            </div>
            <div class="col-12 col-sm-6 col-md-4 text-right">
                <button 
                type="button" 
                class="btn btn-primary"
                @click="agregar"
                >
                    <i class="icon-plus"></i>
                    Agregar usuario
                </button>
            </div>
        </div>
        <div class="row">
            <div class="col-12 " style="overflow-x: auto;">
                <table class="table table-stripedee w-100" style="min-width:800px; ">
                    <thead>
                        <tr>
                            <th class="text-right" style="width:70px;">Item</th>
                            <th class="text-left" style="width:270px;">Nombres y apellidos</th>
                            <th class="text-left">Correo electrónico</th>
                            <th class="text-left">Rol</th>
                            <th class="text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(usuario,k) in usuarios.data">
                            <tr :key="k">
                                <td class="text-right">
                                    {{usuario.id}}
                                </td>
                                <td class="text-left" style="width:270px;">
                                    {{usuario.name}}
                                </td>
                                <td class="text-left">{{usuario.email}}</td>
                                <td class="text-left" style="width:110px;">{{usuario.rol.name}}</td>
                                <td class="text-right" style="width:170px;">
                                    <button 
                                    type="button"
                                    class="btn btn-primary btn-sm px-2 mx-1"
                                    :title="`Editar usuario ${usuario.name}`"
                                    @click="usuarioEditar(usuario)"
                                    >
                                        Editar
                                    </button>
                                    
                                    <button
                                    type="button" 
                                    class="btn btn-danger btn-sm px-2 mx-1"
                                    :title="`Eliminar usuario ${usuario.name}`"
                                    @click="usuarioEliminar(usuario)"
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
                :page-count="usuarios.last_page"
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
        
        <modal-usuario 
        ref="m-usuario" 
        :usuario="usuarioSel"
        @usuario-creado="fetch_usuarios"
        @usuario-actualizado="fetch_usuarios"
        />
    </section>
</template>

<script>
import {usuariosTraer} from '../../services/usuarios'
export default {
    metaInfo:()=>({title: 'Usuarios'}),
    components:{
        modalUsuario: ()=>import('./partials/modalUsuario')
    },
    data(){
        return {
            pagina: +this.$route.query.page,
            valor: this.$route.query.valor || '',
            usuarios: {
                total: 0,
                per_page: 0,
                last_page: 0,
                path: '',
                to: 0,
                data: []
            },
            usuarioSel:{
                id: null
            }
        }
    },
    watch:{
        '$route.query'(path){
            console.log('watch ',path);
            this.fetch_usuarios()
        }
    },
    mounted(){
        const page = +this.$route.query.page
        if(!page) return this.$router.push({query: {page:1}})
        
        this.fetch_usuarios()
    },
    methods:{
        async fetch_usuarios(){
            let page = +this.$route.query.page
            if(!page) page = 1
            const {data} = await usuariosTraer({page})
            //console.log(data);
            this.usuarios = data
        },
        agregar(){
            this.usuarioSel = {id:null}
            this.$refs['m-usuario'].toggle()
        },
        functionName(pageNum){
            ///console.log(`${this.usuarios.path}?page=${pageNum}`);
            this.$router.push({query:{page:pageNum}})
        },
        usuarioEditar(row){
            this.usuarioSel = {...row}
            this.$refs['m-usuario'].toggle()
        }
    }
}
</script>

<style>

</style>