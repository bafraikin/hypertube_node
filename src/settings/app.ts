import startServer from './start_server'
import { join } from 'path'
import * as chalk from 'chalk'

const isDev = true;
//const isTest = process.env.NODE_ENV === 'test'
const isTest = false;

const env = (isDev && 'development') || (isTest && 'test') || 'production'

async function bootstrap() {
  const app = await startServer({ isDev, isTest });
  const port: number = 3000;

  console.log('starting server...');

  console.log(chalk.blue(`Starting ${env} server on port ${port}: http://localhost:${port}`))

  app.listen(port, (error: Error) => {
    if (error) {
      console.error(chalk.red('could not start server'))
      console.error(chalk.red(error.message))
    } else {
      console.log(chalk.blue(`Server started, http://localhost:${port}`))
    }
  });
}

bootstrap();
