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
		firstname!: string;

	@Column()
		lastname!: string;

	@Column()
		pseudo!: string;

	@Column()
		password!: string;

	@Column()
		imageUrl!: string;



	async setPassword(pw: string) {
		const hash = await bcrypt.hash(pw, saltRounds);
		this.password = hash;
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

	checkPassIsComplex() {
		if(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*.{8,255}$/.test(this.password))
			return true;
		return false;
	}

	isValide(): boolean {
		let error = Array;
		if( 
		validator.isEmail(this.email) &&
		validator.isAlpha(this.pseudo) && validator.isLength(this.pseudo ,{ min:1, max: 250}) &&
		validator.isAlpha(this.firstname) &&  validator.isLength(this.firstname ,{min:1, max: 250}) &&
		validator.isAlpha(this.lastname) && validator.isLength(this.lastname ,{min:1, max:250}) &&
		validator.isFQDN(this.imageUrl) && validator.isLength(this.imageUrl ,{min:1, max: 250}) &&
		this.checkPassIsComplex())
			return true;
		return false;
	}

	async isEmailTaken() : Promise<boolean> {
		const  bool = await User.findOne({ email: this.email});
		if (typeof bool !== 'undefined')
			return true;
		return false;
	}
}
