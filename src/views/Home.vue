<template>
  <div class="home container">
    <div>
      <h1 class="font-weight-bold">
        Binvenido a Pharmasan
      </h1>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  middleware: 'auth',
  components: {
    HelloWorld
  }
}
</script>
<style lang="scss" scoped>
.home{
  height: calc(100vh - 76px) !important;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>