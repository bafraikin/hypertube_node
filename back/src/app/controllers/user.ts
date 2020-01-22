import { User } from '../../app/models/user'
import {Request, Response} from 'express'
import {validate} from 'class-validator'

export default class userController {

	static create(req: Request, res: Response) {
		const user = new User();
		user.email =req.body.email;
		user.pseudo = req.body.pseudo;
		user.firstname = req.body.firstname;
		user.lastname = req.body.lastname;
		user.password = req.body.password;
		user.imageUrl = req.body.img;
		validate(user).then(errors => { // errors is an array of validation errors
				if (errors.length > 0) {
				res.send(errors);
				} else if(!(/([0-9].*([a-z]|[A-Z]))|(([a-z]|[A-Z]).*[0-9])/.test(req.body.password))) {
				res.send("{error: \"Password must containe at least a number and a letter\"}");
				} else {
				user.save();
				res.send("true");
				}
				});
	}


	static update_password(req: Request, res: Response) {

	}

	static update_email(req: Request, res: Response) {

	}

	static destroy(req: Request, res: Response) {

	}


}
