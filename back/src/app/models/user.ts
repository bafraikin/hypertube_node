import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Comment} from '@app/models/comment'
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

	@OneToMany(type => Comment, comment => comment.user)
    comments: Comment[];


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
	    email: this.email,
	    login: this.login,
	    firstName: this.firstName,
	    lastName: this.lastName,
	    imageUrl: this.imageUrl
		}
	}

	checkPassIsComplex() {
		if(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*.{8,255}$/.test(this.password))
		return true;
		return false;
	}

	isValid(): boolean {
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

	isEmpty(): boolean{
		if ( Object.entries(this).length === 0 && this.constructor === Object)
			return true;
		return false;
	}

	createOAuth(profile: any){
		this.email = profile.emails[0].value;
		this.login = profile.thisname;
		this.firstName = profile.name.givenName;
		this.lastName = profile.name.familyName;
		this.imageUrl = profile.image_url
		this.oauth = true;
	}
}
