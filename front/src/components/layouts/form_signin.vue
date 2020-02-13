<template>
  <div>
    <v-form
      ref="form"
      v-model="valid"
      :lazy-validation="lazy"
    >
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      >
        <v-icon>fas fa-lock</v-icon>
      </v-text-field>

      <v-text-field
        v-model="password"

        :rules="passwordRules"
        label="Password"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        @click:append="showPassword = !showPassword"
        required
      ></v-text-field>


      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="requestForm"
      >
        Validate
      </v-btn>
    </v-form>
    <oauth> </oauth>
  </div>
</template>

<script> 

  import axios from '@/config/axios_default'
  import oauth from '@/components/layouts/oauth.vue';

  export default {
    data: () => ({
      valid: true,
      password: '',
      email: '',
      lazy: false,
      showPassword: false,
      passwordRules: [
        v => !!v || 'Password is required',
        v=> (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*.{8,250}$/.test(v)) || 'Password must contains moult truc',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
    }),
    components: {
		"oauth": oauth,
	},
	
    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }
      },
      reset () {
        this.$refs.form.reset()
      },
      async requestForm() {
        let response = await axios.post(
          '😱/authentication', 
          {
            email: this.email,
            password: this.password
          })
          .then((response) => {
            return response
          })
          .catch((err) => {
            return false
          })
        if (response !== false) {
             this.$emit('connected');
             this.$store.commit('connectUser', response)
        }
      }
    },
  }
</script>
