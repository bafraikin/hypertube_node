<template>
	<div>
		<h2>Comments</h2>
		<div v-for="comment in comments">
			<p v-on:click="displayUserProfile(comment.user.id)">{{ comment.user.login }}</p>
			<p>{{ comment.content }}</p>
		</div>
		<v-form>
			<v-textarea
			v-model="textarea"
			background-color="white"
			label="Please enter your comment"
			></v-textarea>
			<v-btn class="mr-4" @click="submit">submit</v-btn>
		</v-form>
	</div>
</template>

<style>
#ici{
	background-color: white;
}
</style>


<script>
import axios from  '@/config/axios_default';

export default {
	props: {
		imdbCode: { type: String },
	},
	data() {
		return {
			comments: null,
			content: null,
			textarea: null,
		}
	},
	methods:{
		displayUserProfile(userId){
				this.$router.push({ name: "userProfile", params:{userId: userId}});
		},
		getComments(){
			axios.get('😂/comment', { params: { imdbCode: this.imdbCode }
				}) .then(response => { this.comments = response.data; })
		},
		submit(event){
			event.preventDefault();
			this.postComment();
		},
		postComment(){
			axios.post('😂/comment', { imdbCode: this.imdbCode, content: this.textarea,
				}) .then(response => { this.getComments(); })
			this.textarea = null;
		},
	},
	mounted(){
		this.getComments()
	}
}

</script>
