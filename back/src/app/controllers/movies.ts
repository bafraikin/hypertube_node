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
		let firstYear = "&primary_release_date.gte=2014-09-15";
		let lastYear = "&primary_release_date.lte=2014-10-22";
		let firstNote = "&vote_average.gte=5";
		let lastNote = "&vote_average.lte=7";
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

	static async performQuery(url: string){


		return (response.data.results);


		// axios.get(url).then((response: any) => {
		// 	if (response.status == 200){
		// // return resolve(response.data.results);
		// 		console.log("Dans la perform >>>>>>>>>>>>>>>>>");
		// 		console.log(response.data.results);
		// return (response.data.results);
		// 	}
		// 	else{
		// 		console.log("erro in api");
		// 		throw "erOr icici";
		// 	}
		// })
	}

	static filter(movies: any, filter: any) {
		filter.genre = filter.genre.map(x=>+x);
		console.log("11******************%%%%%%%%%%%%%*****************");
		console.log(typeof movies);
			console.log(movies);
		movies = movies.filter((movie: any) => (movie.vote_average >= filter.firstNote && movie.vote_average <= filter.lastNote));
		console.log("22******************%%%%%%%%%%%%%*****************");
		console.log(typeof movies);
			console.log(movies);
		movies = movies.filter((movie: any) => (moment(movie.release_date).isBefore(filter.lastYear) &&  moment(movie.release_date).isAfter(filter.firstYear)));
		console.log("33******************%%%%%%%%%%%%%*****************");
		console.log(typeof movies);
			console.log(movies);
		movies = movies.filter((movie: any) => (movie.genre_ids.some(r=> filter.genre.indexOf(r) >= 0)));
		console.log("44******************%%%%%%%%%%%%%*****************");
		console.log(typeof movies);
			console.log(movies);
		return movies;
	}

	static async theMovieDB(req: Request, res: Response) {
		let url: string;
		let movies;
		if (req.query.queryString == undefined){
			url = moviesController.getDefaultUrl_filter(req.query);
			movies = await moviesController.performQuery(url);
		}
		else{
			url = moviesController.getDefaultUrl_query_string(req.query.queryString);
			let response = await axios.get(url);
			movies = response.data.results;
			// movies = moviesController.performQuery(url);
			console.log("******************%%%%%%%%%%%%%*****************");
			console.log(typeof movies);
			console.log(movies);
			movies = moviesController.filter(movies, req.query);
		}
		console.log("******************%%%%%%%%%%%%%*****************");
		console.log(typeof movies);
		console.log(movies);


		res.send(movies)
	}


	static ytsApiQueryString(req: Request, res: Response) {
		var stringResearch = req.body.queryString;
		stringResearch = encodeURI(stringResearch);
		var url = 'http://yts.mx/api/v2/list_movies.json?query_term='+ stringResearch;
		axios .get(url)
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
