import passport from 'passport';
import { Express} from 'express'
import authenticateController from '../app/controllers/authenticate'
let LocalStrategy = require('passport-local').Strategy;

export default async function setupPassport(server: Express) {

    passport.use('local', new LocalStrategy(authenticateController.authStrategy))
    passport.serializeUser(authenticateController.serialize);
    passport.deserializeUser(authenticateController.deserialize);

    server.use(passport.initialize())
    server.use(passport.session())
		return server; 
}
