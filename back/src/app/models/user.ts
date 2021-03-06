import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable } from "typeorm";
import { Comment } from '@app/models/comment'
import { Watch } from '@app/models/watch'
import Mailer from '@app/controllers/mailer'
import validator from 'validator';
import logger from '@settings/logger';

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

	@Column({ default: "en" })
	lang!: string;

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

	async validateTokenPass(plainTextToken: string) {
		return await bcrypt.compare(plainTextToken, this.tokenPass + '')
	}

	toJSON() {
		return {
			id: this.id,
			email: this.email,
			login: this.login,
			firstName: this.firstName,
			lastName: this.lastName,
			imageUrl: this.imageUrl,
			lang: this.lang
		}
	}

	checkPassIsComplex() {
		if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*.{8,255}$/.test(this.password))
			return true;
		return false;
	}

	static isAlphaAndAccent(string: string){
		if (/^[A-Za-zÀ-ÖØ-öø-ÿ]{1,}$/.test(string))
			return true;
		return false;
	}
	
	isValid(): boolean {
		try {
			if (validator.isEmail(this.email) &&
				User.isAlphaAndAccent(this.login) &&
				validator.isLength(this.login, { min: 1, max: 250 }) &&
				User.isAlphaAndAccent(this.firstName) &&
				validator.isLength(this.firstName, { min: 1, max: 250 }) &&
				User.isAlphaAndAccent(this.lastName) &&
				validator.isLength(this.lastName, { min: 1, max: 250 }) &&
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
		try {
			this.email = profile.emails[0].value;
			this.password = "bcrypt888bbb";
			if (profile.imageURL == undefined) 
			{
				this.login = profile.displayName;
				this.firstName = profile.displayName.split(' ')[0];;
				this.lastName = profile.displayName.split(' ')[0];;
				this.imageUrl = profile.photos[0].value;
			}/* for google 👆 for 42 👇 */
			else {

				this.login = profile.login;
				this.firstName = profile.firstName;
				this.lastName = profile.lastName;
				this.imageUrl = profile.imageURL;
			}
			this.oauth = true;
		} catch
		{
			logger.info("an unxepted error occured at createOAuth in user model")
		}
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

	static getId(user: any): number | undefined {
		try {
			if (!user)
				throw "user undefined";
			let userId = user.id;
			if (!userId)
				throw "userId undefined";
			return userId;
		}
		catch (err) {
			logger.info("user init had an unxpected error : " + err);
		}
	}

}
