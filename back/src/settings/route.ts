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

	userNotAuthenticated.post('/authentication', passport.authenticate('local'), controller.authenticate.afterAuth);
	userNotAuthenticated.post("/user", controller.user.create);
	userNotAuthenticated.get('/oauth42', passport.authenticate('42'), controller.authenticate.afterAuth);
	userNotAuthenticated.post('/oauth42/callback', passport.authenticate('42'), controller.authenticate.afterAuth);



	userAuthenticated.get("/user", controller.user.getUser);
	userAuthenticated.route("/authentication").delete(controller.authenticate.logout);
	userAuthenticated.get('/player/:url/:hash/:imdbCode', controller.movies.player);

	userAuthenticated.get('/watch', controller.watch.getWatch);
	userAuthenticated.post('/watch', controller.watch.postWatch);
	userAuthenticated.get('/comment', controller.comments.getComment);
	userAuthenticated.post('/comment', controller.comments.postComment);
	userAuthenticated.get('/movie-detail', controller.movies.getMovieDetail);
	userAuthenticated.get('/yts-torrent', controller.movies.getYtsTorrent);




	app.get('/ytsApiDefaultList', controller.movies.ytsApiDefaultList);


	userAuthenticated.get("/userProfile", controller.user.userProfile);
	app.get('/research', controller.movies.theMovieDB);


	app.use(`/${encodeURI("😱")}`, userNotAuthenticated);
	app.use(`/${encodeURI("😂")}`, userAuthenticated);
	return app;
}
