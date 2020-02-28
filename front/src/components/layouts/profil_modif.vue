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

    <v-form ref="form" v-model="valid" :lazy-validation="lazy">
		  <v-file-input
			  :label="$t('uploadfile')"
   			:rules="[ fileRules ]"
   			v-model="file_pic" 
			@change="filesChange($event)"
			>
		  </v-file-input>
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
    file_pic: null,
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
    fileRules(value) {
        if (value == null){
          return this.$t('picrequired');
        }
        else if (value.size > 2000000){
          return this.$t('sizeover');
        }
        else if (value.size <= 0){
          return this.$t('fileempty');
        }
        else if (value.type != 'image/png' || value.type != 'image/jpeg'){
          return this.$t('wrongfile');
        }
    },
        //  fileRules: [
        // 	value => !!value || 'A profile pic is required',
        // 	value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
        // 	value => !value || value.size >= 0 || 'Your file is empty',
        // 	value => !value || (value.type == 'image/png' || value.type == 'image/jpeg')|| 'Wrong file type',
        // ]
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
    },
	  filesChange($event) {
		  let formData = new FormData();
      formData.append('file_jerome', this.file_pic);
      if (this.file_pic != null){
			  axios.put( "😂/updateImageUrl", formData)
		  	  .then(response => {
		  	  });
      }
    }
  }
}
</script>