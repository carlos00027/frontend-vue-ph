<template>
    <section>
        <navbar />
        <router-view class="ajuste" />
    </section>
</template>
<script>
export default {
    components:{
        navbar: ()=>import('../components/navbar')
    }
}
</script>
<style lang="scss" scoped>
.ajuste{
    position: relative;
    top: 56px;
}
</style>