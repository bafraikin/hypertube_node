import {Request, Response} from 'express';
import { User } from '@app/models/user';
import { Watch } from '@app/models/watch';
import { Movie } from '@app/models/movies';
import { connection } from "@settings/connect_pg";
import axios from 'axios';

export default class watchController {

	static async getWatch(req: Request, res: Response) {
		if (req.user instanceof User)
			{
				res.json(await connection.getRepository(Watch).find({select: ["idOMDB"], where: {user: req.user}}));
			}
			else {
				res.status(401).send("error");
			}
	}

	static async postWatch(req: Request, res: Response) {
		let userrr : any = req.user;
		let userId = userrr.id;
		let idOMDB = req.body.idOMDB;
		const user : User | undefined = await User.findOne({ id: userId })
		let watch = new Watch;
		watch.idOMDB = idOMDB;
		watch.user = user;
		watch.save();
		res.status(201).json(watch);
	}

}
