import {Connection} from 'typeorm'
import passport from 'passport';
import {Express } from 'express'
import * as controller from '../app/controllers/index'
import {Request, Response} from "express";

export default function setRoute(connection: Connection, app: Express) {


	app.get('/test', (req: Request, res: Response) => {return res.send({coucou: 'salut'});})

	app.post('/login', passport.authenticate('local', controller.authenticate.authenticateObject()));
	app.get('/logout', controller.authenticate.logout);
	
/*
* La route /UserCreate permet de cree un utilisateur 
* Elle prend elle a besoin des info du model user.ts pour fonctionner
* peut etre tester a la main avec cette commande :
* curl -d "img=abc.fr&password=7char_and_a_int&email=email@42.fr&firstname=foo&lastname=bar&pseudo=xXx"
   -X POST http://localhost:3000/UserCreate
*/
	app.post("/create", controller.user.create);
	app.get('/coucou', controller.user.test); 



	return app;
}


