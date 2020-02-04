
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
				return done(null, user.toJSON());
			}
			else{
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

	static checkNotAuth(req: Request, res: Response, next: Function) {
		if (req.user)
			res.send({type: "error", data: "a user should not be authenticated to acces this path"});
		next();
	}

	static checkAuth(req: Request, res: Response, next: Function) {
		if (!req.user)
			res.send({type: "error", data: "a user should be authenticated to acces this path"});
		next();
	}

}  
