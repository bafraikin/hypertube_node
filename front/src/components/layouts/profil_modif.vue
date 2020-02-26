<template>
  <div>
    <v-form ref="form" v-model="valid" :lazy-validation="lazy">
      <v-text-field label="login" v-model="login" :rules="nameRules" required></v-text-field>
      <v-btn color="success" class="mr-4" @click="reqNewLogin">Validate</v-btn>
    </v-form>

    <v-form ref="form" v-model="valid" :lazy-validation="lazy">
      <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
      <v-btn color="success" class="mr-4" @click="reqNewEmail">Validate</v-btn>
    </v-form>

    <v-form ref="form" v-model="valid" :lazy-validation="lazy">
      <v-text-field
        v-model="password"
        :rules="passwordRules"
        label="Password"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        @click:append="showPassword = !showPassword"
        required
      ></v-text-field>
      <v-btn color="success" class="mr-4" @click="reqNewpass">Validate</v-btn>
    </v-form>

    <v-form ref="form" v-model="valid" :lazy-validation="lazy">
      <v-text-field label="First name" v-model="firstName" :rules="nameRules" required></v-text-field>
      <v-btn color="success" class="mr-4" @click="reqNewFName">Validate</v-btn>
    </v-form>

    <v-form ref="form" v-model="valid" :lazy-validation="lazy">
      <v-text-field label="Last name" v-model="lastName" :rules="nameRules" required></v-text-field>
      <v-btn color="success" class="mr-4" @click="reqNewLName">Validate</v-btn>
    </v-form>
  </div>
</template>

<script>
import axios from "@/config/axios_default";

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
    passwordRules: [
      v => !!v || "Password is required",
      v =>
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*.{8,255}$/.test(v) ||
        "A Maj. letter and a Min. letter and a number and be more than 8 length"
    ],
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    nameRules: [
      v => !!v || "this field is required",
      v =>
        (v.length > 0 && v.length < 251) ||
        "a name should be inside 1 and 250 charactere"
    ]
  }),

  methods: {
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
    }
  }
};
</script>
