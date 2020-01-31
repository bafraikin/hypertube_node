import {Connection} from 'typeorm'
import passport from 'passport';
import {Express } from 'express'
import * as controller from '../app/controllers/index'
import {Request, Response} from "express";

export default function setRoute(connection: Connection, app: Express) {


	app.get('/test', (req: Request, res: Response) => {return res.send({coucou: 'salut'});})

	//app.post('/login', passport.authenticate('local', controller.authenticate.authenticateObject()));


app.post('/login', (req, res, next) =>{
	passport.authenticate('local', {
		successRedirect: '/success-sign-in',
		failureRedirect: '/error-sign-in',
		failureFlash: true
	})(req, res, next);
});




	app.get('/logout', controller.authenticate.logout);


	app.get('/success-sign-in', (req: Request, res: Response) => {return res.send({coucou: 'your sign in'});})
	app.get('/error-sign-in', (req: Request, res: Response) => {return res.send({coucou: 'your no sign in'});})


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


