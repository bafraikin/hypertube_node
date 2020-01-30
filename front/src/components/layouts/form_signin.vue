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
        @click="validate"
      >
        Validate
      </v-btn>

    </v-form>
  </div>
</template>




<script>

export default {

    data: () => ({
      valid: true,
      password: '',
        showPassword: false,
      passwordRules: [
        v => !!v || 'Password is required',
        v=> (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*.{8,}$/.test(v)) || 'Password must contains moult truc',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      lazy: false,
    }),

    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }
      },
      reset () {
        this.$refs.form.reset()
      },
    },


}
</script>
