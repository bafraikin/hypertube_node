import { User } from '../../app/models/user'
import {Request, Response} from 'express'
import {validate} from 'class-validator'

export default class userController {

	static async create(req: Request, res: Response) {
		const user = new User();
		user.email = req.body.email;
		user.pseudo = req.body.login;
		user.firstname = req.body.firstName;
		user.lastname = req.body.lastName;
		user.password = req.body.password;
		user.imageUrl = "test";
		user.oauth = false;



if (await user.isValide() && !(await user.isEmailTaken())){
			user.setPassword(user.password);

		console.log("cl du user ==>");
		console.log(user);
			user.save();
			res.send("true");
			return;
}
		console.log(User.find());
		res.send("false");

	}


	static async updatePassword(req: Request, res: Response) {
		let user = await  User.findOne({ email: req.body.email });
		if (user instanceof User && !(user.isObjectEmpty()))
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
		if (user instanceof User && !(user.isObjectEmpty()))
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

	static test(req: Request, res: Response) {
		res.send("all good");
	}
}
