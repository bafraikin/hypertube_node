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
        :rules="[ nameRules ]"
        required
      ></v-text-field>

      <v-text-field
        v-model="email"
        :rules="[ emailRules ]"
        label="E-mail"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        :rules="[ passwordRules ]"
        :label="$t('password')"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        @click:append="showPassword = !showPassword"
        required
      ></v-text-field>

      <v-text-field
        :label="$t('firstname')"
        v-model="firstName"
        :rules="[ nameRules ]"
        required
      ></v-text-field>

      <v-text-field
        :label="$t('lastname')"
        v-model="lastName"
        :rules="[ nameRules ]"
        required
      ></v-text-field>

      <v-checkbox
        v-model="checkbox"
        :rules="[v => !!v || this.$t('mustagree')]"
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
      qqch: '',

      valid: true,
      password: '',
      showPassword: false,
      email: '',
      checkbox: false,
      lazy: false,
    }),
    components: {
		"oauth": oauth,
	},

    methods: {
      passwordRules (value) {
        if (value.length === 0){
          return this.$t('pwdrequired');
        }
        else if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*.{8,255}$/.test(value)){
          return this.$t('pwdrules');
        }
        return true;
      },
      emailRules (value) {
        if (value.length === 0){
          return this.$t('emailrequired');
        }
        else if (/.+@.+\..+/.test(value)){
          return this.$t('emailvalid');
        }
        return true;
      },
      nameRules (value) {
        if (value.length === 0){
          return this.$t('fieldrequired');
        }
        return true;
      },
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
            lang: this.$store.state.lang
          })
          .then((response) => {
            this.$emit("created");
          })
          .catch((error) => {
          })
      },
    },
    mounted(){
      this.qqch = "blabla"
    }
  }
</script>
