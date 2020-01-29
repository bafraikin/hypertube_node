import {Request, Response} from 'express';
import { fstat } from 'fs';
const axios = require('axios');
const fs = require('fs');

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

    static hashFile(req: Request, res:Response){
        console.log("TEEESSTTTTT");
        console.log(req.body.videoPath);
        let filePath: String = req.body.videoPath;
        let stats: any = fs.statSync(filePath);
        let sizeFile = stats.size;
        res.send(sizeFile);
        // fs.readFile(req.body.videoPath, (err: any, data: any) => {
        //     if (err) throw err;
        //     console.log(data);
        //     res.send(data);
        // });
    }
}