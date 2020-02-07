<template>

  <div class="hello">
    <!-- <button v-on:click="test()">dd</button> -->
    <!-- <router-link to="film-list">DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDd</router-link> -->

  </div>
</template>



<script lang="ts">
  import Vue from 'vue'
  import axios from 'axios'

  export default Vue.extend ({
  data() {
  return {
  msg: "home"
  }
  },
  methods: {
  test() {
  axios
  .get('http://localhost:3000/test',
  {withCredentials: true})
  .then((response) => {
  console.log("it works")
  })
  .catch(err => console.log(err))
  }
  }
  })

</script>

