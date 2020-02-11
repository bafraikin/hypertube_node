import {Request, Response} from 'express';
import { Comment } from '../../app/models/comment';
import { Movie } from '../../app/models/movies';
import { User } from '../../app/models/user';
const axios = require('axios');


export default class commentController {

	static create(params: any){
		let comment = new Comment;
		comment.userId = params.userId;
		comment.date = "la date bebe";
		comment.movieImdbCode = params.movieImdbCode;
		comment.movieTitle = params.movieTitle;
		comment.content = params.content;
		comment.save();
		return comment;
	}

	static async getComments(req: Request, res: Response) {
		let movieImdbCode = req.body.movieImdbCode;
		let movieTitle = req.body.movieTitle;
		let comments :any  = await  Comment.find({ movieImdbCode: movieImdbCode, movieTitle: movieTitle });
		let index = 0;
		while (index < comments.length){
			const user : any = await User.findOne({ id: comments[index].userId });
			comments[index].login = user.login;
			index++;
		}
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
		let comment = commentController.create(params);
		res.send(comment);
	}

}
