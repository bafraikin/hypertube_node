import {Connection} from 'typeorm'
import passport from 'passport';
import {Express } from 'express'
import authenticate from '../app/controllers/authenticate'
import {Request, Response} from "express";

export default function setRoute(connection: Connection, app: Express) {


	app.get('/test', (req: Request, res: Response) =>{return res.send({coucou: 'salut'});})


	app.route('/user')
		.get	
	app.post('/login', passport.authenticate('local', authenticate.authenticateObject()));
	app.get('/logout', authenticate.logout);





	return app;
}


