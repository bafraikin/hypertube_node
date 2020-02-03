import {Connection} from 'typeorm'
import passport from 'passport';
import * as controller from '../app/controllers/index'
import {Express, Request, Response, Router} from "express";

export default function setRoute(connection: Connection, app: Express) {


	app.get('/test', (req: Request, res: Response) => {return res.send({coucou: 'salut'});})

					app.route('/authentication')
					.post(passport.authenticate('local', controller.authenticate.authenticateObject()))
					.delete(controller.authenticate.logout);


					app.post("/user", controller.user.create);






	app.post('/film-info', controller.filmInfo.searchInfo);
	
	app.post('/film-search-api-query-string', controller.movies.ytsApiQueryString);
	app.post('/download', controller.movies.getDownload);
	app.get('/download/delete', controller.movies.deleteAllMovies);
	app.get('/player/:file', controller.movies.player);
	return app;
}
