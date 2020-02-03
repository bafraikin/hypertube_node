<template>
  <div id="app">

    <component :is="layout">
      <router-view/>
    </component>
<!--
    <div id="nav">
      <router-link to="/">Home</router-link> |

      <router-link to="/about">About</router-link> |
      <router-link to="/film-info/">Film info (need id_imdb)</router-link>  |
      <router-link to="/film-list">Film research</router-link>  |
      <router-link to="/download/">Film downloaded</router-link>  |
    </div>
    <router-view/>
-->
  </div>
</template>

<style lang="scss">
  #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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

<script>
export default {
  computed: {
    layout() {
      return (this.$route.meta.layout)
    }
  }
}
</script>


