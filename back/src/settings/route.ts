import {Connection} from 'typeorm'
import passport from 'passport';
import * as controller from '@app/controllers/index'
import {Express, NextFunction ,Request, Response, Router} from "express";
import logger from "./logger"

export default function setRoute(connection: Connection, app: Express) {

	let userNotAuthenticated: Router = Router().use(controller.authenticate.checkNotAuth);
	let userAuthenticated: Router = Router().use(controller.authenticate.checkAuth);

	app.use((error: any, req: Request, res: Response, next: NextFunction) => {
		if (error != null && error instanceof SyntaxError) {
			return res.status(422).json({
				error: 'invalid json'
			})
		}
		return next()
	})
	app.use(function(req: Request, res: Response, next: NextFunction) {
		res.removeHeader('X-Powered-By')
		logger.info(`[Express] ${req.method} ${req.url} ${req.ip}`)
		return next()
	})

	app.get('/ytsApiDefaultList', controller.movies.ytsApiDefaultList);
	userNotAuthenticated.get('/ytsApiDefaultList', controller.movies.ytsApiDefaultList);
	userNotAuthenticated.post('/authentication', passport.authenticate('local'), controller.authenticate.afterAuth);
	userNotAuthenticated.post("/user", controller.user.create);
	userAuthenticated.get("/user", controller.user.getUser);
	userAuthenticated.route("/authentication").delete(controller.authenticate.logout);
	userAuthenticated.post('/film-info', controller.filmInfo.searchInfo);
	userAuthenticated.post('/film-search-api-query-string', controller.movies.ytsApiQueryString);
	userAuthenticated.get('/player/:url/:hash/:imdbCode/:title', controller.movies.player);

	userAuthenticated.get('/comment', controller.comments.getComment);
	userAuthenticated.post('/comment', controller.comments.postComment);
	userAuthenticated.get("/userProfile", controller.user.userProfile);


	app.use(`/${encodeURI("😱")}`, userNotAuthenticated);
	app.use(`/${encodeURI("😂")}`, userAuthenticated);
	return app;
}

	// userNotAuthenticated.get("/test", (req: Request, res: Response) => {
	// 	console.log("been here")
	// 	res.send("No login")
	// })
	// userNotAuthenticated.get('/success',(req: Request, res: Response) => {
	// 	console.log("HHHH")
	// 	res.send("login")
	// });

	/*
	 * La route /UserCreate permet de cree un utilisateur 
	 * Elle prend elle a besoin des info du model user.ts pour fonctionner
	 * peut etre tester a la main avec cette commande :
	 * curl -d "img=abc.fr&password=7char_and_a_int&email=email@42.fr&firstname=foo&lastname=bar&pseudo=xXx"
	 -X POST http://localhost:3000/UserCreate
	 */

	// userAuthenticated.post('/download', controller.movies.getDownload);
	// userAuthenticated
	// .get('/ytsApiDefaultList', controller.movies.ytsApiDefaultList)
	// .get('/download/delete', controller.movies.deleteAllMovies)
