import {Connection} from 'typeorm'
import passport from 'passport';
import {Express } from 'express'
import * as controller from '../app/controllers/index'
import {Request, Response} from "express";
import { check} from 'express-validator'

export default function setRoute(connection: Connection, app: Express) {

app.get('/test', (req: Request, res: Response) => {return res.send({coucou: 'salut'});})

	app.route('/user').get([check('coucou').isLength({ min: 5 })], controller.user.test);
	app.post('/login', passport.authenticate('local', controller.authenticate.authenticateObject()));
	app.get('/logout', controller.authenticate.logout);

	app.post('/film-info', controller.filmInfo.searchInfo);
	
	return app;
}