<template>
			<div>
				<img class="ui centered medium image" v-bind:src="'http://img.yts.lt/' + movieDetail.medium_cover_image">
				<h1>{{ movieDetail.title  }}</h1>
				<p>{{  movieDetail.summary }}</p>
				<table class="ui celled table"   >
					<thead>
						<tr>
							<th>Quality</th>
							<th>Torrent link</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="torrent in movieDetail.torrents">
							<td>{{ torrent.quality }}</td>
							<td>
								<i v-on:click="download(movieDetail, torrent)" >Download</i>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
</template>


<script>

import axios from 'axios';
export default {
	props: {
		movieDetail: { type: Object }
	},
	data() {
		return {
			//movieDetail: null,
		}
	},
	methods:{
	},
	mounted(){
		console.log("hello Movies details");
	}
}
</script>
