import {Request, Response} from 'express';
import { Comment } from '@app/models/comment';
import { Movie } from '@app/models/movies';
import { User } from '@app/models/user';
const axios = require('axios');


export default class commentController {

	static async getComment(req: Request, res: Response) {
		let movieImdbCode = req.query.imdbCode;
		let movie = await Movie.findOne({ imdbCode: movieImdbCode});
		if (movie == undefined){
			res.send(undefined); //Baptiste cette ligne est pour toi
		}
		else{
			res.send(movie.comments);
		}
	}

	static async postComment(req: Request, res: Response) {
		let params: any = {};
		let userrr : any = req.user;

		params.userId = userrr.id;
		params.imdbCode = req.body.imdbCode;
		params.content = req.body.content;
		//verifs des params  ==> plus tard

		let movie = await Movie.getMovie(params.imdbCode);
		const user = await User.findOne({ id: params.userId })
		let comment = new Comment;
		comment.date = "la date bebe";
		comment.content = params.content;
		comment.user = user;
		comment.movie = movie;
		await comment.save();
		res.status(201).json(comment);
	}

}
