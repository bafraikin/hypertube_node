<template>
  <div>



    <v-form
      ref="form"
      v-model="valid"
      :lazy-validation="lazy"
    >

  	  <!-- login -->
      <v-text-field
        label="login"
        v-model="login"
        required
        append-icon="mdi-lead-pencil"
      ></v-text-field>

  	  <!-- mail -->
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        append-icon="mdi-email"
        required
      ></v-text-field>

  	  <!-- password -->
      <v-text-field
        v-model="password"
        :rules="passwordRules"
        label="Password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
             @click:append="showPassword = !showPassword"
        required
      ></v-text-field>

  	  <!-- firstname -->
      <v-text-field
        label="First name"
        v-model="firstName"
        required
        append-icon="mdi-lead-pencil"
      >

      </v-text-field>
  	  <!-- lastname -->
      <v-text-field
        label="lname"
        v-model="lastName"
        required
        append-icon="mdi-lead-pencil"
      ></v-text-field>

  	  <!-- profile_pic -->


      <v-checkbox
        v-model="checkbox"
        :rules="[v => !!v || 'You must agree to continue!']"
        label="Do you agree?"
        required
      ></v-checkbox>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="validate"
      >
        Validate
      </v-btn>

      <v-btn
        color="error"
        class="mr-4"
        @click="reset"
      >
        Reset Form
      </v-btn>
    </v-form>
  </div>

</template>

<script>

import axios from 'axios';


  export default {
    data: () => ({

		login: '',
		firstName: '',
		lastName: '',




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
      checkbox: false,
      lazy: false,
    }),

    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
          this.backCreate();
        }
      },
      reset () {
          this.$refs.form.reset()
      },
      backCreate () {
		  axios
          .post('http://localhost:3000/create', {
				login: this.login,
				email: this.email,
				password: this.password,
				firstName: this.firstName,
				lastName: this.lastName,
          })
          .then((response) => {
			console.log("cl du sign up");
          	  console.log(response);
              if(response.status == 200){
                  console.log(this.response);
              }
          })
          .catch((error) => {
              console.log(error.response);
          })
      },
    },
  }
</script>
