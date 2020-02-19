import { User } from '../../app/models/user'
import {Request, Response} from 'express'

export default class authenticateController {

	static async authStrategy(email: string, password: string, done: Function) {
		const user: User | undefined = await User.findOne({email});
		if (!user)
			return done(null, false)
		else {
			const passwordIsCorrect = await user.validatePassword(password)
				if (passwordIsCorrect) {
					return done(null, user);
				}
				else {
					return done(null, false);
				}
		}
	}

	static async oAuthStrategy(accessToken: string , refreshToken: string , profile: any, done: Function) {
		const user: User | undefined = await User.findOne({ email: profile.emails[0].value });
		if (user instanceof User && user.oauth === true) {
			return done(null, user);
		}
		if (user === undefined){
			let newUser = new User();
			newUser.createOAuth(profile);
			try{
				await newUser.save();
				return done(null, newUser);
			}
			catch{
				console.log("error l36 authenticat.ts");
			}
		}
	}

	static async deserialize(userObject: User, done: Function) {
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
			res.status(406).json({type: "error", data: "a user should be authenticated to acces this path"});
			return;
		}
		next();
	}
}  
