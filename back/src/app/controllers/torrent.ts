import {Request, Response} from 'express';
import axios from 'axios';

export default class torrentsController {

	static async getTorrent(req: Request, res: Response) {
		try {
			let imdbCode = req.query.imdbCode;
			let url = 'http://yts.mx/api/v2/list_movies.json?query_term='+ imdbCode;
			let response: any = await axios.get(url);
			res.status(201).send(response.data.data.movies[0].torrents);
		} catch (err) {
			res.status(401).send("error");
		}
	}
	// static async getYtsTorrent(req: Request, res: Response) {
}
