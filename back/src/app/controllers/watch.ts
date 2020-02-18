import {Request, Response} from 'express';
import { User } from '@app/models/user';
import { Watch } from '@app/models/watch';
import { Movie } from '@app/models/movies';
const axios = require('axios');

export default class watchController {

	static async getWatch(req: Request, res: Response) {
		let userrr : any = req.user;
		let userId = userrr!.id;
		let user = await User.findOne({ id: userId});
		let watchs: any= [];
		if (user!.watchs == undefined){
			res.json(watchs)
		}
		else{
			let i = 0;
			while(i < user!.watchs.length){
				watchs.push(user!.watchs[i].imdbCode);
				i++;
			}
			res.send(watchs);
		}
	}

	static async postWatch(req: Request, res: Response) {
		let params: any = {};
		let userrr : any = req.user;
		params.userId = userrr.id;
		params.imdbCode = req.body.imdbCode;
		params.imdb_code = req.body.imdbCode;
		//verifs des params  ==> plus tard
		let movie = await Movie.getMovie(params);
		const user : User | undefined = await User.findOne({ id: params.userId })
		let watch = new Watch;
		watch.imdbCode = params.imdbCode;
		watch.user = user;
		watch.save();
		res.status(201).json(watch);
	}

}
