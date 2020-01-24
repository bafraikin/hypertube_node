<template>
<div id="lalou" >

<div>
    <form v-on:submit="submitForm" action="#" method="post">
        <input type="text" v-model="idMovie" placeholder="Imdb ID">
        <input type="submit" name="submit" value="Submit">
    </form>
</div>

<div id="lali" v-if="idMovie != null && tab_info != null">
    <h1>{{ tab_info.Title }}</h1>
    <img :src="tab_info.Poster">
    <p><b>Director</b> : {{ tab_info.Director }}</p>
    <p><b>Writer</b> : {{ tab_info.Writer }}</p>
    <p><b>Actors</b> : {{ tab_info.Actors }}</p>
    <p><b>Genre</b> : {{ tab_info.Genre }}</p>
    <p><b>Year</b> : {{ tab_info.Year }}</p>
    <p><b>Runtime</b> : {{ tab_info.Runtime }}</p>
    <p><b>Country</b> : {{ tab_info.Country }}</p>
    <p><b>Resume</b> : {{ tab_info.Plot }}</p>
</div>

</div>
</template>


<script>
import axios from 'axios';

export default {
	name: 'info_film',
	data() {
		return {
			idMovie: null,
            tab_info: null,
		}
	},
	methods:{
        submitForm(e){
            e.preventDefault();
            this.getInfo(this.idMovie);
        },
	    getInfo(id){
            axios
            .post('http://localhost:3000/film-info', {
                idNumber: id
            })
            .then((response) => {
                if(response.status == 200){
                    this.tab_info = response.data;
                    console.log(this.tab_info);
                }
                else{
                    console.log('pb');
                }
            })
        }
	},
	mounted(){
		console.log("hello");
	}
}
 </script>