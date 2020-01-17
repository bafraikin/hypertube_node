<template>
	<div id="lala">
		<h1>This is the film list page</h1>
		<h2>{{superMessage}}</h2>
		<p>{{testApi}}</p>
	</div>
</template>

<script>

import axios from 'axios';

export default {
	name: 'home',
	data() {
		return {
			superMessage: "mon super message ici ci", 
			testApi: null
		}
	},
	mounted(){
		axios
			.get('http://localhost:3000/test')
			.then(response => (this.testApi = response.data.coucou))
	}
}
</script>
