<template>
	<div>
	<h2>Comments</h2>
	<div v-for="comment in comments">
		<p>{{ comment.login }}</p>
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
		title: { type: String },
	},
	data() {
		return {
			comments: null,
			content: null,
			textarea: null,
		}
	},
	methods:{
		getComments(imdbCode, title){
			axios.post('😂/getComments',
				{
					movieImdbCode: this.imdbCode,
					movieTitle: this.title,
				})
				.then(response => {
					if (response.status == 200){
						console.log("les comments")
						console.log(response);
						this.comments = response.data;
					}
				})
		},
		submit(event){
			//controle cote client==> plus tard
			event.preventDefault();
			console.log(this.textarea);
			this.postComment();
		},
		postComment(){
			axios.post('😂/postComment',
				{
					movieImdbCode: this.imdbCode,
					movieTitle: this.title,
					content: this.textarea,
				})
				.then(response => {
					console.log(response);
					if (response.status == 200){
						console.log(response);
					}
					this.getComments();
				})
		},
	},
	mounted(){
		console.log("On monte les commentaires");
		console.log("le imdb code", this.imdbCode);
		console.log("le title", this.title);
		this.getComments()
	}
}



</script>
