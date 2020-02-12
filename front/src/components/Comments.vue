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
		movie: { type: Object },
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
			console.log("ici");
			console.log(userId);
				this.$router.push({ name: "userProfile", params:{userId: userId}});
		},
		getComments(imdbCode, title){
			axios.get('😂/comment', { params: { imdbCode: this.movie.imdb_code }
				}) .then(response => { this.comments = response.data; })
		},
		submit(event){
			//controle cote client==> plus tard
			event.preventDefault();
			this.postComment();
		},
		postComment(){
			axios.post('😂/comment', { movie: this.movie, content: this.textarea,
				}) .then(response => { this.getComments(); })
			this.textarea = null;
		},
	},
	mounted(){
		this.getComments()
	}
}

</script>
