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
			res.status(201).send(undefined);
		}
		else{
			res.send(movie.comments);
		}
	}

	static async postComment(req: Request, res: Response) {
		let userrr : any = req.user;
		let userId = userrr.id;
		let imdbCode = req.body.imdbCode;
		let content = req.body.content;
		let movie = await Movie.getMovie(imdbCode);
		const user = await User.findOne({ id: userId })

		let comment = new Comment;
		comment.date = "la date bebe";
		comment.content = content;
		comment.user = user;
		comment.movie = movie;
		await comment.save();
		res.status(201).json(comment);
	}

}
