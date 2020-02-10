import {BaseEntity, Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity("comments")
export class Comment extends BaseEntity {

	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	userId!: number;

	@Column()
	date!: string;

	@Column()
	movieImdbCode!: string;
	
	@Column()
	movieTitle!: string;

	@Column()
	content!: string;

	login:string;

	toJSON() {
		return {
			id: this.id,
			userId: this.userId,
			content: this.content,
			login: this.login,
		}
	}


}


