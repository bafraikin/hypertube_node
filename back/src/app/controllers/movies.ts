import {Request, Response} from 'express';
import { Movie } from '@app/models/movies';
import {Filter, TMDBClientSearch, TMDBClientDiscover} from '@app/services/OMDB'
import axios from 'axios';

export default class moviesController {

	static async searchForMovies(req: Request, res: Response) {
		try {
			let url: string;

			let apiClient : any;
			if (!req.query.page)
				throw "error";
			if (req.query.queryString == undefined || req.query.queryString == '') {
				let filter = req.query;
				let movieFilter: Filter = {firstYear: Number(filter.firstYear), lastYear: Number(filter.lastYear), minMark: Number(filter.minMark), maxMark: Number(filter.maxMark), genders: filter.gender};
				apiClient = new TMDBClientDiscover(movieFilter);
			}
			else{
				apiClient = new TMDBClientSearch(req.query.queryString);
			}
			let response : any = await apiClient.getPage(req.query.page);
			res.send(response.data.results)
		} catch (err) {
			console.log(err);
			res.status(400).send("error")
		}
	}

	static async getMovieDetail(req: Request, res: Response) {
		try {
			let OMDBid = req.query.OMDBid;
			let url = "https://api.themoviedb.org/3/movie/" + OMDBid + "?api_key=" + process.env.OMDB_KEY + "&language=en-US";
			let response = await axios.get(url);
			let movieDetail = response.data;
			res.send(movieDetail);
		} catch (err) {
			res.status(400).send("error")
		}
	}

	static async getMovieCasting(req: Request, res: Response) {
		try {
			let OMDBid = req.query.OMDBid;
			let url = "https://api.themoviedb.org/3/movie/" + OMDBid + "/credits" + "?api_key=" + process.env.OMDB_KEY;
			let response = await axios.get(url);
			let movieDetail = response.data;
			res.send(movieDetail);
		} catch (err) {
			res.status(400).send("error")
		}
	}

}
