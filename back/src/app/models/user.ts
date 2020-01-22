import {BaseEntity, Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import {IsFQDN ,IsAlphanumeric, Length, IsEmail} from "class-validator";

const bcrypt = require('bcrypt');

@Entity("users")
export class User extends BaseEntity {

	@PrimaryGeneratedColumn()
	id!: number;

	@Column({unique: true})
	@IsEmail()
	@Length( 4,  254)
	email!: string;

	@Column()
	@Length( 1,  10)
	firstname!: string;

	@Column()
	@Length( 1,  10)
	lastname!: string;

	@Column()
	@Length( 1,  10)
	pseudo!: string;

	@Column()
	@Length( 8,  254)
	@IsAlphanumeric()
	password!: string;

	@Column()
	@IsFQDN()
	@Length( 3, 254)
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

	checkPass() {
	this.password

	}
}
