import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable} from "typeorm";
import {Comment} from '@app/models/comment'
let torrentStream = require('torrent-stream');
const fs = require('fs')

@Entity("movies")
export class Movie extends BaseEntity {

	@PrimaryGeneratedColumn()
	id!: number;

	@OneToMany(type => Comment, comment => comment.movie,{
		eager: true
	})
	@JoinTable()
    comments: Comment[];

	@Column()
	imdbCode!: string;

	size: number;
	magnetLink!: string;

	toJSON() {
		return {
			id: this.id,
			title: this.title,
			imdbCode: this.imdbCode,
		}
	}

	static async getMovie(params: any) {
		console.log("params dans get movie");
		console.log(params);
		if (params == undefined || params.imdb_code == undefined)
			throw "erreur dans get Movie";

		params.imdb_code = decodeURIComponent(params.imdb_code);
		params.title = decodeURIComponent(params.title);

		let movie = await Movie.findOne({ imdbCode: params.imdb_code });
		if (movie == undefined){
			movie = new Movie;
			movie.imdbCode = params.imdb_code;
			console.log("***********on va enregistrer***********");
			console.log(movie);
			await movie.save();
		}
		return movie;
	}

	buildMagnetLink(params: any){
		if (params == undefined || params.hash == undefined || params.url == undefined)
			throw "erreur dans build magnet link";

		params.hash = decodeURIComponent(params.hash);
		params.url = decodeURIComponent(params.url);
		console.log("je construit le magnet link");
		let torrent_hash = params.hash;  //"F976B434321C0FBE9027BB7B40386E0E40C23853";
		let torrent_url = params.url;  // "/torrent/download/F976B434321C0FBE9027BB7B40386E0E40C23853";
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
		this.magnetLink = magnetLink;
	}

	async downloadMovie(start: any){
		return new Promise((resolve, reject) => {
			let engine = torrentStream(this.magnetLink, {path: '/back/films'});
			engine.on('ready', () => {
    			return resolve(engine);
			});
		}) ;
	}
}

