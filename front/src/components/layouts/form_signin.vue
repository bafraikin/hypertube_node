<template>
  <div>
    <v-form ref="form" v-model="valid" :lazy-validation="lazy">
      <v-text-field v-model="email" :rules="[ emailRules ]" label="E-mail" required>
        <v-icon>fas fa-lock</v-icon>
      </v-text-field>

      <v-text-field
        v-model="password"
        :rules="[ passwordRules ]"
        :label="$t('password')"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        @click:append="showPassword = !showPassword"
        required
      ></v-text-field>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="requestForm">{{ $t('validate') }}</v-btn>
      <v-btn :disabled="!valid" color="success" class="mr-4" @click="requestPassword">{{ $t('forgotpwd') }}</v-btn>
    </v-form>
    <oauth></oauth>
  </div>
</template>

<script>
import axios from "@/config/axios_default";
import oauth from "@/components/layouts/oauth.vue";
import bus from "@/config/bus_event";

export default {
  data: () => ({
    valid: true,
    password: "",
    email: "",
    lazy: false,
    showPassword: false,
  }),
  components: {
    oauth: oauth,
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
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    async requestForm() {
      let response = await axios
        .post("😱/authentication", {
          email: this.email,
          password: this.password
        })
        .then(response => {
          return response;
        })
        .catch(err => {
          return false;
        });
      if (response !== false) {
        this.$emit("connected");
        this.$store.commit("connectUser", response);
      }
    },
    async requestPassword() {
      let response = await axios
        .post("😱/forgotPassword", {
          email: this.email,
        })
        .then(response => {
          return response;
        })
        .catch(err => {
          return false;
        });
      if (response !== false) {
        bus.$emit('alert', {type: 'success', code: "CHECK_MAIL"});
        this.$emit("close");
      }
    }
  }
};
</script>
