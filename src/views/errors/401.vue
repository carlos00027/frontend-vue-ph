<template>
    <section class="error-estilo">
        <div>
            <h1 class="font-weight-bold">
                401 no autorizado :(
            </h1>
        </div>
        <div>
            <button type="button" class="btn btn-primary" @click="$router.go(-2)">
                Regresar
            </button>
        </div>
    </section>
</template>
<script>
export default {
    layout: 'basic'
}
</script>
<style lang="scss" scoped>
.error-estilo{
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    justify-content: center;
}
</style>