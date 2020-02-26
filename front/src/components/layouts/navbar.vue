<template>
  <v-card dark color="#BF55EC" :elevation="5">
    <div class="navbar">
      <h2>
        <router-link to="/" v-slot="{ href, route, navigate}">
          <a :href="href" @click="navigate">Hypertubulaire</a>
        </router-link>
      </h2>

      <div class="navbar">
        <div v-if="!isConnected" class="navbar">
          <sign-up data-app="true" />
          <sign-in data-app="true" />
        </div>

        <div v-else data-app="true">
          <v-menu light bottom left nudge-bottom="35" v-model="showMenu">
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon>mdi-account</v-icon>
              </v-btn>
            </template>

            <v-list data-app="true">
              <v-list-item v-for="n in arr" :key="n.message" @click="() => {}">
                <v-list-item-title @click="n.method">{{ n.message }}</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <router-link :to="{ name: 'userProfile', params: { userId: $store.state.user.id }}" v-slot="{ href, route, navigate}">
                  <v-list-item-title>
                    <a :href="href" style="text-decoration: none; color: unset" @click="navigate">profil</a>
                  </v-list-item-title>
                </router-link>
              </v-list-item>
              <v-list-item>
                <modify-profil />
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
    </div>
  </v-card>
</template>


<script>
  import signup from "./modal_signup";
  import signin from "./modal_signin";
  import profil from "./modal_profil";
  import axios from "@/config/axios_default";


  export default {
    data() {
      return {
        showMenu: false,
        arr: [{message: 'logout', method: this.logout}]
      }
    },
    methods: {
      async logout() {
        const response = await axios.delete("/😂/authentication").then((response) => {
          return true;
        });
        this.$store.commit('disconnectUser')
      },
    },
    computed: {
      isConnected() {
        return this.$store.getters.connected
      }
    },
    components: {
      "sign-up": signup,
      "sign-in": signin,
      "modify-profil": profil
    } 
  };
</script>

<style lang="scss" media="screen">
  .navbar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .navbar {
      justify-content: space-around;
      width: 15%;
    }
    h2 a {
      text-decoration: none;
      color: inherit;
    }
  }
  .v-menu__content {
    left: 0;
    max-width: 100%;
  }
</style>
