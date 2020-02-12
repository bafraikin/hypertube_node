import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable} from "typeorm";
import {Movie} from '@app/models/movies'
import {User} from '@app/models/user'

@Entity("comments")
export class Comment extends BaseEntity {

	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	date!: string;

	@Column()
	content!: string;

	@ManyToOne(type => Movie, movie => movie.comments)
    movie: Movie;

    @ManyToOne(type => User, user => user.comments, {
		eager: true
	})
	@JoinTable()
    user: User | undefined;

	login:string;

	toJSON() {
		return {
			id: this.id,
			content: this.content,
			login: this.login,
			user: this.user,
		}
	}

}


