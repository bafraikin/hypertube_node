import {BaseEntity, Entity, PrimaryGeneratedColumn, Column} from "typeorm";
const bcrypt = require('bcrypt');

@Entity("users")
export class User extends BaseEntity {

	@PrimaryGeneratedColumn()
	id!: number;

	@Column({unique: true})
	email!: string;

	@Column()
	name!: string;

	@Column()
	surname!: string;

	@Column()
	pseudo!: string;

	@Column()
	password!: string;

	@Column()
	imageUrl!: string;

	async setPassword(pw: string) {
		this.password = pw
		await this.save()
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
