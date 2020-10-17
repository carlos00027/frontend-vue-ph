<template>
  <div id="app">
    
    <transition name="page" mode="out-in">
      <component :is="layout" v-if="layout" />
    </transition>
    
  </div>
</template>
<script>

// Load layout components dynamically.
const requireContext = require.context('./layouts', false, /.*\.vue$/)
const layouts = requireContext.keys()
  .map(file =>
    [file.replace(/(^.\/)|(\.vue$)/g, ''), requireContext(file)]
  )
  .reduce((components, [name, component]) => {
    components[name] = component.default || component
    return components
  }, {})

export default {
  data(){
    return {
      layout: null,
      defaultLayout: 'default'
    }
  },
  metaInfo () {
    const { appName } = 'Pharmasan'
    return {
      title: appName,
      titleTemplate: `%s · ${appName}`
    }
  },
  methods:{
    setLayout (layout) {
      if (!layout || !layouts[layout]) {
        layout = this.defaultLayout
      }
      this.layout = layouts[layout]
    }
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
