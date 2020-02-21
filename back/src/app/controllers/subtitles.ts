import {Request, Response} from 'express';
import { fstat } from 'fs';
import { AdvancedConsoleLogger } from 'typeorm';
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS, SSL_OP_NETSCAPE_CA_DN_BUG } from 'constants';
import { EventListenerTypes } from 'typeorm/metadata/types/EventListenerTypes';

const fs = require('fs');
const srt2vtt = require('srt-to-vtt');
const axios = require('axios');
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
            if (subtitles.en != null){
                downSubTab.push("eng&" + subtitles.en[0].vtt);
                downSubTab.push("eng&" + subtitles.en[0].utf8);
                if (subtitles.en[1] != null){
                    downSubTab.push("eng&" + subtitles.en[1].vtt);
                    downSubTab.push("eng&" + subtitles.en[1].utf8);
                }
            }
            if (subtitles.fr != null){
                downSubTab.push("fre&" + subtitles.fr[0].vtt);
                downSubTab.push("fre&" + subtitles.fr[0].utf8);
                if (subtitles.fr[1] != null){
                    downSubTab.push("fre&" + subtitles.fr[1].vtt);
                    downSubTab.push("fre&" + subtitles.fr[1].utf8);
                }
            }
            if (subtitles.zh != null){
                downSubTab.push("chi&" + subtitles.zh[0].vtt);
                downSubTab.push("chi&" + subtitles.zh[0].utf8);
                if (subtitles.zh[1] != null){
                    downSubTab.push("chi&" + subtitles.zh[1].vtt);
                    downSubTab.push("chi&" + subtitles.zh[1].utf8);
                }
            }
            let whichSub: Array<string> | undefined = await subtitlesController.downSub(downSubTab, imdb);
            res.send(whichSub);

        })
        .catch((error: any) => {
            console.log("Error get subtitles");
            console.log(error);
        })
    }

    static async downSub(linkSubTab: Array<string>, fileId: string){
        let countTab: Array<number> = [0, 0, 0, 0];
        let i: number = 0;
        let subExist = new Array;
        while (i < linkSubTab.length){
            let pattern: RegExp = /^[a-z]{3}/;
            let language: Array<string> | null = linkSubTab[i].match(pattern);
            if (language != null){
                let url: string = linkSubTab[i].slice(4);
                let path: string | null = null;
                let isValid: boolean | string = await subtitlesController.testLink(url);
                pattern = /.vtt./;
                let isVtt: Array<string> | null = url.match(pattern);
                switch (language[0]){
                    case 'eng':
                        if (isValid === true && countTab[0] == 0){
                            if (isVtt != null){
                                path = "sub/" + fileId + "-eng.vtt";
                            }
                            else{
                                path = "sub/" + fileId + "-eng.srt";
                            }
                            countTab[0]++;
                        }
                        break;
                    case 'fre':
                        if (isValid === true && countTab[1] == 0){
                            if (isVtt != null){
                                path = "sub/" + fileId + "-fre.vtt";
                            }
                            else{
                                path = "sub/" + fileId + "-fre.srt";
                            }
                            countTab[1]++;
                        }
                        break;
                    case 'chi':
                        if (isValid === true && countTab[2] == 0){
                            if (isVtt != null){
                                path = "sub/" + fileId + "-chi.vtt";
                            }
                            else{
                                path = "sub/" + fileId + "-chi.srt";
                            }
                            countTab[2]++;
                        }
                        break;
                }
                if (path != null) {
                    let isSave: string = await subtitlesController.getFile(url, path);
                    if (isSave != "error"){
                        subExist.push(isSave);
                    }
                }
            }
            i++;
        }
        return subExist;
    }

    static async getFile(url: string, path: string){
        try{
            let pattern: RegExp = /.srt$/;
            let isSrt: Array<string> | null = path.match(pattern);
            let vttPath: string = path.slice(0, path.length - 3) + "vtt";
            let response: any = await axios.get(url, {responseType: 'blob'});
            if (response.status == 200){
                fs.writeFile(path, response.data, () => {
                    console.log('The file has been saved!');
                    if (isSrt != null){
                        fs.createReadStream(path)
                        .pipe(srt2vtt())
                        .pipe(fs.createWriteStream(vttPath))
                    } 
                });
                pattern = /eng|fre|chi/;
                let lang: Array<string> | null = path.match(pattern);
                if (lang != null){
                    return lang[0];
                }
            }
            return "error";
        } catch (error){
            return "error";
        }
    }

    static async testLink(url: string){
        try {
            let response: any = await axios.get(url);
            return (response.status == 200);
        } catch (error) {
            return "error";
        }
    }