<template>
    <v-dialog
      attach="#app"
      v-model="dialog"
      max-width="700"
      dark>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on">
          {{ $t('signin') }}
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">{{ $t('signinaccount') }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <form-sign-in @connected="() => this.dialog= false" @close="() => this.dialog= false" ></form-sign-in>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
</template>


<script>

  import formSignIn from './form_signin';


  export default {
    data () {
      return {
        dialog: false,
      }
    },
    components: {
      "form-sign-in": formSignIn,
    },
  }
</script>
