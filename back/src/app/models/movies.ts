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

	toJSON() {
		return {
			id: this.id,
			title: this.title,
			downloadStatus: this.downloadStatus,
			imdbCode: this.imdbCode,
		}
	}

	static getMovie() {
		//if file exist
		//return downloaded
		//else
		return "noExist";
	}

	static getMovies() {
		return "Toy_story_baby";
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

	async downloadMovie(){
		this.downloadStatus = "downloadOnGoing";
		this.save();
		var engine = torrentStream(this.magnetLink, {path: '/back/films'});
		engine.on('download', (index: any) => {
			//console.log("On a download", index);
		})
		engine.on('idle', () =>{
			console.log("on a tout finis");
			this.downloadStatus = "downloadFinish";
			this.save();
		})
		engine.on('ready', () => {
		engine.files.forEach( (file: any) => {
				var regex = /mp4/;
				var isMovie = regex.test(file.name);
				if (isMovie){
					console.log("Cest un film");
					console.log('Le nom du fichier:', file.name);
					console.log("La taille du fichier total ==>", file.length);
					var progress = 0;
					var opt = {
						start: 0,
						end: file.length
					}
					var filePath = '/back/films/' + this.imdbCode + '-' + this.title;
					var write = fs.createWriteStream(filePath);
					var stream = file.createReadStream(opt);
					stream.on('data', (chunk: any) => {
						//console.log("received " + chunk.length + " bytes of data");
						progress += chunk.length;
						//console.log("Le progress ==> " + progress);
						console.log("Le pourcentage du total ==>",  (progress * 100 / file.length) + "%");
					})
					stream.on('end', () => {
						console.log("Download completed");
					})
					stream.pipe(write);
				}
				else {
					console.log("ce n'est pas un film");
					console.log(file.name);
					file.deselect();
				}
			});
		});
	}
}

