import {Connection} from 'typeorm'
import {Express } from 'express'
import {Request, Response} from "express";



export default function setRoute(connection: Connection, app: Express) {

	app.get('/', (req: Request, res: Response) =>{
		return res.send({coucou: 'salut'});
	})

	return app;
}


