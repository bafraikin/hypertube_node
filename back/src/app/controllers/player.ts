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
				const opt = { start: start, end: file.length, engine};
				if (extensionsThatWeWantToStore.includes(extension)) {
					file.select();
					torrentClient.streamFile(file, res, extension, opt);
				} 
				else if (extensionsThatWeDontWantToStore.includes(extension)) {
					file.select();
					console.log("On va convertire !!!!!!!!!!!!!!!!!!!!1");
					torrentClient.convertAndStreamFile(file, res, opt);
				} 
				else
					file.deselect();
			});
		} catch (err) {
			console.error(err);
			res.status(416).send("error");
		}
	}
}
