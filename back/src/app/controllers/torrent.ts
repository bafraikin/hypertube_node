import {Request, Response} from 'express';
import torrentClient from '@app/services/torrent'

export default class torrentsController {

	static async getTorrent(req: Request, res: Response) {
		try {
			let imdbCode: string = req.query.imdbCode;
			if (!imdbCode || imdbCode == '')
				throw "imdbCode missing in getTorrent";
			let torrentYTS = torrentClient.torrentYts(imdbCode);
			let torrentPOP = torrentClient.torrentPopCorn(imdbCode);
			let promise = Promise.all([torrentYTS, torrentPOP]);
			promise.then((response: any) => {
				res.status(200).send(response.flat(Infinity));
			})
		} catch (err) {
			res.status(401).send("error");
		}
	}

}
