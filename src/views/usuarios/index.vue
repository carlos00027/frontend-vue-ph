<template>
    <section>
        <router-view :key="$route.fullPath" />
    </section>
</template>

<script>
export default {
    middleware: 'auth'
}
</script>

<style>

</style>