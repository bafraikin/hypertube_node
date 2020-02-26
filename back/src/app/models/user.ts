import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable } from "typeorm";
import { Comment } from '@app/models/comment'
import { Watch } from '@app/models/watch'
import Mailer from '@app/controllers/mailer'
import validator from 'validator';
import logger from "../../settings/logger";
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const saltRounds = 10;

@Entity("users")
export class User extends BaseEntity {

	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ unique: true })
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

	@Column({ default: "false" })
	tokenPass!: string;

	@Column({ default: 0, type: 'bigint' })
	tokenPassDate!: number;


	@OneToMany(type => Comment, comment => comment.user)
	comments: Comment[];

	@OneToMany(type => Watch, watch => watch.user)
	watchs: Watch[];

	async setPassword(pw: string) {
		const hash = await bcrypt.hash(pw, saltRounds);
		this.password = hash;
	}

	async validatePassword(plainTextPassword: string) {
		return await bcrypt.compare(plainTextPassword, this.password + '')
	}

	async validateTokenPass(plainTextToken: string){
		return await bcrypt.compare(plainTextToken, this.tokenPass + '')
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
		if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*.{8,255}$/.test(this.password))
			return true;
		return false;
	}

	isValid(): boolean {
		try {
			if (validator.isEmail(this.email) &&
				validator.isAlpha(this.login) &&
				validator.isLength(this.login, { min: 1, max: 250 }) &&
				validator.isAlpha(this.firstName) &&
				validator.isLength(this.firstName, { min: 1, max: 250 }) &&
				validator.isAlpha(this.lastName) &&
				validator.isLength(this.lastName, { min: 1, max: 250 }) &&
				validator.isURL(this.imageUrl) &&
				validator.isLength(this.imageUrl, { min: 1, max: 250 }) &&
				this.checkPassIsComplex())
				return true;
			return false;
		}
		catch {
			return false;
		}
	}

	async isEmailTaken(): Promise<boolean> {
		const bool = await User.findOne({ email: this.email });
		if (typeof bool !== 'undefined')
			return true;
		return false;
	}

	isEmpty(): boolean {
		if (Object.entries(this).length === 0 && this.constructor === Object)
			return true;
		return false;
	}

	createOAuth(profile: any) {
		this.email = profile.emails[0].value;
		this.password = "bcrypt";
		if (profile.thisname === undefined) {
			this.login = profile.displayName;
			this.firstName = profile.displayName;
			this.lastName = profile.displayName;
			this.imageUrl = profile.photos[0].value;
		}
		else {
			this.login = profile.thisname;
			this.firstName = profile.name.givenName;
			this.lastName = profile.name.familyName;
			this.imageUrl = profile.image_url
		}
		this.oauth = true;
	}

	async initResetPassword() {
		let token: any = await User.generateToken({ byteLength: 200 });
		token = encodeURI(token);
		try {
			this.tokenPass = await bcrypt.hash(token, saltRounds);
			this.tokenPassDate = Date.now();
			await this.save();
			Mailer.forgotPassMail(this.email, token);
		} catch {
			logger.info("unexpected errore at l.128 of models/user.ts");
		}

	}

	//taken from https://stackoverflow.com/questions/8855687/secure-random-token-in-node-js
	static generateToken({ stringBase = 'base64', byteLength = 48 } = {}) {
		return new Promise((resolve, reject) => {
			crypto.randomBytes(byteLength, (err: any, buffer: any) => {
				if (err) {
					reject(err);
				} else {
					resolve(buffer.toString(stringBase));
				}
			});
		});
	}

}
