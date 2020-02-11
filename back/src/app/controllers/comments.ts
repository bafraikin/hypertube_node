import {Request, Response} from 'express';
import { Comment } from '../../app/models/comment';
import { Movie } from '../../app/models/movies';
import { User } from '../../app/models/user';
const axios = require('axios');


export default class commentController {

	static async getComments(req: Request, res: Response) {
		let movieImdbCode = req.body.movieImdbCode;
		console.log("******************");
		console.log("On get");
		console.log(movieImdbCode);
		console.log("******************");
		let movie = await Movie.findOne({ imdbCode: movieImdbCode});
		if (movie == undefined){
			res.send("nothing");
		}
		else{
			res.send(movie.comments); // trouver une autre solution que !
		}
	}

	static async postComment(req: Request, res: Response) {
		let params: any = {};
		let userrr : any = req.user;

		params.userId = userrr.id;
		params.movie = req.body.movie;
		console.log("*********le movie first************");
		console.log(params.movie);
		params.content = req.body.content;
		//verifs des params  ==> plus tard

		let movie = await Movie.getMovie(params.movie);
		console.log("*********le movie************");
		console.log(movie);
		const user = await User.findOne({ id: params.userId })
		let comment = new Comment;
		comment.date = "la date bebe";
		comment.content = params.content;
		comment.user = user;
		comment.movie = movie;
		await comment.save();
		console.log("******************");
		console.log("On post");
		console.log("******************");
		console.log(comment);
		res.send(comment);
	}

}
