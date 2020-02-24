import axios from "axios"
let torrentStream = require('torrent-stream');

export default class torrentClient {

	static async torrentYts(imdbCode: string) {
		try {
			if (!imdbCode || imdbCode == '')
				throw "error";
			let url = 'http://yts.mx/api/v2/list_movies.json?query_term='+ imdbCode;
			let response: any = await axios.get(url);
			let torrents: Array<any> = [];
			let getListOrUndefinedFromResponse = (response) => { return ((((response || {}).data || {}).data || {}).movies[0] || {}).torrents; }
			let list = getListOrUndefinedFromResponse(response);
			if (list != undefined) {
				list.forEach((torrent: any) => {
					let entry = {
						'provider': 'YTS',
						'magnetLink': torrentClient.buildMagnetLink(torrent.hash, torrent.url),
						'quality': torrent.quality
					};
					torrents.push(entry);
				});
			}
				return (torrents);
		} catch (err) {
			return err
		}
	}

	static async torrentPopCorn(imdbCode: string) {
		try {
			if (!imdbCode || imdbCode == '')
				throw "error";
			let url = 'https://tv-v2.api-fetch.website/movie/'+ imdbCode;
			let response: any = await axios.get(url);
			let torrents: Array<any> = [];
			let data: object;

			data = (((response || {}).data || {}).torrents || {}).en['1080p'];
			if (data != undefined){
				console.log("Hello ici");
				let entry = {
					'provider': 'Pop corn',
					'magnetLink': response.data.torrents.en['1080p'].url,
					'quality': '1080p'
				};
				torrents.push(entry);
			}
			data = (((response || {}).data || {}).torrents || {}).en['720p'];
			if (data != undefined){
				let entry = {
					'provider': 'Pop Corn',
					'magnetLink': response.data.torrents.en['720p'].url,
					'quality': '720p'
				};
				torrents.push(entry);
			}
			return (torrents);
		} catch (err) {
			return err;
		}
	}

	static buildMagnetLink(hash: any, url: any){
		try {
			if (!hash || !url)
				throw "params missing";
			let torrent_hash = decodeURIComponent(hash);
			let torrent_url = decodeURIComponent(url);
			let tracker_1 =  encodeURI("udp://glotorrents.pw:6969/announce");
			let tracker_2 =  encodeURI("udp://tracker.opentrackr.org:1337/announce");
			let tracker_3 =  encodeURI("udp://torrent.gresille.org:80/announce");
			let tracker_4 =  encodeURI("udp://tracker.openbittorrent.com:80");
			let tracker_5 =  encodeURI("udp://tracker.coppersurfer.tk:6969");
			let tracker_6 =  encodeURI("udp://tracker.leechers-paradise.org:6969");
			let tracker_7 =  encodeURI("udp://p4p.arenabg.ch:1337");
			let tracker_8 =  encodeURI("udp://tracker.internetwarriors.net:1337");
			torrent_hash = encodeURI(torrent_hash);
			torrent_url = encodeURI(torrent_url);
			let magnetLink = "magnet:?xt=urn:btih:" + torrent_hash + "&dn=" + torrent_url + "&tr=" + tracker_1 + "&tr=" +tracker_2 + "&tr=" + tracker_3 + "&tr=" + tracker_4 + "&tr=" + tracker_5 + "&tr=" + tracker_6 + "&tr=" + tracker_7 + "&tr=" + tracker_8;
			return magnetLink;
		} catch (err) {
			return err;
		}
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
