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
        .then((subtitles: any) => {
            console.log("SUUUUUUUUUUUUBTITLES ////////////////////////////////////////////////////////////");
            console.log(subtitles);
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
            subtitlesController.downSub(downSubTab, imdb);
        })
    }

    static async downSub(linkSubTab: Array<string>, fileId: string){
        let countTab: Array<number> = [0, 0, 0, 0];
        let i = 0;
        while (i < linkSubTab.length){
            let pattern: RegExp = /^[a-z]{3}/;
            let language: Array<string> | null = linkSubTab[i].match(pattern);
            if (language != null){
                let url = linkSubTab[i].slice(4);
                let path: string | null = null;
                let isValid = await subtitlesController.testLink(url);
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
                    let isSave = await subtitlesController.getFile(url, path);
                }
            }
            i++;
        }
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
                    return "ok";
                });
            }
            return "bad status";
        } catch (error){
            return "error";
        }
    }

    static async testLink(url: string){
        try {
            let response :any = await axios.get(url);
            return (response.status == 200);
        } catch (error) {
            return "error";
        }
    }

























    // static downloadSub(downSubTab: Array<string>){
    //     let url = downSubTab[0].slice(4);
    //     axios
    //     .get(url)
    //     .then()
    // }
    // static async getSub(req: Request, res: Response){
    //     let pattern: RegExp = /[0-9]+/;
    //     const fileId: string = req.body.imdbId.match(pattern)[0];
    //     console.log("LE PAAAATH");
    //     console.log(fileId);

    //     moviesController.searchSub(fileId, (result: Array<string>) => {
    //         let linkSubTab = result;
    //         console.log(linkSubTab);
    //         let pathTab = moviesController.downSub(linkSubTab, fileId);
    //         // console.log('PATHTAAABB');
    //         // console.log(pathTab);
    //         // moviesController.getVtt(pathTab);      
    //     });
    // }

    // static getVtt(pathTab: Array<string>){
    //     pathTab.forEach((path) => {
    //         let newPath: string = path.slice(0, path.length - 3);
    //         console.log("NEW PAAATH");
    //         console.log(newPath);
    //         if (newPath != null){
    //             try{
    //                 // gunzip(path, newPath[0], function() {
    //                 //     console.log('This is called when the extraction is completed.');
    //                 // });
    //             }
    //             catch(e){
    //                 console.log(e);
    //             }
    //         }
    //     });
    // }

    // static downSub(linkSubTab: Array<string>, fileId: string){
    //     let pathTab = new Array;
    //     linkSubTab.forEach((link) => {
    //         let pattern: RegExp = /^[a-z]{3}/;
    //         let language: Array<string> | null = link.match(pattern);
    //         if (language != null){
    //             let url = link.slice(4);
    //             let path: string = "none";
    //             console.log("downLink");
    //             console.log(url);
    //             switch (language[0]){
    //                 case 'eng':
    //                     path = "sub/" + fileId + "-eng.srt.gz";
    //                     pathTab.push(path);
    //                     break;
    //                 case 'fre':
    //                     path = "sub/" + fileId + "-fre.srt.gz";
    //                     pathTab.push(path);
    //                     break;
    //                 case 'spa':
    //                     path = "sub/" + fileId + "-spa.srt.gz";
    //                     pathTab.push(path);
    //                     break;
    //                 case 'ita':
    //                     path = "sub/" + fileId + "-ita.srt.gz";
    //                     pathTab.push(path);
    //                     break;
    //             }
    //             axios.get(url, { "Accept-Encoding": "gzip", encoding: null})
    //             .then((response: any) => {
    //                 var data = response.data;                                 // base64 encoded string recieved from OpenSubtitles
    //                 var buf = new Buffer.from(data, 'base64');             // read the base64 string
    //                 zlib.unzip(buf, { windowBits: zlib.Z_MAX_WBITS }, function (err: any, buffer: any) {          // decompress the content
    //                     if (err) throw err;                             // handle decompression error
    //                     console.log("BFFFEEEEEERRRR");
    //                     console.log(buffer);
    //                     var content = buffer.toString('utf8');          // encode in utf-8
    //                     fs.writeFile(path, content, function (err: any) {    // write file to path
    //                         if (err) throw err;                           // handle writing to file error
    //                     });
    //                 });
    //             });
    //             // axios.get(url, {responseType: 'blob', "Accept-Encoding" : "gzip"})
    //             // .then((response: any) => {
    //             //     if (response.status == 200){
    //             //         fs.writeFile(path, response.data, () => {
    //             //         console.log('The file has been saved!');
    //             //        });
    //             //     }
    //             // })
    //             // .catch((error: any) => {
    //             //     console.log("NEW ERROR");
    //             //     console.log(error);                   
    //             // });
    //         }
    //     });
    //     return pathTab;
    // }

    // static searchSub(fileId: string, callback: any){
    //     let langTab: Array<string> = ['eng', 'fre', 'spa', 'ita'];
    //     let downloadSub  = new Array;

    //     langTab.forEach((language) => {
    //         // console.log("ON COMMENCE");
    //         // console.log(language);
    //         var url = "https://rest.opensubtitles.org/search/imdbid-" + fileId + "/sublanguageid-" + language;
    //         axios
    //         .get(url, { headers: { 'User-Agent': "TemporaryUserAgent", "Accept-Encoding" : "gzip" } })
    //         .then((response: any) => {
    //             // console.log("TEEEST");
    //             if (response.status == 200){
    //                 // console.log("lalalalali");
    //                 // console.log(response.data[0]);
    //                 let dataLang = "undefined";
    //                  if (response.data[0] != undefined){
    //                      dataLang = response.data[0].SubLanguageID;
    //                  }
    //                 // console.log("DATALANG");
    //                 // console.log(dataLang);
    //                 switch (dataLang){
    //                     case 'eng':
    //                         downloadSub.push('eng&' + response.data[0].SubDownloadLink);
    //                         break;
    //                     case 'fre':
    //                         downloadSub.push('fre&' + response.data[0].SubDownloadLink);
    //                         break;
    //                     case 'spa':
    //                         downloadSub.push('spa&' + response.data[0].SubDownloadLink);
    //                         break;
    //                     case 'ita':
    //                         downloadSub.push('ita&' + response.data[0].SubDownloadLink);
    //                         break;
    //                     case 'undefined':
    //                         downloadSub.push('undefined');                           
    //                 }
    //                 // console.log(downloadSub.length);
    //                 if (downloadSub.length == 4){
    //                     // console.log("SSIIIIZEEEE");
    //                     // console.log(downloadSub);
    //                     callback(downloadSub);
    //                 }
    //             }
    //         })
    //         .catch((error: any) => {
    //             console.log("ERROR");
    //             console.log(error);
    //         })
    //     });
    // }
}







// fonction qui marche pour hashcode SSL_OP_NETSCAPE_CA_DN_BUG
// static hashFile(filePath: String, callback:any) {

//     const stats = fs.statSync(filePath);
//     const sizeFile = stats.size;

//     const HASH_CHUNK_SIZE: number = 64 * 1024;
//     let longs: any = [];
//     let temp: number = sizeFile;

//     function read(start: number, end: number | undefined, callback:any) {
//         fs.readFile(filePath, 'binary', (err: any, data: any) => {
//             let file: String;
//             if (end === undefined) {
//                 data != "" ? console.log("ok") : console.log("NOOOO");
//                 file = data.slice(start, sizeFile);
//             } else {
//                 file = data.slice(start, end);
//             }
//             callback(process(file));
//         });
//     }

//     function process(chunk: any) {
//         for (var i = 0; i < chunk.length; i++) {
//             longs[(i + 8) % 8] += chunk.charCodeAt(i);
//         }
//     }

//     function binl2hex(a: any) {
//         var b: number = 255;
//         var d: String = '0123456789abcdef';
//         var e: String = '';
//         var c: number = 7;

//         a[1] += a[0] >> 8;
//         a[0] = a[0] & b;
//         a[2] += a[1] >> 8;
//         a[1] = a[1] & b;
//         a[3] += a[2] >> 8;
//         a[2] = a[2] & b;
//         a[4] += a[3] >> 8;
//         a[3] = a[3] & b;
//         a[5] += a[4] >> 8;
//         a[4] = a[4] & b;
//         a[6] += a[5] >> 8;
//         a[5] = a[5] & b;
//         a[7] += a[6] >> 8;
//         a[6] = a[6] & b;
//         a[7] = a[7] & b;
//         for (c; c > -1; c--) {
//             e += d.charAt(a[c] >> 4 & 15) + d.charAt(a[c] & 15);
//         }
//         return e;
//     }


//     for (var i = 0; i < 8; i++) {
//         longs[i] = temp & 255;
//         temp = temp >> 8;
//     }

//     read(0, HASH_CHUNK_SIZE, function() {
//         read(sizeFile - HASH_CHUNK_SIZE, undefined, function() {
//             callback(binl2hex(longs));
//         });
//     });
// }