
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
				console.log("le pass est correct");
				return done(null, user.toJSON());
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

	static authenticateObject():{} {
		return { 
			successRedirect: '/sucess-sign-in',
			failureRedirect: '/authentication',
			failureFlash: false,
			successFlash: false 
		}
	}

	static logout(req: Request, res: Response) {
		req.logout();
		res.redirect('/');
	}
}  
