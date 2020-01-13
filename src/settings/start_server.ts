import { Request, Response } from 'express'
import getServer from './server'
import {Connection} from 'typeorm'
import {connectWithPg} from './connect_pg'

export default async function startServer ({isDev = false, isTest = false}, dbConnection?: Connection) 
{
	const connection = await connectWithPg();
	const app = await getServer(connection, isDev)

	const env = (isDev && 'development') || (isTest && 'test') || 'production'
	return app
}
