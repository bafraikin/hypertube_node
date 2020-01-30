import {BaseEntity, Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import {IsFQDN, IsBoolean, Length, IsEmail, validate, ValidationError} from "class-validator";

const bcrypt = require('bcrypt');
const saltRounds = 10;

@Entity("users")
export class User extends BaseEntity {

	@PrimaryGeneratedColumn()
	id!: number;

	@IsEmail()
	@Length( 4,  254)
	@Column({unique: true})
	email!: string;

	@IsBoolean()
	@Column()
	oauth!: boolean;	

	@Length(1,  10)
	@Column()
	firstName!: string;

	@Length(1,  10)
	@Column()
	lastName!: string;

	@Length(1,  10)
	@Column()
		login!: string;

	@Length(8,  254)
	@Column()
		password!: string;

	@IsFQDN()
	@Length( 3, 254)
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
		if(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*.{8,}$/.test(this.password))
			return true;
		return false;
	}

	 static async isValid(user: User): Promise<boolean> {
		return validate(user).then((errors: ValidationError[]) => {
				if (errors.length ==  0 && user.checkPassIsComplex()) 
					return true;
				return false;
				}).catch(err => {return false});
	}

	async isEmailTaken() : Promise<boolean> {
		let bool = await  User.find({ email: this.email});
		return bool.isObjectEmpty();
	}
}
