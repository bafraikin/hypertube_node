import {Request, Response} from 'express';
import { Movie } from '@app/models/movies';
import {Filter, TMDBClientSearch, TMDBClientDiscover} from '@app/services/OMDB'
const fs = require('fs');
import axios from 'axios';

export default class moviesController {

	static async theMovieDB	(req: Request, res: Response) {
		try {
			let url: string;
			let apiClient : any;
			if (req.query.queryString == undefined || req.query.queryString == '') {
				let filter = req.query;
				let movieFilter: Filter = {
					firstYear: Number(filter.firstYear),
					lastYear: Number(filter.lastYear),
					minMark: Number(filter.minMark),
					maxMark: Number(filter.maxMark)
				};
				apiClient = new TMDBClientDiscover(movieFilter);
			}
			else{
				apiClient = new TMDBClientSearch(req.query.queryString);
			}

			let response : any = await apiClient.getPage(1);
			res.send(response.data.results);
		} catch (err) {
			res.status(401).send("error")
		}
	}

	static async getMovieDetail(req: Request, res: Response){
		let OMDBid = req.query.OMDBid;
		let url = "https://api.themoviedb.org/3/movie/" + OMDBid + "?api_key=985a541e7e320d19caa17c030cec0d8d&language=en-US";
		let response = await axios.get(url);
		let movieDetail = response.data;
		res.send(movieDetail);
	}

}

