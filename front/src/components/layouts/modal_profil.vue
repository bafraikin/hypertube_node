<template>
  <v-row justify="center">
    <v-dialog
      attach="#app"
      v-model="dialog"
      max-width="700"
      dark>
      <template v-slot:activator="{ on }">
        <v-list-item v-on="on">
          <v-list-item-title>
          {{ $t('modifyp') }}
          </v-list-item-title>
        </v-list-item>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">{{ $t('userprofile') }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <profil-modif/> 
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>


<script>
  import profilModif from './profil_modif'

  export default {
    data() {
      return {
        dialog: false,
      }
    },
    components: {
      'profil-modif': profilModif
    }
  }
</script>
