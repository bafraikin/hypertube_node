
import { User } from '../../app/models/user'


export default class authenticateController {

	static async authStrategy(email: string, password: string, done: Function) {
		const user: User | undefined = await User.findOne({email});
		if (!user)
			done(null, false, { message: "This email doesn't exist" }) as any
		else {
			const passwordIsCorrect = await user.validatePassword(password)

			if (passwordIsCorrect)
				done(null, user.toJSON())
			else
				done(null, false, { message: 'Wrong password' }) as any
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
}  
