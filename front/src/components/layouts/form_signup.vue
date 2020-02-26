<template>
  <div>
    <v-form
      ref="form"
      v-model="valid"
      :lazy-validation="lazy"
    >

      <v-text-field
        label="Login"
        v-model="login"
        :rules="nameRules"
        required
      ></v-text-field>

      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        :rules="passwordRules"
        :label="$t('password')"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        @click:append="showPassword = !showPassword"
        required
      ></v-text-field>

      <v-text-field
        :label="$t('firstname')"
        v-model="firstName"
        :rules="nameRules"
        required
      ></v-text-field>

      <v-text-field
        :label="$t('lastname')"
        v-model="lastName"
        :rules="nameRules"
        required
      ></v-text-field>

      <v-checkbox
        v-model="checkbox"
        :rules="[v => !!v || 'You must agree to continue!']"
        :label="$t('agree')"
        required
      ></v-checkbox>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="validate"
      >
        {{ $t('validate') }}
      </v-btn>

      <v-btn
        color="error"
        class="mr-4"
        @click="reset"
      >
        {{ $t('resetform') }}
      </v-btn>
    </v-form>
    <oauth> </oauth>
  </div>

</template>

<script>

  import axios from '@/config/axios_default';
  import oauth from '@/components/layouts/oauth.vue';


  export default {
    data: () => ({
      login: '',
      firstName: '',
      lastName: '',

      valid: true,
      password: '',
      showPassword: false,
      email: '',
      checkbox: false,
      lazy: false,
      passwordRules: [
        v => !!v || 'Password is required',
        v=> (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*.{8,255}$/.test(v)) || 'A Maj. letter and a Min. letter and a number and be more than 8 length'],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',],
      nameRules: [
        v => !!v || 'this field is required',
        v => v.length > 0 && v.length < 251 || 'a name should be inside 1 and 250 charactere'],
    }),
    components: {
		"oauth": oauth,
	},

    methods: {
      validate() {
        if (this.$refs.form.validate()) {
          this.snackbar = true
          this.requestForm();
        }
      },
      reset() {
        this.$refs.form.reset()
      },
      requestForm() {
        axios
          .post('😱/user', {
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            password: this.password,
            login: this.login,
          })
          .then((response) => {
            this.$emit("created");
          })
          .catch((error) => {
          })
      },
    },
  }
</script>
