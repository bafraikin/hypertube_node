import { Request, Response } from 'express';
import torrentClient from '@app/services/torrent'
import fs from 'fs';
import path from "path";

const extensionsThatWeWantToStore = [".webm"];
const extensionsThatWeDontWantToStore = [".mp4", ".avi", ".divx", ".flv", ".mkv", ".mpg", ".mp2", ".mpeg", ".mpe", ".mpv", ".mov", ".ogg", ".swf", ".qt", ".wmv"];

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
				const opt = { start: start, end: file.length, engine, wait: true };
				const pathFile: string= "/back/films/" + file.path;
				const pathFileParsed: any = path.parse(pathFile);
				const webmFile: string  = pathFileParsed.dir  + "/"+ pathFileParsed.name + ".webm";
				if (fs.existsSync(pathFile) && extensionsThatWeWantToStore.includes(pathFileParsed.ext)) {
					file.deselect();
					opt.wait = false;
					torrentClient.streamFile(file, res, opt, parts, start, webmFile);
				}
				else if (extensionsThatWeDontWantToStore.includes(pathFileParsed.ext)) {
					if (fs.existsSync(pathFile))
						opt.wait = false
					else
						file.select();
					torrentClient.convertAndStreamFile(file, res, opt, webmFile);
				}
				else if (extensionsThatWeWantToStore.includes(pathFileParsed.ext)) {
					file.select();
					torrentClient.streamFile(file, res, opt, parts, start, webmFile);
				}
				else
					file.deselect();
			});
		} catch (err) {
			res.status(418).send("I'm now a teapot");
		}
	}
}


