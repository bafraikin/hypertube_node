require('dotenv').config();
import passport from 'passport';
import { Express} from 'express'
import authenticateController from '@app/controllers/authenticate'
let LocalStrategy = require('passport-local').Strategy;
let FortyTwoStrategy = require('passport-42').Strategy;

export default async function setupPassport(server: Express) {
	server.use(passport.initialize());
	server.use(passport.session());
	passport.use('local', new LocalStrategy({usernameField: 'email', passwordField: 'password'}, authenticateController.authStrategy));
	

	passport.use(new FortyTwoStrategy({
	clientID: process.env.client_id_42,
	clientSecret: process.env.client_secret_42,
	callbackURL: "http://localhost:8080/oauth42/callback",
	profileFields: {
        'id': function (obj: any) { return String(obj.id); },
        'username': 'login',
        'displayName': 'displayname',
        'name.familyName': 'last_name',
        'name.givenName': 'first_name',
        'profileUrl': 'url',
        'emails.0.value': 'email',
        'phoneNumbers.0.value': 'phone',
        'photos.0.value': 'image_url'
      }
	}, authenticateController.oAuthStrategyFortyTwo));
	

	passport.serializeUser(authenticateController.serialize);
	passport.deserializeUser(authenticateController.deserialize);
	return server; 
}
