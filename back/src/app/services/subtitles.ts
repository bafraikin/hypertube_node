import fs from 'fs';
import axios from 'axios';
const srt2vtt = require('srt-to-vtt');

export default class subtitlesServices {
    static async createSubTab(downSubTab: Array<string>, language: any){
        if (language != null){
            downSubTab.push(language[0].langcode + "&" + language[0].vtt, language[0].langcode + "&" + language[0].utf8);
            if (language[1] != null){
                downSubTab.push(language[1].langcode + "&" + language[1].vtt, language[1].langcode + "&" + language[1].utf8);
            }
        }
    }

    static async downSub(linkSubTab: Array<string>, fileId: string){
        let countTab: Array<number> = [0, 0, 0, 0];
        let i: number = 0;
        let subExist = new Array;
        while (i < linkSubTab.length){
            let pattern: RegExp = /^[a-z]{2}/;
            let language: Array<string> | null = linkSubTab[i].match(pattern);
            if (language != null){
                let url: string = linkSubTab[i].slice(4);
                let path: string | null = null;
                let isValid: boolean | string = await subtitlesServices.testLink(url);
                pattern = /.vtt./;
                let isVtt: Array<string> | null = url.match(pattern);
                switch (language[0]){
                    case 'en':
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
                    case 'fr':
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
                    case 'zh':
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
                    let isSave: string = await subtitlesServices.getFile(url, path);
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
}