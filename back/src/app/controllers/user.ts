import { User } from '../../app/models/user'
import {Request, Response} from 'express'

export default class userController {

	static async getUserProfile(req: Request, res: Response) {
		let userId = req.body.userId;
		let user = await  User.findOne({ userId: userId });
		res.send(user);
	}

	static async create(req: Request, res: Response) {
		const user = new User();
		user.email = req.body.email;
		user.login = req.body.login;
		user.firstName = req.body.firstName;
		user.lastName = req.body.lastName;
		user.password = req.body.password;
		user.imageUrl = "http://pngimg.com/uploads/anaconda/anaconda_PNG11.png"; //req.body.img;
		user.oauth = false;
		if (user.isValid() && !(await user.isEmailTaken())) {
			await user.setPassword(user.password);
			user.save();
			res.send("true");
			return;
		}
		res.send("false");
	}

	static async updatePassword(req: Request, res: Response) {
		let user = await  User.findOne({ email: req.body.email });
		if (user instanceof User && !user.isEmpty())
			{
				user.password =  req.body.password;
				if (user.checkPassIsComplex()){
					await user.setPassword(req.body.password);
					user.save;
					res.send(true);
					return;
				}
			}
			res.send(false);
			return;
	}

	static async updateEmail(req: Request, res: Response) {
		let user = await  User.findOne({ email: req.body.email });
		if (user instanceof User && user.isEmpty())
			{
				user.email = req.body.email;
				if (await user.isEmailTaken()){
					user.save;
					res.send(true);
					return;
				}
			}
			res.send(false);
			return;
	}

	static destroy(req: Request, res: Response) {

	}

	static getUser(req: Request, res: Response) {
		res.send(req.user);
	}
}
