<template>
  <v-card
    dark
    color="#BF55EC"
    :elevation="5"
  >
    <div class="navbar">
      <h2>Hypertubulaire</h2>
      <div class="navbar">
        <sign-up></sign-up>
        <sign-in></sign-in>
        <div data-app='true'> 
          <v-menu>
            <template v-slot:activator="{ on }">
              <v-btn icon  v-on="on">
                <v-icon>mdi-account</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="n in arr"
                :key='n'
                @click="() => {}"
              >
                <v-list-item-title>Option {{ n }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
    </div>
  </v-card>
</template>

<style lang="scss" media="screen">

  .navbar{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .navbar{
  justify-content: space-around;
  width: 15%;
  }
  }

</style>

<script>
  import signup from './modal_signup'
  import signin from './modal_signin'

  export default {
  data() {
  return {
  arr: ['a', 'c']
  }
  },
  components: {
  "sign-up": signup,
  "sign-in": signin
  } 
  }
</script>
