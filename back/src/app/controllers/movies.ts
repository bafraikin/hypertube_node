import {Request, Response} from 'express';
import { Movie } from '@app/models/movies';
import {Filter, TMDBClientSearch, TMDBClientDiscover} from '@app/services/OMDB'
import axios from 'axios';

export default class moviesController {

	static async searchForMovies(req: Request, res: Response) {
		try {
			let apiClient : any;
			let lang: string = req.query.lang;
			lang == "fr" ? lang = "fr" : lang = "en-US";
			if (!req.query.page)
				throw "error";
			if (!req.query.queryString  || req.query.queryString == '') {
				let filter = req.query;
				let movieFilter: Filter = {firstYear: Number(filter.firstYear), lastYear: Number(filter.lastYear), minMark: Number(filter.minMark), maxMark: Number(filter.maxMark), genders: filter.gender};
				apiClient = new TMDBClientDiscover(movieFilter, lang);
			}
			else
				apiClient = new TMDBClientSearch(req.query.queryString, lang);
			apiClient.getPage(req.query.page).then((response: any)  => {
				let valid_movie = response.data.results.filter((movie: any) => {return movie.poster_path != null})
				res.send(valid_movie);
			});
		} catch (err) {
			res.status(401).send(err) 
		};
		return;
	}

	static async getMovieDetail(req: Request, res: Response) {
		try {
			let OMDBid = req.query.OMDBid;
			let lang = req.query.lang;
			lang == "fr" ? lang = "fr" : lang="en-US";
			if (!OMDBid)
				throw "OMDBid missing";
			let url = "https://api.themoviedb.org/3/movie/" + OMDBid + "?api_key=" + process.env.OMDB_KEY + "&language=" + lang;
			let response = await axios.get(url);
			let movieDetail = response.data;
			res.status(200).send(movieDetail);
		} catch (err) {
			res.status(400).send(err)
		}
	}

	static async getMovieCasting(req: Request, res: Response) {
		try {
			let OMDBid = req.query.OMDBid;
			if (!OMDBid)
				throw "OMDBid missing";
			let url = "https://api.themoviedb.org/3/movie/" + OMDBid + "/credits" + "?api_key=" + process.env.OMDB_KEY;
			let response = await axios.get(url);
			let movieDetail = response.data;
			res.status(200).send(movieDetail);
		} catch (err) {
			res.status(400).send("error")
		}
	}

}
