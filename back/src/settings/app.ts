require('module-alias/register')
import startServer from './start_server'
import { join } from 'path'
import {blue, red }from 'chalk'
import logger from '@settings/logger';


const isDev = true;
//const isTest = process.env.NODE_ENV === 'test'
const isTest = false;

const env = (isDev && 'development') || (isTest && 'test') || 'production'

async function bootstrap() {
	const app = await startServer({ isDev, isTest });
	const port: number = 3000;
	logger.info('starting server...');

	logger.info(blue(`Starting ${env} server on port ${port}: http://127.0.0.1:${port}`))
		app.listen(port, (error: Error) => {
		if (error) {
			console.error(red('could not start server'))
			console.error(red(error.message))
		} else {
			logger.info(blue(`Server started, http://127.0.0.1:${port}`))
		}
	});
}

bootstrap();
