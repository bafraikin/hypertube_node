<template>
  <v-row justify="center">
    <v-dialog
      attach="#app"
      v-model="dialog"
      max-width="700"
      dark
    >
      <template v-slot:activator="{ on }">
        <v-btn@click.stop="dialog = true">
          sign up
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Create an account</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <form-sign-up/>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>


<script>
  import formSignUp from './form_signup'

  export default {
    data() {
      return {
        dialog: false
      }
    },
    components: {
      'form-sign-up': formSignUp
    }
  }
</script>
