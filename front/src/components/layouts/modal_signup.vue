<template>
    <v-dialog
      attach="#app"
      v-model="dialog"
      max-width="700"
      dark>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on">
          {{ $t('signup') }}
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">{{ $t('createaccount') }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <form-sign-up @created="() => this.dialog = false"/> 
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
</template>


<script>
  import formSignUp from './form_signup'

  export default {
    data() {
      return {
        dialog: false,
      }
    },
    components: {
      'form-sign-up': formSignUp
    }
  }
</script>
