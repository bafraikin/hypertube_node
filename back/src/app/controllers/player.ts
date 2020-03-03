import {Request, Response} from 'express';
import torrentClient from '@app/services/torrent'
import { Movie } from '@app/models/movies';
import logger from '@settings/logger';
import path from "path";

const extensionsThatWeWantToStore = [".mp4", ".webm"];
const extensionsThatWeDontWantToStore = [".avi", ".divx", ".flv", ".mkv", ".mpg", ".mp2", ".mpeg", ".mpe", ".mpv", ".mov", ".ogg", ".swf", ".qt", ".wmv"];

export default class playerController {

	static async stream(req: Request, res: Response) {
		try {
			let magnetLink = req.params.magnetLink;
			const range = req.headers.range;
			if (magnetLink == undefined || range == undefined)
				throw "error in stream parameter";

			const parts = range.replace(/bytes=/, "").split("-");
			const start = parseInt(parts[0], 10);
			let engine: any = await torrentClient.downloadMovie(start, magnetLink);
			engine.files.forEach((file: any) => {
				const extension = path.extname(file.name);
				console.log("Extension  ==>", extension);

				if (extensionsThatWeWantToStore.includes(extension)){
					//torrentClient.streamFile_seconde(file, res, extension, range);
					// res.on('close', () => {
                		// engine.destroy(() => {})
              		// })
					let converter = torrentClient.convertAndStreamFile_seconde(file, res, range);
					//res.on('close', () => {
                		//converter.kill();
						console.log("On ferme ***********************************");
                		//engine.destroy(() => {})
              			//})
				}
				else if (extensionsThatWeDontWantToStore.includes(extension)){
					let converter = torrentClient.convertAndStreamFile_seconde(file, res, range);
					//res.on('close', () => {
                		//converter.kill();
                	//engine.destroy(() => {})
              		//})
				}
				else{
					console.log("On supprime");
					file.deselect();
				}
			});
		} catch (err) {
			console.error(err);
			res.status(416).send("error");
		}
	}
}
