<template>
  <v-card
    dark
    color="#BF55EC"
    :elevation="5"
  >
    <div class="navbar">
      <h2>Hypertubulaire</h2>
      <div class="navbar">

        <div v-show="!isConnected" class="navbar" data-app="true"> 
          <sign-up/>
          <sign-in/>
        </div>

        <div v-show="isConnected" data-app='true'> 
          <v-menu>
            <template v-slot:activator="{ on }">
              <v-btn icon  v-on="on">
                <v-icon>mdi-account</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="n in arr"
                :key="n.message"
                @click="() => {}"
              >
                <v-list-item-title @click="n.method">Option {{ n.message }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
    </div>
  </v-card>
</template>


<script>

  import signup from './modal_signup'
  import signin from './modal_signin'
  import axios from "@/config/axios_default"

  export default {
    data() {
      return {
        arr: [{message: 'logout', method: this.logout}]
      }
    },
    methods: {
      async logout() {
        const response = await axios.delete("/😂/authentication").then((response) => {
          return true;
        }); 
        this.$store.commit('disconnectUser')
      }
    },
    computed: {
      isConnected() {
        return this.$store.getters.connected
      }
    },
    components: {
      "sign-up": signup,
      "sign-in": signin
    } 
  }

</script>

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
