import {Request, Response} from 'express';
const axios = require('axios');

var torrentStream = require('torrent-stream');

export default class moviesController {
	static download(req: Request, res: Response) {
		console.log("On est ici");
		console.log(req.body.url);
		console.log(req.body.hash);
		//on regarde si le film existe
		//on regarde le statut du film : noExist / downloaded / downloadOnGoing
		//if no Exist on le telecharge
		//on renvoi la liste des films avec leur statut
	}

	static testAPI(req: Request, res: Response) {
		axios
		.get('http://yts.tl/api/v2/list_movies.json')
		.then((response: any) => {
			if (response.status == 200){
				//console.log(response.data)
				//console.log(typeof (response.data));
				res.send(response.data);
			}
			else{
				console.log("erro in api");
				res.send("error");
			}
		})
	}

	static testApiQueryString(req: Request, res: Response) {
		var stringResearch = req.body.queryString;
		stringResearch = encodeURI(stringResearch);
		console.log("on recherche");
		console.log(stringResearch);
		var url = 'http://yts.tl/api/v2/list_movies.json?query_term='+ stringResearch;
		console.log(url);
		axios
		.get(url)
		.then((response: any) => {
			if (response.status == 200){
				console.log(response.data)
				//console.log(typeof (response.data));
				res.send(response.data);
			}
			else{
				console.log("erro in api");
				res.send("error");
			}
		})
	}



}
