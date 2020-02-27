var fs = require('fs');

export default class picUploadClient {

	static movePicToUserPic(email: any, copyReq: any){
		fs.rename('/back/public/tmpValid/' + copyReq.session.random, '/back/public/userPic/' + copyReq.session.random + email, (callback: any) =>{
		});
	}

	static movePicToTmpValid(copyReq: any){
		copyReq.files.file_jerome.mv('/back/public/tmpValid/'+ copyReq.session.random);
	}

	static validPicture(files: any){
		let check: any = {};
		check.size = false;
		check.type = false;

		if (files.file_jerome.mimetype == 'image/png' || files.file_jerome.mimetype == 'image/jpeg')
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
		else {
			return check;
		}
	}


}

