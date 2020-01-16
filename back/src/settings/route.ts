import {Connection} from 'typeorm'
import passport from 'passport';
import {Express } from 'express'
import * as controller from '../app/controllers/index'
import {Request, Response} from "express";
import { check, validationResult } from 'express-validator'

export default function setRoute(connection: Connection, app: Express) {


	app.get('/test', (req: Request, res: Response) => {return res.send({coucou: 'salut'});})



	app.route('/user').get( controller.user.test);
	app.post('/login', passport.authenticate('local', controller.authenticate.authenticateObject()));
	app.get('/logout', controller.authenticate.logout);





	return app;
}


