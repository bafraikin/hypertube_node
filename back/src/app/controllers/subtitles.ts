import {Request, Response} from 'express';
import subtitlesServices from '@app/services/subtitles';

const OS = require('opensubtitles-api');
const OpenSubtitles = new OS({
    useragent:'TemporaryUserAgent',
    ssl: true
});

export default class subtitlesController{

    static getSub(req: Request, res: Response){
        let imdb: string = req.body.imdbId;

        OpenSubtitles.search({
            sublanguageid: 'eng, fre, chi',

            extensions: ['srt', 'vtt'],
            limit: 2,

            imdbid: imdb
        })
        .then(async (subtitles: any) => {
            let downSubTab = new Array;
            console.log(subtitles);
            if (subtitles.en != null){
                await subtitlesServices.createSubTab(downSubTab, subtitles.en);
            }
            if (subtitles.fr != null){
                await subtitlesServices.createSubTab(downSubTab, subtitles.fr);
            }
            if (subtitles.zh != null){
                await subtitlesServices.createSubTab(downSubTab, subtitles.zh);
            }
            let whichSub: Array<string> | undefined = await subtitlesServices.downSub(downSubTab, imdb);
            res.send(whichSub);

        })
        .catch((error: any) => {
            console.log("Error get subtitles");
            console.log(error);
        })
    }
}