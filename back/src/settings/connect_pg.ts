import "reflect-metadata"
import { createConnection, Connection, Repository } from "typeorm"
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import {User} from '../app/models/user'
import {Movie} from '../app/models/movies'
import {yellow, red} from 'chalk'
import { Client } from "pg";
export let connection: Connection


const typeOrmConfig: PostgresConnectionOptions = {
	type: "postgres",
	host: "postgres",
	port: 5432,
	username: "postgres",
	password: "postgres",
	database: 'hypertube',
	synchronize: true,
	logging: ["query", "error", "schema", "migration"],
	entities: [User, Movie]
}

export async function connectWithPg() {
	connection =  await createConnection(typeOrmConfig);
	return connection
}

export function closeDBConnection () {
	connection && connection.isConnected && connection.close()
}
