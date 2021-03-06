import getServer from './server'
import {Connection} from 'typeorm'
import {connectWithPg} from './connect_pg'

export default async function startServer ({isDev = false, isTest = false}, dbConnection?: Connection) 
{
	const connection = await connectWithPg();
	const app = await getServer(connection, isDev)

	return app
}
