<template>
  <div>
    <v-form
      ref="form"
      v-model="valid"
enctype="multipart/form-data"
      :lazy-validation="lazy"
    >

	<v-flex>

    	<v-col>
    <v-img :src="pic_path" height="150" contain ></v-img>
    	</v-col>
    	<v-col>

      <v-text-field
        label="login"
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
        label="Password"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        @click:append="showPassword = !showPassword"
        required
      ></v-text-field>

      <v-text-field
        label="First name"
        v-model="firstName"
        :rules="nameRules"
        required
      ></v-text-field>

      <v-text-field
        label="Last name"
        v-model="lastName"
        :rules="nameRules"
        required
      ></v-text-field>

		  <v-file-input
			label="Upload profile pic"
   			:rules="fileRules"
   			v-model="file_pic" 
			@change="filesChange($event)"
			>
		  </v-file-input>



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
      	  </v-col>

    		</v-flex>


    </v-form>
    <oauth> </oauth>
  </div>

</template>

<script>

  import axios from '@/config/axios_default';
  import oauth from '@/components/layouts/oauth.vue';


  export default {
    data: () => ({

		pic_path: process.env.VUE_APP_frontURL + "/user_default.png",
		file_pic: null,


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
        fileRules: [
        	value => !!value || 'A profile pic is required',
        	value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
        	value => !value || value.size >= 0 || 'Your file is empty',
        	value => !value || (value.type == 'image/png' || value.type == 'image/jpeg')|| 'Wrong file type',
        ]
    }),
    components: {
		"oauth": oauth,
	},

    methods: {
      filesChange($event) {
      	  if (this.file_pic != null){
		let formData = new FormData();
		formData.append('file_jerome', this.file_pic);
			axios.post( "😱/upload-pic", formData)
		  	  .then(response => {
		  	  	  if (response.data.status == "sucess"){
		  	  	  	  this.pic_path = process.env.VUE_APP_backURL + "/tmpValid/" + response.data.expressSig;
		  	  	  }
		  	  });
      	  }

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
          })
          .then((response) => {
            this.$emit("created");
          })
          .catch((error) => {
          })
      },
    },
      mounted(){
		let formData = new FormData();
          axios.get('😱/myCookie').then(response => {
          })
        }
  }
</script>
