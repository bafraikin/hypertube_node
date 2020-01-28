import startServer from './start_server'
import { join } from 'path'
import {blue, red }from 'chalk'


const isDev = true;
//const isTest = process.env.NODE_ENV === 'test'
const isTest = false;

const env = (isDev && 'development') || (isTest && 'test') || 'production'


declare global {
	interface Object {
isObjectEmpty: Function;
	}
}


Object.prototype.isObjectEmpty = function() {
	if ( Object.entries(this).length === 0 && this.constructor === Object)
		return true;
	return false;
};

async function bootstrap() {
	const app = await startServer({ isDev, isTest });
	const port: number = 3000;
	console.log('starting server...');

	console.log(blue(`Starting ${env} server on port ${port}: http://localhost:${port}`))
		app.listen(port, (error: Error) => {
				if (error) {
				console.error(red('could not start server'))
				console.error(red(error.message))
				} else {
				console.log(blue(`Server started, http://localhost:${port}`))
				}
				});
}

bootstrap();
