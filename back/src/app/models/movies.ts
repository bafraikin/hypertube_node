import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable} from "typeorm";
import {Comment} from '@app/models/comment'
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
			imdbCode: this.imdbCode,
		}
	}

	static async getMovie(imdbCode: any) {
		let movie = await Movie.findOne({ imdbCode: imdbCode });
		if (movie == undefined){
			movie = new Movie;
			movie.imdbCode = imdbCode;
			await movie.save();
		}
		return movie;
	}

}

