import 'reflect-metadata';
import {createConnection} from 'typeorm';
import User from 'app/models/user';
import  express from 'express'
import setupPassport from './passport'
import * as bodyParser from 'body-parser'
import {Connection} from 'typeorm'
import {red} from 'chalk'
import * as cors from 'cors'

const flash = require('connect-flash')

export default async function getServer (connection: Connection, isDev = false) {
	let server = express();

	if (isDev) {
		const corsOptions = {
			  origin: function(origin: string, callback: Function){
				// var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
				callback(null, true);
			},
			credentials: true
		};
		server.use(cors(corsOptions));
	}

	server.use(bodyParser.urlencoded({
		extended: true
	}))

	server.use(bodyParser.json());
	server.use(flash())
	server = await setupPassport(server, connection)

	return server
}
