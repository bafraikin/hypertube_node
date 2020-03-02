import {Request, Response} from 'express';
import torrentClient from '@app/services/torrent'
import { Movie } from '@app/models/movies';
import logger from '@settings/logger';

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
			engine.files.forEach( (file: any) => {
				let regex = /mp4/;
				let isMovie = regex.test(file.name);
				if (isMovie){
					let opt = { start: start, end: file.length };
					let stream = file.createReadStream(opt);
					const fileSize = file.length;
					const end = parts[1]
						? parseInt(parts[1], 10)
						: fileSize-1
						const chunksize = (end-start)+1
						logger.info("le start ==>"+ start);
						logger.info("le end ==>"+ end);
						logger.info("le file size"+ fileSize);
						const head = {
							'Content-Range': `bytes ${start}-${end}/${fileSize}`,
							'Accept-Ranges': 'bytes',
							'Content-Length': chunksize,
							'Content-Type': 'video/mp4',
						}
						res.writeHead(206, head);
						stream.pipe(res);
						stream.on('error', function (err: any) {
							res.status(416).send("error in stream");
						})
				}
			});
		} catch (err) {
			console.error(err);
			res.status(416).send("error");
		}
	}
}
