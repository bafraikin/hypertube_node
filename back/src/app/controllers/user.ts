import { User } from '@app/models/user'
import { Request, Response } from 'express'
import { inherits } from 'util';
import logger from '@settings/logger';
import picUploadClient from '@app/services/picUpload'
var fs = require('fs');

const fiveMin: number = 300000;

export default class userController {

	static async userProfile(req: Request, res: Response) {
		try {
			let userId = req.query.userId;
			if (userId == undefined)
				throw "userId undefined";
			let user: User | undefined = await User.findOne({ id: userId });
			if (user == undefined)
				throw "user undefined";
			res.status(200).send(user);
		} catch (err) {
			res.status(401).send("error");
		}
	}

	/*
	 ** Fonction de modification du profil si connecter
	 */


	static async updateEmail(req: Request, res: Response) {
		const userid : number | undefined = User.getId(req.user);
		let user: User | undefined = await User.findOne({ id: userid });
		if (user instanceof User && !user.isEmpty()) {
			user.email = req.body.email;
			if (!(await user.isEmailTaken()) && user.isValid()) {
				user.save();
				res.status(200).send(true);
				return;
			}
		}
		res.status(405).send(false);
		return;
	}

	static async updatePassword(req: Request, res: Response) {
		const userid : number | undefined = User.getId(req.user);
		let user: User | undefined = await User.findOne({ id: userid });
		if (user instanceof User && !user.isEmpty()) {
			user.password = req.body.password;
			if (user.checkPassIsComplex()) {

				user.save();
				res.status(200).send(true);
				return;
			}
		}
		res.status(405).send(false);
		return;
	}

	static async updateLogin(req: Request, res: Response) {
		const userid : number | undefined = User.getId(req.user);
		let user: User | undefined = await User.findOne({ id: userid });
		if (user instanceof User && !user.isEmpty()) {
			user.login = req.body.login;
			if (user.isValid()) {
				user.save();
				res.status(200).send(true);
				return;
			}			}
		res.status(405).send(false);
		return;
	}


	static async updateLastname(req: Request, res: Response) {
		const userid : number | undefined = User.getId(req.user);
		let user: User | undefined = await User.findOne({ id: userid });
		if (user instanceof User && !user.isEmpty()) {
			user.lastName = req.body.lastName;
			if (user.isValid()) {
				user.save();
				res.status(200).send(true);
				return;
			}
		}
		res.status(405).send(false);
		return;
	}

	static async updateFirstname(req: Request, res: Response) {
		const userid : number | undefined = User.getId(req.user);
		let user: User | undefined = await User.findOne({ id: userid });
		if (user instanceof User && !user.isEmpty()) {
			user.firstName = req.body.firstName;
			if (user.isValid()) {
				user.save();
				res.status(200).send(true);
				return;
			}
		}
		res.status(405).send(false);
		return;
	}

	static async updateImageUrl(req: Request, res: Response) {
		const userid : number | undefined = User.getId(req.user);
		let user: User | undefined = await User.findOne({ id: userid });
		let copyReq: any = req;
		if (user instanceof User && !user.isEmpty() && copyReq.files != null){
			let isValidPic: any = await picUploadClient.validPicture(copyReq.files);
			if (isValidPic == true) {
				picUploadClient.modifyPicToUserPic(copyReq, user);
				res.status(200).send(true);
				return;
			}
		}
		res.status(405).send(false);
		return;
	}	
	static async updateLang(req: Request, res: Response){
		const userid : number | undefined = User.getId(req.user)
		let user: User | undefined = await User.findOne({ id: userid });
		if (user instanceof User && !user.isEmpty()) {
			['en', 'fr'].includes(req.body.lang) ? user.lang = req.body.lang : 0;
			if (user.isValid()) {
				user.save();
				res.status(200).send(true);
				return;
			}
		}
		res.status(405).send(false);
		return;
	}


	/*
	 ** Fin des fonction update
	 */


	static async startResetPassword(req: Request, res: Response) {
		let user: User | undefined = await User.findOne({ email: req.body.email });
		if (user instanceof User && !user.isEmpty()) {
			if ((Date.now() - user.tokenPassDate) > (fiveMin / 10)) {
				user.initResetPassword();
			}
		}
		res.status(200).send(true);
		return;
	}

	/*
	 ** il faut dans la requete post email + newPassword 
	 */
	static async  endResetPassword(req: Request, res: Response) {
		try {
			let user: User | undefined = await User.findOne({ email: req.body.email });
			if (user instanceof User && !user.isEmpty()) {
				if ((Date.now() - user.tokenPassDate) < fiveMin && await user.validateTokenPass(req.body.token)) {
					user.password = req.body.newPassword;
					if (user.checkPassIsComplex()) {
						user.tokenPass = "false";
						user.tokenPassDate = 0;
						await user.setPassword(user.password);
						user.save();
						res.status(200).send(true);
						return;
					}
				}
				res.status(401).send(false);
				return;
			}
		}
		catch {
			logger.info("Someone is tickering with endResetPassword on controller user.ts \n Or an error as occured ");
			res.status(405).send(false);
			return;
		}
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
		['en', 'fr'].includes(req.body.lang) ? user.lang = req.body.lang : 0;
		user.imageUrl = copyReq.session.random + user.email;//**********************************
		user.oauth = false;
		if (user.isValid() && !(await user.isEmailTaken()) && copyReq['session'].validPic == true) {
			await user.setPassword(user.password);
			user.save();
			res.status(201).send(true);
			picUploadClient.movePicToUserPic(user.email, copyReq);
			return;
		}
		else{
			res.status(401).send("false");
		}
	}

	static getCookie(req: Request, res: Response){
		let copyReq: any = req;
		copyReq['session'].id  = true;
		res.status(200).send("Your cookies sir!");
	}

	static async saveProfilePic(req: Request, res: Response){
		let copyReq: any = req;
		if (copyReq.files == null){
			res.send("vide");
		}
		else{
			let isValidPic: any = await picUploadClient.validPicture(copyReq.files);
			if (isValidPic === true){
				if (copyReq.session.random != undefined){
					try{
						fs.unlinkSync('/back/public/tmpValid/'+ copyReq.session.random);
					}
					catch(e){}
				}


				copyReq['session'].validPic = true;
				let random:any = Math.floor((Math.random() * 10000) + 1);
				let maRep :any = {};
				maRep.expressSig = random;
				copyReq.session.random = random;

				picUploadClient.movePicToTmpValid(copyReq);
				maRep.status = "sucess";
				res.status(200).send(maRep);
			}
			else {
				copyReq['session'].validPic = false;
				res.status(401).send(isValidPic);
			}
		}

	}

}
