import {Connection} from 'typeorm'
import passport from 'passport';
import {Express } from 'express'
import authenticate from '../app/controllers/authenticate'
import {Request, Response} from "express";

import imdb from "imdb-node-api";

export default function setRoute(connection: Connection, app: Express) {


	app.get('/test', (req: Request, res: Response) =>{return res.send({coucou: 'salut'});})

	app.get('/lala', (req: Request, res: Response) => {
		// imdb.searchMovies('The Lion King', function (movies: string) {
		// 	console.log(movies);
		// }, function(error: string){
		// 	console.error(error);
		// });
		imdb.getMovie('tt0110357', function (movie: string) {
			console.log(movie);
		}, function(error: string) { 
			console.error(error);
		});
	});

	app.route('/user')
		.get	
	app.post('/login', passport.authenticate('local', authenticate.authenticateObject()));
	app.get('/logout', authenticate.logout);





	return app;
}


