<template>
    <section class="container">
        <div class="row my-4">
            <div class="col-12 col-sm-6 col-md-4">
                <input type="search" class="form-control" placeholder="Buscar...">
            </div>
        </div>
        <div class="row">
            <div class="col-12 ">
                <table class="table table-stripedee w-100 ">
                    <thead>
                        <tr>
                            <th class="text-left">Nombres y apellidos</th>
                            <th class="text-left">Correo electrónico</th>
                            <th class="text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(usuario,k) in usuarios.data">
                            <tr :key="k">
                                <td class="text-left" style="width:270px;">
                                    {{usuario.name}}
                                </td>
                                <td class="text-left">{{usuario.email}}</td>
                                <td class="text-right" style="width:170px;">
                                    <router-link 
                                    :to="{name:'usuarios.editar',params:{id:usuario.id}}"
                                    class="btn btn-primary btn-sm px-2 mx-1"
                                    >
                                        Editar
                                    </router-link>
                                    <router-link 
                                    :to="{name:'usuarios.editar',params:{id:usuario.id}}"
                                    class="btn btn-danger btn-sm px-2 mx-1"
                                    >
                                        Eliminar
                                    </router-link>
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
import {usuariosTraer} from '../../services/usuarios'
export default {
    data(){
        return {
            usuarios: {
                data: []
            }
        }
    },
    mounted(){
        this.fetch_usuarios()
    },
    methods:{
        async fetch_usuarios(){
            const {data} = await usuariosTraer()
            console.log(data);
            this.usuarios = data
        }
    }
}
</script>

<style>

</style>