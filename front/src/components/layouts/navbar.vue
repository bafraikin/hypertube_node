<template>
   <v-card
    class="mx-auto overflow-hidden"
    tile
  >
  <v-app-bar
    color="deep-purple accent-4"
    dense
    dark
  >
    <v-app-bar-nav-icon class="d-sm-none" @click.stop="showMenu = !showMenu"></v-app-bar-nav-icon>
    <v-toolbar-title>
      <h3 >
          <router-link to="/" v-slot="{ href, route, navigate}">
          <a :href="href" @click="navigate">Hypertubulaire</a>
        </router-link>
    </h3>
  </v-toolbar-title>
    <v-spacer class="d-none d-sm-flex"></v-spacer>

    <v-btn-toggle class="d-none d-sm-flex" v-if="!isConnected"
      shaped
      borderless
    >
      <sign-up/>
      <sign-in/>
    </v-btn-toggle>

    <v-menu  v-else light bottom left nudge-bottom="35"    v-model="showMenuUser">
      <template v-slot:activator="{ on }">
        <v-btn icon  class="d-none d-sm-flex" v-on="on">
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>

      <v-list data-app="true">
        <v-list-item
          v-for="n in arr"
          :key="n.message"
          @click="() => {}"
        >
          <v-list-item-title @click="n.method">{{ n.message }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>




  </v-card>
</template>


<script>

  import signup from './modal_signup'
  import signin from './modal_signin'
  import axios from "@/config/axios_default"

  export default {
    data() {
      return {
        showMenu: false,
        showMenuUser: false,
        arr: [{message: 'logout', method: this.logout}, {message: 'profil', method: this.displayUserProfile} ]
      }
    },
    methods: {
      async logout() {
        const response = await axios.delete("/😂/authentication").then((response) => {
          return true;
        });
        this.$store.commit('disconnectUser')
      },
      displayUserProfile(){
        this.$router.push({ name: "userProfile", params: {userId: this.$store.state.user.id}});
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

    h3 a {
      text-decoration: none;
      color: #00ffdf!important;
    }
  .v-menu__content {
    left: 0;
    max-width: 100%;
  }
</style>
