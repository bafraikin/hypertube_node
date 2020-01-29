<template>
  <v-app-bar color="#BF55EC" dark dense>
    <v-toolbar-title>Hypertubulaire</v-toolbar-title>

    <v-spacer></v-spacer>

    <sign-up/>
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
  </v-app-bar>
</template>

<script>
  import signup from './modal_signup'

  export default {
    data() {
      return {
        arr: ['a', 'c']
      }
    },
    components: {
      "sign-up": signup
  } 
  }
</script>
