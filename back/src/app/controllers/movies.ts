import {Request, Response} from 'express';
import { Movie } from '../../app/models/movies'
const axios = require('axios');


export default class moviesController {

	static create() {
		const movie = new Movie();
	}
	// *** on regarde si le film existe
	//on regarde le statut du film : noExist / downloaded / downloadOnGoing
	//if no Exist on le telecharge
	//on renvoi la liste des films avec leur statut

	static async deleteAllMovies(req: Request, res: Response) {
		const allMovies = await Movie.find();
		for (const property in allMovies) {
  			allMovies[property].remove();
		}
		res.send("movies delete")
	}

	static async getDownload(req: Request, res: Response){
		console.log("On ext allllllllllllllllllllllllllllllllllllllllllllllllllllllllll");
		var allMovies = await Movie.find();
		var hereMovie = JSON.stringify(allMovies)
		res.send(hereMovie);
	}

	static async postDownload(req: Request, res: Response) {
		var url = req.body.url;
		var hash = req.body.hash;
		var title = req.body.title;
		if (req.body.url != undefined && req.body.hash != undefined && req.body.title != undefined){
			const movieSearch = await Movie.findOne({ hash: hash, url: url});
			if (movieSearch == undefined){
				var movie = new Movie;
				movie.title = title;
				movie.hash = hash;
				movie.imageUrl = "la super image url du film";
				movie.url = url;
				movie.buildMagnetLink();
				movie.downloadStatus = "notStarted"
				console.log("On save");
				await movie.save();
			}
			else{
				var movie = movieSearch;
			}
			if (movie.downloadStatus == "notStarted"){
				movie.downloadMovie();
			}
		}
		console.log("On get");
		moviesController.getDownload(req, res);
	}

	static ytsApiQueryString(req: Request, res: Response) {
		var stringResearch = req.body.queryString;
		stringResearch = encodeURI(stringResearch);
		console.log("on recherche");
		console.log(stringResearch);
		var url = 'http://yts.tl/api/v2/list_movies.json?query_term='+ stringResearch;
		console.log(url);
		axios
		.get(url)
		.then((response: any) => {
			if (response.status == 200){
				//console.log(response.data)
				//console.log(typeof (response.data));
				res.send(response.data);
			}
			else{
				console.log("erro in api");
				res.send("error");
			}
		})
	}



}
