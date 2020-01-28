import {BaseEntity, Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import {IsFQDN, IsBoolean, IsAlphanumeric, Length, IsEmail, validate, ValidationError} from "class-validator";

const bcrypt = require('bcrypt');
const saltRounds = 10;

@Entity("users")
export class User extends BaseEntity {

	@PrimaryGeneratedColumn()
		id!: number;

	@Column({unique: true})
		@IsEmail()
		@Length( 4,  254)
		email!: string;

	
	@Column()
		@IsBoolean()
		oauth!: boolean;	
	@Column()
		@Length(1,  10)
		firstname!: string;

	@Column()
		@Length(1,  10)
		lastname!: string;

	@Column()
		@Length(1,  10)
		pseudo!: string;

	@Column()
		@Length(8,  254)
		password!: string;

	@Column()
		@IsFQDN()
		@Length( 3, 254)
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

	async isValide(): Promise<boolean> {
		return validate(this).then((errors: ValidationError[]) => {
				if (errors.length ==  0 && this.checkPassIsComplex ()) 
					return true;
				return false;
				}).catch(err => {return false});
	}

	async isEmailTaken() : Promise<boolean> {
		let bool = await  User.find({ email: this.email});
		return bool.isObjectEmpty();
	}
}
