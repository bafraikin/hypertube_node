import {Connection} from 'typeorm'
import passport from 'passport';
import * as controller from '../app/controllers/index'
import {Express, Request, Response, Router} from "express";

export default function setRoute(connection: Connection, app: Express) {

	let userNotAuthenticated: Router = Router().use(controller.authenticate.checkNotAuth);
	let userAuthenticated: Router = Router().use(controller.authenticate.checkAuth);



	userNotAuthenticated
	.post('/authentication', passport.authenticate('local', controller.authenticate.authenticateObject()))
	.post("/user", controller.user.create);


	/*
	 * La route /UserCreate permet de cree un utilisateur 
	 * Elle prend elle a besoin des info du model user.ts pour fonctionner
	 * peut etre tester a la main avec cette commande :
	 * curl -d "img=abc.fr&password=7char_and_a_int&email=email@42.fr&firstname=foo&lastname=bar&pseudo=xXx"
	 -X POST http://localhost:3000/UserCreate
	 */


	userAuthenticated.route("/authentication").delete(controller.authenticate.logout);

	userAuthenticated
	.post('/film-info', controller.filmInfo.searchInfo)
	.post('/film-search-api-query-string', controller.movies.ytsApiQueryString)
	.post('/download', controller.movies.getDownload)
	.get('/download/delete', controller.movies.deleteAllMovies)
	.get('/player/:file', controller.movies.player);


	app.use("/", userNotAuthenticated);
	app.use("/😱", userAuthenticated);


	return app;
}
