import "reflect-metadata"
import { createConnection, Connection, Repository } from "typeorm"
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import User from '../app/models/user'
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
	entities: [User]
}


export async function connectWithPg() {
	initializeDb();
	connection =  await createConnection(typeOrmConfig);
	return connection
}

export function closeDBConnection () {
	connection && connection.isConnected && connection.close()
}

const initializeDb = async function() {
	const client = new Client({
		password: "postgres",
		user: "postgres",
		host: "postgres",
		port: 5432
	});
	await client.query('CREATE DATABASE hypertube', function(err) { // create user's db
		console.log(err); // ignore if the db is there
		client.end();
	});

}
