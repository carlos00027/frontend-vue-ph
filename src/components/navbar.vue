<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
        <div class="container px-0">
        <router-link to="/" class="navbar-brand d-flex align-items-center" active-class="active" >
            <div style="height:50px; display:flex;">
                <svg version="1.1" id="Layer_1" style="height: 100%;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve"> <path style="fill:white;" d="M342.88,159.28v-9.653v-19.264c0-15.993-13.009-29.003-28.998-29.003H82.277 c-15.988,0-28.998,13.009-28.998,29.003v231.595c0,15.993,13.009,29.003,28.998,29.003h231.605 c15.988,0,28.998-13.009,28.998-29.003v-9.611v-9.653V159.28z M313.92,294.427h-67.573v67.573h-96.534v-67.573H82.24v-96.534h67.573 V130.32h96.534v67.573h67.573V294.427z"/> <polygon style="fill:#5ECC66;" points="227.04,149.627 169.12,149.627 169.12,217.2 101.546,217.2 101.546,275.121 169.12,275.121 169.12,342.694 227.04,342.694 227.04,275.121 294.613,275.121 294.613,217.2 227.04,217.2 "/> <path style="fill:#FFFFFF;" d="M410.454,226.854c-18.9,0-35.99-7.822-48.267-20.374v89.015 c12.276-12.552,29.367-20.374,48.267-20.374s35.99,7.822,48.267,20.374v-89.015C446.444,219.032,429.353,226.854,410.454,226.854z" /> <g> <path style="fill:#314E55;" d="M468.374,0c-5.336,0-9.653,4.322-9.653,9.653v139.974v9.653c0,26.613-21.654,48.267-48.267,48.267 c-26.613,0-48.267-21.654-48.267-48.267v-9.653v-19.264c0-26.636-21.673-48.309-48.304-48.309H82.277 c-26.631,0-48.304,21.673-48.304,48.309v231.595c0,26.636,21.673,48.309,48.304,48.309h231.605 c26.631,0,48.304-21.673,48.304-48.309v-9.611v-9.653c0-26.613,21.654-48.267,48.267-48.267c26.613,0,48.267,21.654,48.267,48.267 v9.653v149.999c0,5.331,4.318,9.653,9.653,9.653s9.653-4.322,9.653-9.653V352.347v-9.653V159.28v-9.653V9.653 C478.027,4.322,473.709,0,468.374,0z M342.88,361.958c0,15.993-13.009,29.003-28.998,29.003H82.277 c-15.988,0-28.998-13.009-28.998-29.003V130.363c0-15.993,13.009-29.003,28.998-29.003h231.605 c15.988,0,28.998,13.009,28.998,29.003v19.264v9.653v183.414v9.653V361.958z M458.72,295.495 c-12.276-12.552-29.367-20.374-48.267-20.374s-35.99,7.822-48.267,20.374v-89.015c12.276,12.552,29.367,20.374,48.267,20.374 s35.99-7.822,48.267-20.374V295.495z"/> <path style="fill:#314E55;" d="M246.347,130.32h-96.534v67.573H82.24v96.534h67.573v67.573h96.534v-67.573h67.573v-96.534h-67.573 V130.32z M294.613,217.2v57.92H227.04v67.573h-57.92v-67.573h-67.573V217.2h67.573v-67.573h57.92V217.2H294.613z"/> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg>
            </div>
            <div class="font-weight-bold">
                Pharmasan
            </div>
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            

            
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link :to="{name: 'usuarios.listar'}" class="nav-link" active-class="active">
                        <i class="icon-user"></i>
                        Usuarios
                    </router-link>  
                </li>
                <li class="nav-item">
                    <router-link :to="{name: 'reportes'}" class="nav-link" active-class="active">
                        <i class="icon-chart-area"></i>
                        Reportes
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{name: 'medicamentos'}" class="nav-link" active-class="active">
                        <i class="icon-pharmacy"></i>
                        Clientes
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{name: 'medicamentos'}" class="nav-link" active-class="active">
                        <i class="icon-pharmacy"></i>
                        Medicamentos
                    </router-link>
                </li>
                <!-- <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Dropdown
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                </li> -->
                <!-- <li class="nav-item">
                    <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                </li> -->
            </ul>
            <div>
                <button 
                type="button" 
                class="btn btn-danger"
                @click="cerrar_sesion"
                >
                    Cerrar sesión
                </button>
            </div>
            <!-- <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form> -->
            </div>
        </div>
    </nav>
</template>
<script>
export default {
    methods:{
        async cerrar_sesion(){
            await this.$store.dispatch('auth/logout')
            this.$router.push({ name: 'auth.login' })
        }
    }
}
</script>