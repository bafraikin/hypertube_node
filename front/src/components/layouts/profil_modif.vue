<template>
  <div>
    <v-form ref="form" v-model="valid" :lazy-validation="lazy">
      <v-text-field label="Login" v-model="login" :rules="[ nameRules ]" required></v-text-field>
      <v-btn color="success" class="mr-4" @click="reqNewLogin">{{ $t('validate') }}</v-btn>
    </v-form>

    <v-form ref="form" v-model="valid" :lazy-validation="lazy">
      <v-text-field v-model="email" :rules="[ emailRules ]" label="E-mail" required></v-text-field>
      <v-btn color="success" class="mr-4" @click="reqNewEmail">{{ $t('validate') }}</v-btn>
    </v-form>

    <v-form ref="form" v-model="valid" :lazy-validation="lazy">
      <v-text-field
        v-model="password"
        :rules="[ passwordRules ]"
        :label="$t('password')"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        @click:append="showPassword = !showPassword"
        required
      ></v-text-field>
      <v-btn color="success" class="mr-4" @click="reqNewpass">{{ $t('validate') }}</v-btn>
    </v-form>

    <v-form ref="form" v-model="valid" :lazy-validation="lazy">
      <v-text-field :label="$t('firstname')" v-model="firstName" :rules="[ nameRules ]" required></v-text-field>
      <v-btn color="success" class="mr-4" @click="reqNewFName">{{ $t('validate') }}</v-btn>
    </v-form>

    <v-form ref="form" v-model="valid" :lazy-validation="lazy">
      <v-text-field :label="$t('lastname')" v-model="lastName" :rules="[ nameRules ]" required></v-text-field>
      <v-btn color="success" class="mr-4" @click="reqNewLName">{{ $t('validate') }}</v-btn>
    </v-form>
  
    <v-form ref="form" v-model="valid" :lazy-validation="lazy">
      <span>{{ $t('language') }} : </span>
      <language />
      <v-btn color="success" class="mr-4" @click="reqNewLang">{{ $t('validate') }}</v-btn>
    </v-form>
    </div>
</template>

<script>
import axios from "@/config/axios_default";
import language from "./LangButton";

export default {
  data: () => ({
    login: "",
    firstName: "",
    lastName: "",

    valid: true,
    password: "",
    showPassword: false,
    email: "",
    checkbox: false,
    lazy: false,
  }),
  components: {
    language
  },
  methods: {
    passwordRules(value) {
        if (value.length === 0){
          return this.$t('pwdrequired');
        }
        else if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*.{8,255}$/.test(value)){
          return this.$t('pwdrules');
        }
        return true;
    },
    emailRules(value) {
        if (value.length === 0){
          return this.$t('emailrequired');
        }
        else if (/.+@.+\..+/.test(value)){
          return this.$t('emailvalid');
        }
        return true;
    },
    nameRules(value) {
        if (value.length === 0){
          return this.$t('fieldrequired');
        }
        else if (value.length > 0 && value.length < 251){
          return this.$t('namerules');
        }
        return true;
    },
    reqNewLogin() {
      axios.put(
        "😂/updateLogin",
        {
          login: this.login
        }
          ).then(response => {
            console.log(response);
          })
          .catch(error => {});
    },
    reqNewEmail() {
      axios.put(
        "😂/updateEmail",
        {
          email: this.email
        }
          ).then(response => {
            console.log(response);
          })
          .catch(error => {});
    },
    reqNewpass() {
      axios.put(
        "😂/updatePassword",
        {
          password: this.password
        }
          ).then(response => {
            console.log(response);
          })
          .catch(error => {});
    },
    reqNewFName() {
      axios.put(
        "😂/updateFirstname",
        {
          firstName: this.firstName
        }
          ).then(response => {
            console.log(response);
          })
          .catch(error => {});
    },
    reqNewLName() {
      axios.put(
        "😂/updateLastname",
        {
          lastName: this.lastName
        }
          ).then(response => {
            console.log(response);
          })
          .catch(error => {});
    },
    reqNewLang() {
      axios.put(
        "😂/updateLang",
        {
          lang: this.$store.state.lang
        }
      ).then(response => {
        console.log(response);
      })
      .catch(error => {});
    }
  }
};
</script>
