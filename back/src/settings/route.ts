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

	// /*AUTHENTICATION*/
	userNotAuthenticated.post('/authentication', passport.authenticate('local'), controller.authenticate.afterAuth);
	userAuthenticated.route("/authentication").delete(controller.authenticate.logout);
	userNotAuthenticated.get('/oauth42', passport.authenticate('42'), controller.authenticate.afterAuth);
	userNotAuthenticated.post('/oauth42/callback', passport.authenticate('42'), controller.authenticate.afterAuth);
	userNotAuthenticated.get('/oauthGoogle', passport.authenticate('google', { scope: ['profile', 'email']  }));
	userNotAuthenticated.post('/oauthGoogle/callback',passport.authenticate('google', { failureRedirect: '/login' }), controller.authenticate.afterAuth);

	// /*USER*/
	userNotAuthenticated.post("/user", controller.user.create);
	userNotAuthenticated.post('/resetPassword', controller.user.endResetPassword);
	userNotAuthenticated.post('/forgotPassword', controller.user.startResetPassword);	

	userAuthenticated.put('/updateEmail', controller.user.updateEmail);
	userAuthenticated.put('/updatePassword', controller.user.updatePassword);
	userAuthenticated.put('/updateLogin', controller.user.updateLogin);
	userAuthenticated.put('/updateFirstname', controller.user.updateFirstname);
	userAuthenticated.put('/updateLastname', controller.user.updateLastname);
	userAuthenticated.put('/updateImageUrl', controller.user.updateImageUrl);
	userAuthenticated.put('/updateLang', controller.user.updateLang);

	userAuthenticated.get("/userProfile", controller.user.userProfile);
	userAuthenticated.get("/user", controller.user.getUser);

	// /*MOVIE*/
	app.get('/research', controller.movies.searchForMovies);
	userAuthenticated.get('/movie-detail', controller.movies.getMovieDetail);
	userAuthenticated.get('/movie-casting', controller.movies.getMovieCasting);
	// /*PLAYER*/
	userAuthenticated.get('/player/:magnetLink', controller.player.stream);
	// /*WATCH*/
	userAuthenticated.get('/watch', controller.watch.getWatch);
	userAuthenticated.post('/watch', controller.watch.postWatch);
	// /*COMMENT*/
	userAuthenticated.get('/comment', controller.comments.getComment);
	userAuthenticated.post('/comment', controller.comments.postComment);
	// /*TORRENT*/
	userAuthenticated.get('/torrent', controller.torrent.getTorrent);
	// /*SUBTITLES*/
	userAuthenticated.get('/subtitles', controller.subtitles.getSub);

	app.use(`/${encodeURI("😱")}`, userNotAuthenticated);
	app.use(`/${encodeURI("😂")}`, userAuthenticated);
	return app;
}
