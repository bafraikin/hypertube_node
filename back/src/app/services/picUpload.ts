import logger from "@settings/logger";

const fs = require('fs');
const FileType = require('file-type');

export default class picUploadClient {

	static movePicToUserPic(email: any, copyReq: any){
		fs.rename('/back/public/tmpValid/' + copyReq.session.random, '/back/public/userPic/' + copyReq.session.random + email, (callback: any) =>{
		});
	}

	static movePicToTmpValid(copyReq: any){
		copyReq.files.file_jerome.mv('/back/public/tmpValid/'+ copyReq.session.random);
	}

	static modifyPicToUserPic(copyReq: any, user: any){
		let random:any = Math.floor((Math.random() * 10000) + 1);
		user.imageUrl = random + user.email;//**********************************
		user.save();
		copyReq.files.file_jerome.mv('/back/public/userPic/' + user.imageUrl);
	}


	static async validPicture(files: any){
		let check: any = {size: false, type:false};

		const {ext, mime} = await FileType.fromFile(files.file_jerome.tempFilePath) || {};

		if ( (files.file_jerome.mimetype == 'image/png' || files.file_jerome.mimetype == 'image/jpeg') && (mime == 'image/png' || mime == 'image/jpeg'))
			check.type = true;
		else
			check.type = false;

		if (files.file_jerome.size <= 2000000 && files.file_jerome.size >= 0  )
			check.size = true;
		else
			check.size = false;

		if (check.size && check.type){
			return true;
		}
		else{
			try{fs.unlinkSync(files.file_jerome.tempFilePath);}
			catch(e){logger.info(e);}
			return check;
		}
	}


}

