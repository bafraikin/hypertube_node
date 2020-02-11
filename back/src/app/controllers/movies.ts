import {Request, Response} from 'express';
import { Movie } from '../../app/models/movies';
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
		let movie = new Movie;
		movie = await movie.getMovie(req.params);
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
