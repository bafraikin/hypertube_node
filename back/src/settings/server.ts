import 'reflect-metadata';
import express from 'express'
import setupPassport from './passport'
import * as bodyParser from 'body-parser'
import {Connection} from 'typeorm'
import {red} from 'chalk'
import setRoute from './route'
const cors = require('cors');
import cookieParser from 'cookie-parser'

export default async function getServer (connection: Connection, isDev = false) {
	let server = express();

	/*
	   server.use(cors({
origin: 'localhost:8080', 
credentials: false
}))*/
	var whitelist = ['http://localhost:8080', 'http://example2.com']
	var corsOptions = {
		origin: function (origin: origin,any: callback) {
			if (whitelist.indexOf(origin) !== -1 || !origin) {
				callback(null, true)
			} else {
				callback(new Error('Not allowed by CORS'))
			}
		}
	}
	server.use(cors(corsOptions));







	server.use(bodyParser.urlencoded({
		extended: true
	}))


	server.use(cookieParser('Armand'));
	server.use(bodyParser.json());
	server = setRoute(connection, server);
	server = await setupPassport(server);
	return server
}
