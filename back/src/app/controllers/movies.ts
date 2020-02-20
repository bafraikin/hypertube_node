import {Request, Response} from 'express';
import { Movie } from '@app/models/movies';
import {Filter, TMDBClientSearch, TMDBClientDiscover} from '@app/services/OMDB'
var moment = require('moment');
const fs = require('fs');
import axios from 'axios';

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

	static async theMovieDB	(req: Request, res: Response) {
		let url: string;

		let apiClient : any;
		if (req.query.queryString == undefined || req.query.queryString == '') {
			let filter = req.query;
			let movieFilter: Filter = {firstYear: Number(filter.firstYear), lastYear: Number(filter.lastYear), minMark: Number(filter.minMark), maxMark: Number(filter.maxMark), genders: filter.gender};
			apiClient = new TMDBClientDiscover(movieFilter);
		}
		else
			apiClient = new TMDBClientSearch(req.query.queryString);
		apiClient.getPage(1).then((response: any)  => {res.send(response.data.results)}).catch((err:any)  => { res.status(401).send("error") });
		return;
	}

	static async getMovieDetail(req: Request, res: Response){
		let OMDBid = req.query.OMDBid;
		let url = "https://api.themoviedb.org/3/movie/" + OMDBid + "?api_key=985a541e7e320d19caa17c030cec0d8d&language=en-US";
		let response = await axios.get(url);
		let movieDetail = response.data;
		res.send(movieDetail);
	}

	static getYtsTorrent(req: Request, res: Response) {
		let imdbCode = req.query.imdbCode;
		let url = 'http://yts.mx/api/v2/list_movies.json?query_term='+ imdbCode;
		axios .get(url)
		.then((response: any) => {
			if (response.status == 200){
				res.send(response.data.data.movies[0].torrents);
			}
			else{
				console.log("erro in api");
				res.status(400).send("error");
			}
		})
	}

	static async player(req: Request, res: Response) {
		let imdbCode = req.params.imdbCode;
		let hash = req.params.hash;
		let url = req.params.url;

		let movie = await Movie.getMovie(imdbCode);
		movie.buildMagnetLink(hash, url);

		const range = req.headers.range;
		if (range) {
			const parts = range.replace(/bytes=/, "").split("-");
			const start = parseInt(parts[0], 10);
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
