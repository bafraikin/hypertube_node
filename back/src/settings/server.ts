import 'reflect-metadata';
import express from 'express'
import setupPassport from './passport'
import * as bodyParser from 'body-parser'
import {Connection} from 'typeorm'
import {red} from 'chalk'
import setRoute from './route'
//const cors = require('cors');
import cookieParser from 'cookie-parser'
const cookieSession = require('cookie-session')

export default async function getServer (connection: Connection, isDev = false) {
	let server = express();

	server.use(function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "http://localhost:8080");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		res.header("Access-Control-Allow-Credentials",  "true")

		next();

	});

	server.use(express.static('films'));


	server.use(bodyParser.urlencoded({
		extended: true
	}));


	server.use(cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: ['Arman.D']
	}));
	server.use(cookieParser('Arman.D'));
	server.use(bodyParser.json());
	server = await setupPassport(server);
	server = setRoute(connection, server);
	return server
}
