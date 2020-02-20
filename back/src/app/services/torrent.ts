import axios from "axios"
let torrentStream = require('torrent-stream');

export default class torrentClient {

	static async torrentYts(imdbCode: string) {
		try {
			let url = 'http://yts.mx/api/v2/list_movies.json?query_term='+ imdbCode;
			let response: any = await axios.get(url);
			console.log(response.data.data.movies[0].torrents)

			let torrents: Array<any> = [];
			response.data.data.movies[0].torrents.forEach((torrent: any) => {
				let entry = {
					'provider': 'YTS',
					'magnetLink': torrentClient.buildMagnetLink(torrent.hash, torrent.url),
					'quality': torrent.quality
				};
				torrents.push(entry);
			})
			return (torrents);
		} catch (err) {
			console.error(err);
			return [];
		}
	}

	static async torrentPopCorn(imdbCode: string) {
		try {
			let url = 'https://tv-v2.api-fetch.website/movie/'+ imdbCode;
			let response: any = await axios.get(url);
			let torrents: Array<any> = [];
			//jaimerai test qua chaque etape cela ne soit pas undefined
			if (response.data.torrents.en['1080p'] != undefined){
				let entry = {
					'provider': 'Pop corn',
					'magnetLink': response.data.torrents.en['1080p'].url,
					'quality': '1080p'
				};
				torrents.push(entry);
			}
			if (response.data.torrents.en['720p'] != undefined){
				let entry = {
					'provider': 'Pop Corn',
					'magnetLink': response.data.torrents.en['720p'].url,
					'quality': '720p'
				};
				torrents.push(entry);
			}
			return (torrents);
		} catch (err) {
			console.error(err);
			return [];
		}
	}

	static buildMagnetLink(hash: any, url: any){
		hash = decodeURIComponent(hash);
		url = decodeURIComponent(url);
		let torrent_hash = hash;
		let torrent_url = url;
		let tracker_1 =  "udp://glotorrents.pw:6969/announce";
		let tracker_2 =  "udp://tracker.opentrackr.org:1337/announce";
		let tracker_3 =  "udp://torrent.gresille.org:80/announce";
		let tracker_4 =  "udp://tracker.openbittorrent.com:80";
		let tracker_5 =  "udp://tracker.coppersurfer.tk:6969";
		let tracker_6 =  "udp://tracker.leechers-paradise.org:6969";
		let tracker_7 =  "udp://p4p.arenabg.ch:1337";
		let tracker_8 =  "udp://tracker.internetwarriors.net:1337";
		torrent_hash = encodeURI(torrent_hash);
		torrent_url = encodeURI(torrent_url);
		tracker_1 = encodeURI(tracker_1);
		tracker_2 = encodeURI(tracker_2);
		tracker_3 = encodeURI(tracker_3);
		tracker_4 = encodeURI(tracker_4);
		tracker_5 = encodeURI(tracker_5);
		tracker_6 = encodeURI(tracker_6);
		tracker_7 = encodeURI(tracker_7);
		tracker_8 = encodeURI(tracker_8);
		let magnetLink = "magnet:?xt=urn:btih:" + torrent_hash + "&dn=" + torrent_url + "&tr=" + tracker_1 + "&tr=" +tracker_2 + "&tr=" + tracker_3 + "&tr=" + tracker_4 + "&tr=" + tracker_5 + "&tr=" + tracker_6 + "&tr=" + tracker_7 + "&tr=" + tracker_8;
		return magnetLink;
	}

	static async downloadMovie(start: any, magnetLink: any){
		return new Promise((resolve, reject) => {
			let engine = torrentStream(magnetLink, {path: '/back/films'});
			engine.on('ready', () => {
    			return resolve(engine);
			});
		}) ;
	}

}
