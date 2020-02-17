import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToOne} from "typeorm";
import {User} from '@app/models/user'

@Entity("watchs")
export class Watch extends BaseEntity {

	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	idOMDB!: string;

    @ManyToOne(type => User, user => user.watchs)
    user: User | undefined;

	toJSON() {
		return {
			id: this.id,
			idOMDB: this.idOMDB,
			user: this.user,
		}
	}

}



