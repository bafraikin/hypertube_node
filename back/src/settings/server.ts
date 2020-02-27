import 'reflect-metadata';
import express, {Request, Response} from 'express'
import setupPassport from './passport'
import * as bodyParser from 'body-parser'
import {Connection} from 'typeorm'
import {red} from 'chalk'
import setRoute from './route'
import cookieParser from 'cookie-parser'
const cookieSession = require('cookie-session')
const fileUpload = require('express-fileupload')

export default async function getServer (connection: Connection, isDev = false) {
	let server = express();

	server.use(function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "http://127.0.0.1:8080");
		res.header("Access-Control-Allow-Methods", "GET, PUT,  HEAD, POST, DELETE, OPTIONS");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		res.header("Access-Control-Allow-Credentials",  "true");
		next();
	});

	server.use(cookieParser('Arman.D'));
	server.use(cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: ['Arman.D']
	}));

	function callbackOnLimit(req: Request, res: Response, next: any) {
    res.status(413).send('File size limit has been reached');
		return;
	}

	server.use(bodyParser.urlencoded({ extended: true , limit: '1mb'}));
	server.use(fileUpload({limits: {fileSize: 2000000, files: 1}, debug: true, abortOnLimit: true, limitHandler: callbackOnLimit, useTempFiles : true, tempFileDir : '/back/public/tmpPic', createParentPath : true }));
	server.use(express.static('public'));
	server.use(express.static('sub'));
	server.use(express.static('films'));
	server.use(bodyParser.json({limit: '1mb'}));
	server = await setupPassport(server);
	server = setRoute(connection, server);
	return server
}
