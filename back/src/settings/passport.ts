import passport from 'passport';
import { Express} from 'express'
import authenticateController from '../app/controllers/authenticate'
let LocalStrategy = require('passport-local').Strategy;

export default async function setupPassport(server: Express) {


	server.use(passport.initialize());
	server.use(passport.session());




	passport.use('local', new LocalStrategy({usernameField: 'email', passwordField: 'password'}, authenticateController.authStrategy));






	passport.serializeUser(authenticateController.serialize);
	passport.deserializeUser(authenticateController.deserialize);
	return server; 
}
