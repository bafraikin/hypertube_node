import {BaseEntity, Entity, PrimaryGeneratedColumn, Column} from "typeorm";
var torrentStream = require('torrent-stream');
const fs = require('fs')

@Entity("movies")
export class Movie extends BaseEntity {

	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	title!: string;

	@Column()
	url!: string;

	@Column()
	hash!: string;

	@Column()
	imageUrl!: string;

	@Column()
	magnetLink!: string;

	@Column()
	downloadStatus!: string;

	@Column()
	imdbCode!: string;

	@Column()
	pourcentage!: number;

	// @Entity()
	size: number;

	toJSON() {
		return {
			id: this.id,
			title: this.title,
			downloadStatus: this.downloadStatus,
			imdbCode: this.imdbCode,
			pourcentage: this.pourcentage,
		}
	}

	async getMovie(params: any) {
		console.log(params);
		if (params.url == undefined || params.hash == undefined || params.imdbCode == undefined || params.title == undefined)
			throw "erreur dans get Movie";

		params.hash = decodeURIComponent(params.hash);
		params.url = decodeURIComponent(params.url);
		params.imdbCode = decodeURIComponent(params.imdbCode);
		params.title = decodeURIComponent(params.title);

		const movieSearch = await Movie.findOne({ hash: params.hash, url: params.url, imdbCode: params.imdbCode});
		if (movieSearch == undefined){
			var movie = new Movie;
			movie.title = params.title;
			movie.imdbCode = params.imdbCode;
			movie.hash = params.hash;
			movie.imageUrl = "la super image url du film";
			movie.url = params.url;
			movie.buildMagnetLink();
			movie.downloadStatus = "notStarted";
			movie.pourcentage = 0;
			movie.size = 0;
			await movie.save();
		}
		else{
			var movie = movieSearch;
		}
		return movie;
	}

	buildMagnetLink(){
		console.log("je construit le magnet link");
		var torrent_hash = this.hash;  //"F976B434321C0FBE9027BB7B40386E0E40C23853";
		var torrent_url = this.url;  // "/torrent/download/F976B434321C0FBE9027BB7B40386E0E40C23853";
		var tracker_1 =  "udp://glotorrents.pw:6969/announce";
		var tracker_2 =  "udp://tracker.opentrackr.org:1337/announce";
		var tracker_3 =  "udp://torrent.gresille.org:80/announce";
		var tracker_4 =  "udp://tracker.openbittorrent.com:80";
		var tracker_5 =  "udp://tracker.coppersurfer.tk:6969";
		var tracker_6 =  "udp://tracker.leechers-paradise.org:6969";
		var tracker_7 =  "udp://p4p.arenabg.ch:1337";
		var tracker_8 =  "udp://tracker.internetwarriors.net:1337";
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
		var magnetLink = "magnet:?xt=urn:btih:" + torrent_hash + "&dn=" + torrent_url + "&tr=" + tracker_1 + "&tr=" +tracker_2 + "&tr=" + tracker_3 + "&tr=" + tracker_4 + "&tr=" + tracker_5 + "&tr=" + tracker_6 + "&tr=" + tracker_7 + "&tr=" + tracker_8;
		this.magnetLink = magnetLink;
	}

	async downloadMovie(start: any){
		return new Promise((resolve, reject) => {
			var engine = torrentStream(this.magnetLink, {path: '/back/films'});
			engine.on('ready', () => {
				console.log("************READY ***************************");
    			return resolve(engine);
			});
		}) ;
	}
}

