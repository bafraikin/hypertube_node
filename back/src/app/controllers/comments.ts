import {Request, Response} from 'express';
import { Comment } from '@app/models/comment';
import { Movie } from '@app/models/movies';
import { User } from '@app/models/user';
const axios = require('axios');

export default class commentController {

	static async getComment(req: Request, res: Response) {
		try {
			let imdbCode = req.query.imdbCode;
			if (!imdbCode || imdbCode == '')
				throw "imdbCode undefined";
			let movie = await Movie.findOne({ imdbCode: imdbCode});
			if (!movie)
				res.status(200).send(undefined);
			else
				res.send(movie.comments);
		} catch (err) {
			res.status(401).send("error");
		}
	}

	static async postComment(req: Request, res: Response) {
		try {
			let userrr : any = req.user;
			if (!userrr)
				throw "user undefined";
			let userId = userrr.id;
			let imdbCode = req.body.imdbCode;
			let content = req.body.content;
			if (!userId || !imdbCode || imdbCode == '' || !content || content == '')
				throw "params missing";
			let movie = await Movie.getMovie(imdbCode);
			if (!movie)
				throw "movie undefined";
			const user = await User.findOne({ id: userId })
			if (!user)
				throw "user undefined";
			let comment = new Comment;
			comment.date = "la date bebe";
			comment.content = content;
			comment.user = user;
			comment.movie = movie;
			await comment.save();
			res.status(201).json(comment);
		} catch (err) {
			res.status(401).send("error");
		}
	}

}
