
import { User } from '../../app/models/user'
import {Request, Response} from 'express'


export default class authenticateController {

	static async authStrategy(email: string, password: string, done: Function) {
	console.log();
		const user: User | undefined = await User.findOne({email});
		if (!user)
			return done(null, false)
		else {
			const passwordIsCorrect = await user.validatePassword(password)
			console.log('Le password result =>');
				console.log(passwordIsCorrect);

			if (passwordIsCorrect){
				console.log('🙃');
				return done(null, user.toJSON());
				}
			else
				console.log(':)');
				return done(null, false)
		}
	}

	static async deserialize(id: number, done: Function) {
		const user: User = (await User.findOne({id}) as User);
		if (user)
			done(null, user)
		else
			done(null, {})
	}

	static serialize(user: User, done: Function) {
		done(null, user.id);
	}

	//static authenticateObject():{} {
	//	return { 
	//		//successRedirect: '/',
	//		successRedirect: '/success-sign-in',
	//		failureRedirect: '/login',
	//		failureFlash: false,
	//		successFlash: false 
	//	}
	//}

	static logout(req: Request, res: Response) {
		req.logout();
		res.redirect('/');
	}
}  
