import {Request, Response} from 'express';
import axios from 'axios';

export default class moviesController{
    static searchInfo(req: Request, res: Response){
        var id: string = req.body.idNumber;
        var url = 'http://www.omdbapi.com/?apikey=a6b8b0d5&i=' + id + '&plot=full';
        axios
        .get(url)
        .then((response: any) => {
            if (response.status == 200){
                console.log(response.data);
                res.send(response.data);
            }
        })
        .catch((error: any) => {
            console.log(error.response);
        })
    }
}
