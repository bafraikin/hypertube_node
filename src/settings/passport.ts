import passport from 'passport';
import { Express, Response, Request } from 'express'
import {User} from '../app/models/user'
import { Connection, getConnection } from 'typeorm'

let LocalStrategy = require('passport-local').Strategy;


export default async function setupPassport(server: Express, connection: Connection) {

    passport.use('local', new LocalStrategy(
        async function(email: string, password: string, done: Function) {
				const user: User | undefined = await User.findOne({email});
            if (!user) {
                done(null, false, { message: 'Could not find that user' })
            } else {
                const passwordIsCorrect = await user.validatePassword(password)

                if (passwordIsCorrect) {
										done(null, user.toJSON())
                } else {
                    done(null, false, { message: 'Incorrect password' })
                }
            }
        }))

    passport.serializeUser(function(user: User, done: Function) {
        done(null, user.id);
    });

    passport.deserializeUser(async function(id: number, done) {
				const user: User = (await User.findOne({id}) as User);
        if (user) {
            done(null, user)
        } else {
            done(null, {})
        }
    });

    server.use(passport.initialize())
    server.use(passport.session())
		return server; 
}
