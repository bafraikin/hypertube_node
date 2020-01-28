<template>
  <div>
    
    <v-row justify="center">
      <v-btn
        dark
        @click.stop="dialog = true"
      >
        sign up
      </v-btn>

      <v-dialog
        v-model="dialog"
        max-width="700"
      >
        <v-card>
          <v-card-title class="headline">Creer ton compte utilisateur</v-card-title>

          <v-card-text>
            Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="green darken-1"
              text
              @click="dialog = false"
            >
              Disagree
            </v-btn>

            <v-btn
              color="green darken-1"
              text
              @click="dialog = false"
            >
              Agree
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>


<script>
  export default {
    data() {
      return {
           dialog: false

      }
    },
  }
</script>
