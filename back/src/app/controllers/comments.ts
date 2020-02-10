import {Request, Response} from 'express';
import { Comment } from '../../app/models/comment';
import { Movie } from '../../app/models/movies';
import { User } from '../../app/models/user';
const axios = require('axios');


export default class commentController {

	static create(params: any){
		console.log("2");
		console.log(params);
		let comment = new Comment;
		comment.userId = params.userId;
		comment.date = "la date bebe";
		comment.movieImdbCode = params.movieImdbCode;
		comment.movieTitle = params.movieTitle;
		comment.content = params.content;
		console.log("3");
		console.log(comment);
		comment.save();
		return comment;
	}

	static async getComments(req: Request, res: Response) {
		var movieImdbCode = req.body.movieImdbCode;
		var  movieTitle = req.body.movieTitle;

		let comments :any  = await  Comment.find({ movieImdbCode: movieImdbCode, movieTitle: movieTitle });
		var index = 0;
		while (index < comments.length){
			const user : any = await User.findOne({ id: comments[index].userId });
			console.log("*************************************");
			console.log(user);
			comments[index].login = user.login;
			console.log(index);
			console.log(user.login);
			console.log(comments[index]);
			index++;
		}

		console.log("comments");
		console.log(comments);

		res.send(comments);
	}

	static async postComment(req: Request, res: Response) {
		//verifs des params  ==> plus tard
		let params: any = {};
		let user : any = req.user;
		params.userId = user.id;
		params.movieImdbCode = req.body.movieImdbCode;
		params.movieTitle = req.body.movieTitle;
		params.content = req.body.content;
		console.log("1");
		console.log(params);
		let comment = commentController.create(params);
		console.log(comment);
		res.send(comment);
	}

}
