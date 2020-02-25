import { User } from '@app/models/user'
import {Request, Response} from 'express'

export default class userController {

	static async userProfile(req: Request, res: Response) {
		try {
			let userId = req.query.userId;
			if (userId == undefined)
				throw "userId undefined";
			let user = await  User.findOne({ id: userId });
			if (user == undefined)
				throw "user undefined";
			res.status(200).send(user);
		} catch (err) {
			res.status(401).send("error");
		}
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
			res.status(201).send(true);
			return;
		}
		res.status(400).send("false");
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
			res.status(405).send(false);
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
			res.status(405).send(false);
			return;
	}

	static destroy(req: Request, res: Response) {

	}

	static getUser(req: Request, res: Response) {
		res.send(req.user);
	}


	static saveProfilePic(req: Request, res: Response){
		console.log("************")
		let copyReq: any = req;
		console.log(copyReq.files);
		console.log(req.body);
		res.send("okokokokokokokokok");
	}







}
