import {Connection} from 'typeorm'
import passport from 'passport';
import * as controller from '../app/controllers/index'
import {Express, Request, Response, Router} from "express";

export default function setRoute(connection: Connection, app: Express) {


	app.get('/test', (req: Request, res: Response) => {return 

			res.send({coucou: 'salut'});})

			app.route('/authentication')
			.post(passport.authenticate('local', controller.authenticate.authenticateObject()))
			.delete(controller.authenticate.logout);





			/*
			 * La route /UserCreate permet de cree un utilisateur 
			 * Elle prend elle a besoin des info du model user.ts pour fonctionner
			 * peut etre tester a la main avec cette commande :
			 * curl -d "img=abc.fr&password=7char_and_a_int&email=email@42.fr&firstname=foo&lastname=bar&pseudo=xXx"
			 -X POST http://localhost:3000/UserCreate
			 */

			app.post("/user", controller.user.create);






			app.post('/film-info', controller.filmInfo.searchInfo);

			app.post('/film-search-api-query-string', controller.movies.ytsApiQueryString);
			app.post('/download', controller.movies.getDownload);
			app.get('/download/delete', controller.movies.deleteAllMovies);
			app.get('/player/:file', controller.movies.player);
			return app;
}
