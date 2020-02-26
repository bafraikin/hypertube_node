<template>
	<div>
		<div v-if="user">
		<h1 class="ici">User profile</h1>
		<p class="ici" dark>Login == {{user.login}}</p>
		<p class="ici" dark>First Name == {{user.firstName}}</p>
		<p class="ici" dark>Last Name == {{user.lastName}}</p>
		<v-img height=200 contain :src="getProfilePic()"></v-img>
		</div>
	</div>
</template>

<style>
.ici{
	color:white;
}
</style>

<script>
import axios from  '@/config/axios_default';

export default {
	data() {
		return {
			userId: null,
			user: null
		}
	},
	methods:{
		getProfilePic(){
			return process.env.VUE_APP_backURL + "/userPic/" + this.user.imageUrl;
		},
		getUserProfile(){
			axios.get('😂/userProfile', { params: { userId: this.userId}
			}) .then(response => { this.user = response.data; })
		}
	},
	mounted(){
		this.userId = this.$route.params.userId
		this.getUserProfile();
	}
}

</script>
