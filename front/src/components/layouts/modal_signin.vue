
<template>
	<v-row justify="center">
		<v-dialog
			attach="#app"
			v-model="dialog"
			persistent
			max-width="290"
			dark
		>
   <template v-slot:activator="{ on }">
	   <v-btn color="primary" dark v-on="on">Sign In</v-btn>
   </template>
   <v-card>
	   <v-card-title class="headline">Use Google's location service?</v-card-title>
	   <v-card-text>Let Google run the world</v-card-text>
	   <sign-in-form></sign-in-form>
	   <v-card-actions>
		   <v-spacer></v-spacer>
		   <v-btn color="green darken-1" text @click="dialog = false">Disagree</v-btn>
		   <v-btn color="green darken-1" text @click="dialog = false">Agree</v-btn>
	   </v-card-actions>
   </v-card>
		</v-dialog>
	</v-row>
</template>


<script>

import signinform from './signinform'


export default {
	data () {
		return {
			dialog: false,
		}
	},
	components: {
		"sign-in-form": signinform,
	},
}
</script>
