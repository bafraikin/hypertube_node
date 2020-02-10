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
					return done(null, user);
				}
				else {
					return done(null, false)
				}
		}
	}

	static async deserialize(userObject: User, done: Function) {
	console.log(userObject);
		let user: User | undefined = await User.findOne({id: userObject.id});
		if (user instanceof User)
			done(null, user);
		else
			done(null, {});
	}

	static serialize(user: User, done: Function) {
		done(null, user);
	}

	static afterAuth(req: Request, res: Response) {
		// If this function gets called, authentication was successful.
		res.json({type: "success", user: req.user})
	}


	static logout(req: Request, res: Response) {
		req.logout();
		res.json({type: "response", message: "user successfully logout"});
	}

	static checkNotAuth(req: Request, res: Response, next: Function) {
		if (req.user)
		{
			res.status(403).json({type: "error", data: "a user should not be authenticated to acces this path"});
			return;
		}
		next();
	}

	static checkAuth(req: Request, res: Response, next: Function) {
		if (!req.user && req.method != "OPTIONS")
		{
			res.status(401).json({type: "error", data: "a user should be authenticated to acces this path"});
			return;
		}
		next();
	}
}  
