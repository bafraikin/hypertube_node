
import { User } from '../../app/models/user'
import {Request, Response} from 'express'


export default class authenticateController {

	static async authStrategy(email: string, password: string, done: Function) {
		const user: User | undefined = await User.findOne({email});
		if (!user)
			return done(null, false)
		else {
			const passwordIsCorrect = await user.validatePassword(password)
			if (passwordIsCorrect){
				console.log("c'est gOd")
				return done(null, {user: user.toJSON()});
			}
			else{
				console.log("le pass est  PAS correct");
				return done(null, false)
			}
		}
	}

	static async deserialize(id: number, done: Function) {
		const user: User = await User.findOne({id}) as User;
		if (user)
			done(null, user)
		else
			done(null, {})
	}

	static serialize(user: User, done: Function) {
		done(null, user.id);
	}

	static authenticateObject(req: Request, res: Response) {
			// If this function gets called, authentication was successful.
			// `req.user` contains the authenticated user.
			res.send(req.user);
	}

	static logout(req: Request, res: Response) {
		req.logout();
		res.redirect('/');
	}


	static checkAuth(req: Request, res: Response, next: Function) {
		if (!req.user)
			{
			res.send({type: "error", data: "a user should be authenticated to acces this path"});
			return;
			}
		console.log("request been accept")
		next();
	}

	static checkNotAuth(req: Request, res: Response, next: Function) {
		if (req.user)
			{
				console.log(req.user)
				res.send({type: "error", data: "a user should not be authenticated to acces this path"});
			}
			next();
	}
}
