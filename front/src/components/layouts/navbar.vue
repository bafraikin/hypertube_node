
<template>
  <div>
    <v-app-bar color="#BF55EC" dark dense>

      <v-toolbar-title>Hypertubulaire</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
      <v-icon>mdi-account</v-icon>
    </v-btn>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component
  export default class Navbar  extends Vue {
  }
</script>
