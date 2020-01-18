import {Connection} from 'typeorm'
import passport from 'passport';
import {Express } from 'express'
import testAPI from '../app/controllers/film-search-api'
import * as controller from '../app/controllers/index'
import {Request, Response} from "express";
import { check} from 'express-validator'

export default function setRoute(connection: Connection, app: Express) {


app.get('/test', (req: Request, res: Response) => {return res.send({coucou: 'salut'});})




	app.route('/user').get([check('coucou').isLength({ min: 5 })], controller.user.test);
	app.post('/login', passport.authenticate('local', controller.authenticate.authenticateObject()));
	app.get('/logout', controller.authenticate.logout);



	app.get('/film-search-api', testAPI.testAPI);
	app.post('/film-search-api-query-string', testAPI.testApiQueryString);


	return app;
}


