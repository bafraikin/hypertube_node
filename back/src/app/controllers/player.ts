import { Request, Response } from 'express';
import torrentClient from '@app/services/torrent'
import fs from 'fs';
import path from "path";

const extensionsThatWeWantToStore = [".mp4"];
const extensionsThatWeDontWantToStore = [".webm", ".avi", ".divx", ".flv", ".mkv", ".mpg", ".mp2", ".mpeg", ".mpe", ".mpv", ".mov", ".ogg", ".swf", ".qt", ".wmv"];

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
				const opt = { start: start, end: file.length, engine, wait: true };
				const pathFile = "/back/films/" + file.path;
				if (fs.existsSync(pathFile) && [...extensionsThatWeDontWantToStore, ...extensionsThatWeWantToStore].includes(extension)) {
					file.deselect();
					opt.wait = false;
					if (extensionsThatWeWantToStore.includes(extension))
						torrentClient.streamFile(file, res, opt, parts, start);
					else
						torrentClient.convertAndStreamFile(file, res, opt);
				}
				else if ([...extensionsThatWeDontWantToStore, ...extensionsThatWeWantToStore].includes(extension)) {
					if (extensionsThatWeWantToStore.includes(extension))
						torrentClient.streamFile(file, res, opt, parts, start);
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


