<template>
    <section>
        <router-view :key="$route.fullPath" />
    </section>
</template>

<script>
export default {
    metaInfo: ()=>({title:'Clientes'})
}
</script>

<style>

</style>