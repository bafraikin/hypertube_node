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

	/*AUTHENTICATION*/
	userNotAuthenticated.post('/authentication', passport.authenticate('local'), controller.authenticate.afterAuth);
	userAuthenticated.route("/authentication").delete(controller.authenticate.logout);
	userNotAuthenticated.get('/oauth42', passport.authenticate('42'), controller.authenticate.afterAuth);
	userNotAuthenticated.post('/oauth42/callback', passport.authenticate('42'), controller.authenticate.afterAuth);
	userNotAuthenticated.get('/oauthGoogle', passport.authenticate('google', { scope: ['profile', 'email']  }));
	userNotAuthenticated.post('/oauthGoogle/callback',passport.authenticate('google', { failureRedirect: '/login' }), controller.authenticate.afterAuth);
	/*USER*/
	userAuthenticated.get("/user", controller.user.getUser);
	userNotAuthenticated.post("/user", controller.user.create);
	userAuthenticated.get("/userProfile", controller.user.userProfile);
	/*MOVIE*/
	app.get('/research', controller.movies.theMovieDB);
	userAuthenticated.get('/movie-detail', controller.movies.getMovieDetail);
	/*PLAYER*/
	userAuthenticated.get('/player/:url/:hash/:imdbCode', controller.player.stream);
	/*WATCH*/
	userAuthenticated.get('/watch', controller.watch.getWatch);
	userAuthenticated.post('/watch', controller.watch.postWatch);
	/*COMMENT*/
	userAuthenticated.get('/comment', controller.comments.getComment);
	userAuthenticated.post('/comment', controller.comments.postComment);
	/*TORRENT*/
	userAuthenticated.get('/yts-torrent', controller.torrent.getTorrent);



	app.use(`/${encodeURI("😱")}`, userNotAuthenticated);
	app.use(`/${encodeURI("😂")}`, userAuthenticated);
	return app;
}
