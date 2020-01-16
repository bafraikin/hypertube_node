import {BaseEntity, Entity, PrimaryGeneratedColumn, Column} from "typeorm";
const bcrypt = require('bcrypt');

@Entity("users")
export class User extends BaseEntity {

	@PrimaryGeneratedColumn()
	id!: number;

	@Column({unique: true})
	email!: string;

	@Column()
	password!: string;

	setPassword(pw: string) {
		this.password = pw
	}

	async validatePassword(plainTextPassword: string) {
		return await bcrypt.compare(plainTextPassword, this.password + '')
	}

	toJSON() {
		return {
			id: this.id,
			email: this.email
		}
	}
}
