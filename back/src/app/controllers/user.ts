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
		// user.imageUrl = "http://pngimg.com/uploads/anaconda/anaconda_PNG11.png"; //req.body.img;
		user.imageUrl = user.email; //req.body.img;
		user.oauth = false;


		console.log("%%%%%%%%%%%%%%%%%%%%%%%%%5");
	console.log(copyReq.session.validPic == true);


		if (user.isValid() && !(await user.isEmailTaken())) {
		console.log("%%%%%%%okokok%%%%%%%%%%%%%%%%%%5");
			await user.setPassword(user.password);
			user.save();
			res.status(201).send(true);
			userController.movePicToUserPic(user.email, copyReq);
			return;
		}
		else{
		console.log("%%%Non %%%%okokok%%%%%%%%%%%%%%%%%%5");
			console.log(user.isValid());
			console.log(!(await user.isEmailTaken()));
			console.log(copyReq.session.validPic);
			res.status(400).send("false ici");
		}
	}

	static movePicToUserPic(email: any, copyReq: any){
		console.log("&&&&&&&&&&&&&&&&&&&&&&");
		console.log("L'id du user:=>");
		console.log(email);
		fs.rename('/back/public/tmpValid/' + copyReq.session._ctx.cookies['express:sess.sig'] , '/back/public/userPic/' + email, (callback: any) =>{
			console.log("ici bebe");
		});
	}

	static movePicToTmpValid(copyReq: any){
		copyReq.files.file_jerome.mv('/back/public/tmpValid/'+ copyReq.session._ctx.cookies['express:sess.sig']);
	}

	static getCookie(req: Request, res: Response){
		let copyReq: any = req;
		copyReq['session'].id  = true;
		res.send("Your cookies sir!");
	}

	static validPicture(files: any){
		let check: any = {};
		console.log(files.file_jerome.mimetype);
		console.log(files.file_jerome.size);
		check.size = true;

		if (files.file_jerome.mimetype == 'image/png' || files.file_jerome.mimetype == 'image/jpeg')
			check.type = true;
		else
			check.type = false;

		if (files.file_jerome.size <= 999999)
			check.size = true;
		else
			check.size = false;


		if (check.size && check.type){
			console.log("le check =>");
			console.log(check);
			return true;
		}
		else {
			return check;
		}
	}

	static saveProfilePic(req: Request, res: Response){
		console.log("************")
		let copyReq: any = req;
		console.log("*******************************");
		console.log(copyReq.session.validPic);
		console.log("*******************************");
		console.log(copyReq.session._ctx.cookies['express:sess']);
		console.log(copyReq.session._ctx.cookies['express:sess.sig']);
		console.log(copyReq.files);
		// copyReq['session'].validPic = true;

		let isValidPic: any = userController.validPicture(copyReq.files);
		if (isValidPic === true){
			copyReq['session'].validPic = true;
			userController.movePicToTmpValid(copyReq);
			let maRep = {};
			maRep.status = "sucess";
			maRep.expressSig = copyReq.session._ctx.cookies['express:sess.sig'];
			res.send(maRep);
		}
		else {
			copyReq['session'].validPic = false;
			res.send(isValidPic);
		}

	}



}
