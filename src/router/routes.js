
export default [
    {
        path: '/',
        name: 'Home',
        component: ()=>import('../views/Home.vue').then(m=>m.default || m)
    },
    {
        path: '/auth/login',
        name: 'auth.login',
        component: ()=>import('../views/auth/login.vue').then(m=>m.default || m)
    },
    {
        path: '/auth/registrar',
        name: 'auth.registrar',
        component: ()=>import('../views/auth/registro.vue').then(m=>m.default || m)
    },
    {
        path: '/usuarios',
        component: ()=>import('../views/usuarios/index.vue').then(m=>m.default || m),
        children: [
            {
                path: '/',
                name: 'usuarios.listar',
                component: ()=>import('../views/usuarios/listar.vue').then(m=>m.default || m),
            }

        ]
    },
    {
        path: '/clientes',
        component: ()=>import('../views/clientes/index.vue').then(m=>m.default || m),
        children:[
            {
                path: '/',
                name: 'clientes',
                component: ()=>import('../views/clientes/listar.vue').then(m=>m.default || m),
            }
        ]

    },
    {
        path:'/reportes',
        name: 'reportes',
        component: ()=>import('../views/reportes/index.vue').then(m=>m.default || m)
    },
    {
        path:'/medicamentos',
        name: 'medicamentos',
        component: ()=>import('../views/medicamentos/index.vue').then(m=>m.default || m)
    },
    {
        path: '*',
        component: ()=>import('../views/errors/404.vue')
    }
]