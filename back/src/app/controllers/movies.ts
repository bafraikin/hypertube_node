import {Request, Response} from 'express';
import { Movie } from '@app/models/movies';
var moment = require('moment');
const fs = require('fs');
const axios = require('axios');

export default class moviesController {

	static create() {
		const movie = new Movie();
	}

	static async deleteAllMovies(req: Request, res: Response) {
		const allMovies = await Movie.find();
		for (const property in allMovies) {
			allMovies[property].remove();
		}
		res.send("movies delete")
	}

	static getDefaultUrl_filter(filter: any){
		let url = "https://api.themoviedb.org/3/";
		let service = "discover/movie";
		let apiKey = "?api_key=985a541e7e320d19caa17c030cec0d8d";
		let language = "&language=en-US";
		let sorting = "&sort_by=popularity.desc";
		let adult = "&include_adult=false";
		let video = "&include_video=true";
		let page = "&page=1";
		let firstYear = "&primary_release_date.gte=" + filter.firstYear + "-01-01";
		let lastYear = "&primary_release_date.lte=" + filter.lastYear + "-01-01";
		let firstNote = "&vote_average.gte=" + filter.firstNote;
		let lastNote = "&vote_average.lte=" + filter.lastNote;
		let query = url + service + apiKey + language + sorting + adult + video + page + firstYear + lastYear + firstNote + lastNote;
		return query;
	}

	static getDefaultUrl_query_string(query_string: any){
		let url = "https://api.themoviedb.org/3/";
		let service = "search/movie";
		let apiKey = "?api_key=985a541e7e320d19caa17c030cec0d8d";
		let language = "&language=en-US";
		let queryString = "&query=" + encodeURI(query_string);
		let page = "&page=1";
		let adulte = "&include_adult=false";
		let query = url + service + apiKey + language + queryString + page + adulte;
		return query;
	}

	static filter(movies: any, filter: any) {
		movies = movies.filter((movie: any) => (movie.vote_average >= filter.firstNote && movie.vote_average <= filter.lastNote));
		movies = movies.filter((movie: any) => (moment(movie.release_date).isBefore(filter.lastYear) &&  moment(movie.release_date).isAfter(filter.firstYear)));
		if (filter.genre != undefined){
			filter.genre = filter.genre.map((x: any)=>+x);
			movies = movies.filter((movie: any) => (movie.genre_ids.some((r: any)=> filter.genre.indexOf(r) >= 0)));
		}
		return movies;
	}

	static async theMovieDB(req: Request, res: Response) {
		let url: string;
		let movies;
		console.log(req.query);
		if (req.query.queryString == undefined || req.query.queryString == ''){
			url = moviesController.getDefaultUrl_filter(req.query);
			console.log(url);
			let response = await axios.get(url);
			movies = response.data.results;
		}
		else{
			url = moviesController.getDefaultUrl_query_string(req.query.queryString);
			console.log(url);
			let response = await axios.get(url);
			movies = response.data.results;
			movies = moviesController.filter(movies, req.query);
		}
		res.send(movies)
	}

	static async getMovieDetail(req: Request, res: Response){
		let OMDBid = req.query.OMDBid;
		let url = "https://api.themoviedb.org/3/movie/" + OMDBid + "?api_key=985a541e7e320d19caa17c030cec0d8d&language=en-US";
		let response = await axios.get(url);
		console.log(response);
		let movieDetail = response.data;
		res.send(movieDetail);
	}

	static getYtsTorrent(req: Request, res: Response) {
		let imdbCode = req.query.imdbCode;
		let url = 'http://yts.mx/api/v2/list_movies.json?query_term='+ imdbCode;
		axios .get(url)
			.then((response: any) => {
				if (response.status == 200){
					console.log("***********TORRENT**************");
					console.log(response.data.data.movies[0].torrents);
					res.send(response.data.data.movies[0].torrents);
				}
				else{
					console.log("erro in api");
					res.send("error");
				}
			})
	}

	static ytsApiDefaultList(req: Request, res: Response) {
		const url = 'https://yts.mx/api/v2/list_movies.json';
		axios
			.get(url)
			.then((response: any) => {
				if (response.status == 200){
					res.send(response.data);
				}
				else{
					console.log("erro in api");
					res.send("error");
				}
			})
	}

	static async player(req: Request, res: Response) {
		console.log("params dans player");
		console.log(req.params);
		let movie = await Movie.getMovie(req.params);
		movie.buildMagnetLink(req.params);

		const range = req.headers.range;
		if (range) {
			const parts = range.replace(/bytes=/, "").split("-");
			const start = parseInt(parts[0], 10);
			console.log("le start ==>", start);
			let engine: any = await movie.downloadMovie(start);
			engine.files.forEach( (file: any) => {
				let regex = /mp4/;
				let isMovie = regex.test(file.name);
				if (isMovie){
					let opt = {
						start: start,
						end: file.length
					}
					let stream = file.createReadStream(opt);
					const fileSize = file.length;
					const end = parts[1]
						? parseInt(parts[1], 10)
						: fileSize-1
					const chunksize = (end-start)+1
					console.log("le end ==>", end);
					console.log("le file size", fileSize);
					const head = {
'Content-Range': `bytes ${start}-${end}/${fileSize}`,
'Accept-Ranges': 'bytes',
'Content-Length': chunksize,
'Content-Type': 'video/mp4',
					}
					res.writeHead(206, head);
					stream.pipe(res);
					stream.on('error', function (err: any) {
						res.status(416).send("error in stream");
					})
				}
				else {
					// console.log("ce n'est pas un film");
					// console.log(file.name);
					// file.deselect();
				}
			});

		} else {
			res.status(416).send("error in stream");
		}
	}
}




// var progress = 0;
// stream.on('data', (chunk: any) => {
// 	console.log("received " + chunk.length + " bytes of data");
// progress += chunk.length;
// var pourcentage = Math.round((progress * 100 / file.length));
// console.log("Le pourcentage du total ==>", pourcentage  + "%");
// })
// stream.on('end', () => {
// console.log("Download completed");
// })


// static async listDownload(req: Request, res: Response){
// 	var allMovies = await Movie.find();
// 	var hereMovie = JSON.stringify(allMovies)
// 	res.send(hereMovie);
// }
