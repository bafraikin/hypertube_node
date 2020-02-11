<template>
	<div>
		<h1 class="ici">User profile</h1>
		<p class="ici" dark>Login ==> {{user.login}}</p>
		<p class="ici" dark>First Name ==> {{user.firstName}}</p>
		<p class="ici" dark>Last Name ==> {{user.lastName}}</p>
		<p class="ici" dark>Image ==> {{user.imageUrl}}</p>
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
		getUserProfile(){
			axios.post('😂/getUserProfile',
				{
					userId: this.userId,
				})
				.then(response => {
					if (response.status == 200){
						this.user = response.data;
					}
				})
		}

	},
	mounted(){
		this.userId = this.$route.params.userId
		this.getUserProfile();
	}
}

</script>
