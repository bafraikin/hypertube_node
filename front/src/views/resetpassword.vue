<template>
  <div>
    <v-form ref="form">
      <v-text-field
        v-model="password"
        :rules="passwordRules"
        label="Password"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        @click:append="showPassword = !showPassword"
        required
      ></v-text-field>
            <v-btn color="success" class="mr-4" @click="changepassword">Validate</v-btn>
    </v-form>
  </div>
</template>

<script>
import axios from "@/config/axios_default";
import bus from "@/config/bus_event";

export default {
  data: () => ({
    showPassword: false,
    password: "",
    passwordRules: [
      v => !!v || "Password is required",
      v =>
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*.{8,250}$/.test(v) ||
        "here the regex /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*.{8,250}$/ "
    ]
  }),
  methods: {
    //fn get token and email and new password
    changepassword() {
      axios
        .post("😱/resetPassword", {
          token: this.$route.query.token,
          email: this.$route.query.email,
          newPassword: this.password
        })
        .then(response => {
            bus.$emit('alert', {type: 'success', code: "WELL_DONE"});
        	setTimeout(function(){ window.location= process.env.VUE_APP_frontURL ;}, 1000);
        })
        .catch(err => {
            bus.$emit('alert', {type: 'error', code: "OLD_TOKEN"});
          });
    }
  }
};
</script>
