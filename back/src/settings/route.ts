import {Connection} from 'typeorm'
import passport from 'passport';
import {Express } from 'express'
import * as controller from '../app/controllers/index'
import {Request, Response} from "express";
import { check} from 'express-validator'

var imdb = require("imdb-api");

export default function setRoute(connection: Connection, app: Express) {


	app.get('/test', (req: Request, res: Response) => {return res.send({coucou: 'salut'});})

	// app.get('/lala', (req: Request, res: Response) => {
	// 	imdb.searchMovies('The Lion King', function (movies: string) {
	// 		console.log(movies);
	// 	}, function(error: string){
	// 		console.error(error);
	// 	});
	// 	// imdb.getMovie('tt0110357', function (movie: string) {
	// 	// 	console.log(movie);
	// 	// }, function(error: string) { 
	// 	// 	console.error(error);
	// 	// });
	// });

	app.post('/research-film-info', controller.filmInfo.searchInfo);

	app.route('/user').get([check('coucou').isLength({ min: 5 })], controller.user.test);
	app.post('/login', passport.authenticate('local', controller.authenticate.authenticateObject()));
	app.get('/logout', controller.authenticate.logout);





	return app;
}


