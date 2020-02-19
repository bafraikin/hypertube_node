import {Request, Response} from 'express';
import torrentClient from '@app/services/torrent'
import { Movie } from '@app/models/movies';

export default class playerController {

	static async stream(req: Request, res: Response) {
		let imdbCode = req.params.imdbCode;
		//let hash = req.params.hash;
		//let url = req.params.url;
		let magnetLink = req.params.magnetLink;

		let movie = await Movie.getMovie(imdbCode);
		//movie.buildMagnetLink(hash, url);

		const range = req.headers.range;
		if (range) {
			const parts = range.replace(/bytes=/, "").split("-");
			const start = parseInt(parts[0], 10);
			let engine: any = await torrentClient.downloadMovie(start, magnetLink);
			engine.files.forEach( (file: any) => {
				let regex = /mp4/;
				let isMovie = regex.test(file.name);
				if (isMovie){
					let opt = {
						start: start,
						end: file.length
					}
					let stream = file.createReadStream(opt);
					const fileSize = file.length;
					const end = parts[1]
						? parseInt(parts[1], 10)
						: fileSize-1
						const chunksize = (end-start)+1
						console.log("le end ==>", end);
						console.log("le file size", fileSize);
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
				else {
					// console.log("ce n'est pas un film");
					// console.log(file.name);
					// file.deselect();
				}
			});

		} else {
			res.status(416).send("error in stream");
		}
	}
}




// var progress = 0;
// stream.on('data', (chunk: any) => {
// 	console.log("received " + chunk.length + " bytes of data");
// progress += chunk.length;
// var pourcentage = Math.round((progress * 100 / file.length));
// console.log("Le pourcentage du total ==>", pourcentage  + "%");
// })
// stream.on('end', () => {
// console.log("Download completed");
// })










