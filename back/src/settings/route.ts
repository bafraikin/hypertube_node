import {Connection} from 'typeorm'
import passport from 'passport';
import {Express } from 'express'
import authenticate from '../app/controllers/authenticate'
import testAPI from '../app/controllers/film-search-api'
import {Request, Response} from "express";

export default function setRoute(connection: Connection, app: Express) {


	app.get('/test', (req: Request, res: Response) =>{return res.send({coucou: 'salut'});})


	app.route('/user')
		.get
	app.post('/login', passport.authenticate('local', authenticate.authenticateObject()));
	app.get('/logout', authenticate.logout);


	app.get('/film-search-api', testAPI.testAPI);
	app.post('/film-search-api-query-string', testAPI.testApiQueryString);


	return app;
}


