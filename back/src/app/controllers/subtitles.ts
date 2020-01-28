import {Request, Response} from 'express';
const axios = require('axios');

export default class moviesController{
    static getSub(req: Request, res: Response){
        var url = "http://api.thesubdb.com/?action=languages";
        axios
        .get(url, { headers: { 'User-Agent': 'SubDB/1.0 (Laeti/0.1; http://localhost:3000)' } })
        .then((response: any) => {
            if (response.status == 200){
                console.log("lalalalali");
                console.log(response.data);
            }
        })
        .catch((error: any) => {
            console.log(error.response);
        })
    }
}