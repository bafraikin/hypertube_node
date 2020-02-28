<template>
	<v-container dark>
		<div v-if="cast" style="color:white;">
			<h1 >{{ $t('casting') }}</h1>
			<v-layout row wrap>
				<v-flex xs12 sm6 md4 lg3  v-for="character in cast.slice(0, 5)" :key="cast.cast_id"  >
					<v-card dark v-if="character.profile_path">
						<v-img  height="200px" v-bind:src="buildImg(character.profile_path)" > </v-img>
						<v-card-subtitle >{{ character.name }}</v-card-subtitle>
					</v-card>
				</v-flex>
			</v-layout>
		</div>

		<div v-if="crew" style="color:white;">
			<h1 >{{ $t('producer') }}</h1>
			<v-layout row wrap>
				<v-flex xs12 sm6 md4 lg3  v-for="cre in crew.slice(0, 5)" :key="cre.id"  >
					<v-card dark v-if="cre.profile_path" >
						<v-img  height="200px" v-bind:src="buildImg(cre.profile_path)" > </v-img>
						<v-card-subtitle >{{ cre.name }}</v-card-subtitle>
					</v-card>
				</v-flex>
			</v-layout>
		</div>



	</v-container>
</template>


<script>
import axios from  '@/config/axios_default';

export default {
	data() {
		return {
			cast: [],
			crew: [],
		}
	},
	props: {
		OMDBid: { type: Number }
	},
	methods:{
		buildImg(link){
			return "https://image.tmdb.org/t/p/w500/"+ link;
		},
		getMovieCasting(){
			axios.get('😂/movie-casting', { params: { OMDBid: this.OMDBid } })
				.then(response => {
					this.cast = response.data.cast;
					this.crew = response.data.crew;
					this.crew = this.crew.filter(crew => crew.job == "Executive Producer");
				})
		}
	},
	mounted(){
		this.getMovieCasting();
	}
}

</script>

