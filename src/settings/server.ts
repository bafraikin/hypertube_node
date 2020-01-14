import 'reflect-metadata';
import express from 'express'
import setupPassport from './passport'
import * as bodyParser from 'body-parser'
import {Connection} from 'typeorm'
import {red} from 'chalk'
import setRoute from './route'
const cors = require('cors')
const flash = require('connect-flash')

export default async function getServer (connection: Connection, isDev = false) {
	let server = express();

		server.use(cors({
			origin: 'localhost:8080', 
			credentials: false
		}))

	server.use(bodyParser.urlencoded({
		extended: true
	}))

	server.use(bodyParser.json());
	server.use(flash())
	server = setRoute(connection, server);
	server = await setupPassport(server, connection);

	return server
}
