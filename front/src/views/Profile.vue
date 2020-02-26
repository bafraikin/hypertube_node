<template>
	<div>
		<div v-if="user">
		<h1 class="ici">{{ $t('userprofile') }}</h1>
		<p class="ici" dark>Login == {{user.login}}</p>
		<p class="ici" dark>{{ $t('firstname') }} == {{user.firstName}}</p>
		<p class="ici" dark>{{ $t('lastname') }} == {{user.lastName}}</p>
		<p class="ici" dark>Image == {{user.imageUrl}}</p>
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
