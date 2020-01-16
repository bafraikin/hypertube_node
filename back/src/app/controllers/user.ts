
import { User } from '../../app/models/user'
import {Request, Response} from 'express'

export default class userController {

	static create(req: Request, res: Response) {
		const user = new User();
	}

	static update_password(req: Request, res: Response) {

	}

	static update_email(req: Request, res: Response) {

	}

	static destroy(req: Request, res: Response) {

	}

	static test(req: Request, res: Response) {

	}
}
