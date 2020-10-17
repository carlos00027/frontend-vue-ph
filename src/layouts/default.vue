<template>
    <section>
        <navbar />
        <router-view />
    </section>
</template>
<script>
export default {
    components:{
        navbar: ()=>import('../components/navbar')
    }
}
</script>