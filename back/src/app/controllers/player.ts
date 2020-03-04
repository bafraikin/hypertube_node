import {Request, Response} from 'express';
import torrentClient from '@app/services/torrent'
import { Movie } from '@app/models/movies';
import logger from '@settings/logger';
import path from "path";
import fs from "fs";

const extensionsThatWeWantToStore = [".mp4"];
const extensionsThatWeDontWantToStore = [".webm", ".avi", ".divx", ".flv", ".mkv", ".mpg", ".mp2", ".mpeg", ".mpe", ".mpv", ".mov", ".ogg", ".swf", ".qt", ".wmv"];

export default class playerController {

	static async stream(req: Request, res: Response) {
		try {
			let magnetLink = req.params.magnetLink;
			if (magnetLink == undefined)
				throw "error in stream parameter";
			let engine: any = await torrentClient.downloadMovie(0, magnetLink);
			engine.files.forEach((file: any) => {
				const extension = path.extname(file.name);
				const opt = {start: 0, end: file.length, engine, wait: true};
				const pathFile = "/back/films/"  + file.path;
				if (fs.existsSync(pathFile) && [...extensionsThatWeDontWantToStore, ...extensionsThatWeWantToStore].includes(extension))
					{
						file.deselect();
						opt.wait = false;
						if (extensionsThatWeWantToStore.includes(extension))
							torrentClient.streamFile(file, res,  opt); 
						else
							torrentClient.convertAndStreamFile(file, res, opt);
					}
					else if ([...extensionsThatWeDontWantToStore, ...extensionsThatWeWantToStore].includes(extension)) {
						file.select();
						if (extensionsThatWeWantToStore.includes(extension))
							torrentClient.streamFile(file, res,  opt); 
						else
							torrentClient.convertAndStreamFile(file, res, opt);
					} 
					else
						file.deselect();
			});
		} catch (err) {
			res.status(418).send("I'm now a teapot");
		}
	}
}
