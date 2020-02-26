import { User } from '@app/models/user'
import {Request, Response} from 'express'
var fs = require('fs');

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

	static async create(req: Request, res: Response) {
		let copyReq: any = req;
		const user = new User();
		user.email = req.body.email;
		user.login = req.body.login;
		user.firstName = req.body.firstName;
		user.lastName = req.body.lastName;
		user.password = req.body.password;
		user.imageUrl = user.email;//**********************************
		user.oauth = false;
		if (user.isValid() && !(await user.isEmailTaken()) && copyReq['session'].validPic == true) {
			await user.setPassword(user.password);
			user.save();
			res.status(201).send(true);
			userController.movePicToUserPic(user.email, copyReq);
			return;
		}
		else{
			res.status(400).send("false");
		}
	}

	static movePicToUserPic(email: any, copyReq: any){
		fs.rename('/back/public/tmpValid/' + copyReq.session.random, '/back/public/userPic/' + email, (callback: any) =>{
		});
	}

	static movePicToTmpValid(copyReq: any){
		copyReq.files.file_jerome.mv('/back/public/tmpValid/'+ copyReq.session.random);
	}

	static getCookie(req: Request, res: Response){
		let copyReq: any = req;
		copyReq['session'].id  = true;
		res.send("Your cookies sir!");
	}

	static validPicture(files: any){
		let check: any = {};
		check.size = false;
		check.type = false;

		if (files.file_jerome.mimetype == 'image/png' || files.file_jerome.mimetype == 'image/jpeg')
			check.type = true;
		else
			check.type = false;

		if (files.file_jerome.size <= 9999999)
			check.size = true;
		else
			check.size = false;


		if (check.size && check.type){
			return true;
		}
		else {
			return check;
		}
	}

	static saveProfilePic(req: Request, res: Response){
		let copyReq: any = req;
		let isValidPic: any = userController.validPicture(copyReq.files);
		if (isValidPic === true){
			copyReq['session'].validPic = true;
			let random:any = Math.floor((Math.random() * 10000) + 1);
			let maRep :any = {};
			maRep.expressSig = random;
			copyReq.session.random = random;
			userController.movePicToTmpValid(copyReq);
			maRep.status = "sucess";
			res.send(maRep);
		}
		else {
			copyReq['session'].validPic = false;
			res.send(isValidPic);
		}

	}

}
