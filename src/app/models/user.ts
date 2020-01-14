import {Entity, PrimaryGeneratedColumn, Column, Unique} from "typeorm"
const bcrypt = require('bcrypt');

@Entity()
@Unique(["email"])
export default class User {

	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
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
