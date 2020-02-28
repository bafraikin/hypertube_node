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
    <v-form ref="form" v-model="valid" :lazy-validation="lazy">
      <v-file-input
        label="Upload profile pic"
        :rules="fileRules"
        v-model="file_pic"
        @change="filesChange($event)"
      ></v-file-input>
    </v-form>
  </div>
</template>

<script>
import axios from "@/config/axios_default";
import bus from "@/config/bus_event";

export default {
  data: () => ({
    login: "",
    firstName: "",
    lastName: "",

    valid: true,
    file_pic: null,
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
    ],
    fileRules: [
      value => !!value || "A profile pic is required",
      value =>
        !value ||
        value.size < 2000000 ||
        "Avatar size should be less than 2 MB!",
      value => !value || value.size >= 0 || "Your file is empty",
      value =>
        !value ||
        value.type == "image/png" || value.type == "image/jpeg" ||
        "Wrong file type"
    ]
  }),

  methods: {
    reqNewLogin() {
      axios
        .put("😂/updateLogin", {
          login: this.login
        })
        .then(response => {
          bus.$emit("alert", { type: "success", code: "DONE" });
        })
        .catch(error => {
          bus.$emit("alert", { type: "error", code: "BAD_INPUT" });
        });
    },
    reqNewEmail() {
      axios
        .put("😂/updateEmail", {
          email: this.email
        })
        .then(response => {
          bus.$emit("alert", { type: "success", code: "DONE" });
        })
        .catch(error => {
          bus.$emit("alert", { type: "error", code: "BAD_INPUT" });
        });
    },
    reqNewpass() {
      axios
        .put("😂/updatePassword", {
          password: this.password
        })
        .then(response => {
          bus.$emit("alert", { type: "success", code: "DONE" });
        })
        .catch(error => {
          bus.$emit("alert", { type: "error", code: "BAD_INPUT" });
        });
    },
    reqNewFName() {
      axios
        .put("😂/updateFirstname", {
          firstName: this.firstName
        })
        .then(response => {
          bus.$emit("alert", { type: "success", code: "DONE" });
        })
        .catch(error => {
          bus.$emit("alert", { type: "error", code: "BAD_INPUT" });
        });
    },
    reqNewLName() {
      axios
        .put("😂/updateLastname", {
          lastName: this.lastName
        })
        .then(response => {
          bus.$emit("alert", { type: "success", code: "DONE" });
        })
        .catch(error => {
          bus.$emit("alert", { type: "error", code: "BAD_INPUT" });
        });
    },
    filesChange($event) {
      let formData = new FormData();
      formData.append("file_jerome", this.file_pic);
      if (this.file_pic != null) {
        axios.put("😂/updateImageUrl", formData).then(response => {});
      }
    }
  }
};
</script>
