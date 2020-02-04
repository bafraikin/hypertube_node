import {BaseEntity, Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import validator from 'validator';
const bcrypt = require('bcrypt');
const saltRounds = 10;

@Entity("users")
export class User extends BaseEntity {

	@PrimaryGeneratedColumn()
		id!: number;

	@Column({unique: true})
		email!: string;

	@Column()
		oauth!: boolean;	

	@Column()
		firstName!: string;

	@Column()
		lastName!: string;

	@Column()
		login!: string;

	@Column()
		password!: string;

	@Column()
		imageUrl!: string;

	async setPassword(pw: string) {
		const hash = await bcrypt.hash(pw, saltRounds);
		this.password = hash;
	}

	async validatePassword(plainTextPassword: string) {
		return plainTextPassword === this.password
		return await bcrypt.compare(plainTextPassword, this.password + '')
	}

	toJSON() {
		return {
	    email: this.email,
			login: this.login
		}
	}

	checkPassIsComplex() {
		if(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*.{8,255}$/.test(this.password))
			return true;
		return false;
	}

	isValid(): boolean {
		let error = Array;
		try {
			if( validator.isEmail(this.email) &&
					validator.isAlpha(this.login) && 
					validator.isLength(this.login ,{ min:1, max: 250}) &&
					validator.isAlpha(this.firstName) && 
					validator.isLength(this.firstName ,{min:1, max: 250}) &&
					validator.isAlpha(this.lastName) && 
					validator.isLength(this.lastName ,{min:1, max:250}) &&
					validator.isURL(this.imageUrl) && 
					validator.isLength(this.imageUrl ,{min:1, max: 250}) &&
					this.checkPassIsComplex())
				return true;
			return false;
		}
		catch {
			return false;
		}
	}

	async isEmailTaken() : Promise<boolean> {
		const  bool = await User.findOne({ email: this.email});
		if (typeof bool !== 'undefined')
			return true;
		return false;
	}
}
