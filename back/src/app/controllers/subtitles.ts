import {Request, Response} from 'express';
import { fstat } from 'fs';
import { AdvancedConsoleLogger } from 'typeorm';
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from 'constants';
const axios = require('axios');
const fs = require('fs');
const crypto = require('crypto');

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

    static hashFile(filePath: String, callback:any) {

        const stats = fs.statSync(filePath);
        const sizeFile = stats.size;

        const HASH_CHUNK_SIZE: number = 64 * 1024;
        let longs: any = [];
        let temp: number = sizeFile;
    
        function read(start: number, end: number | undefined, callback:any) {
            fs.readFile(filePath, 'binary', (err: any, data: any) => {
                let file: String;
                if (end === undefined) {
                    data != "" ? console.log("ok") : console.log("NOOOO");
                    file = data.slice(start, sizeFile);
                } else {
                    file = data.slice(start, end);
                }
                callback(process(file));
            });
        }
    
        function process(chunk: any) {
            for (var i = 0; i < chunk.length; i++) {
                longs[(i + 8) % 8] += chunk.charCodeAt(i);
            }
        }
    
        function binl2hex(a: any) {
            var b: number = 255;
            var d: String = '0123456789abcdef';
            var e: String = '';
            var c: number = 7;
    
            a[1] += a[0] >> 8;
            a[0] = a[0] & b;
            a[2] += a[1] >> 8;
            a[1] = a[1] & b;
            a[3] += a[2] >> 8;
            a[2] = a[2] & b;
            a[4] += a[3] >> 8;
            a[3] = a[3] & b;
            a[5] += a[4] >> 8;
            a[4] = a[4] & b;
            a[6] += a[5] >> 8;
            a[5] = a[5] & b;
            a[7] += a[6] >> 8;
            a[6] = a[6] & b;
            a[7] = a[7] & b;
            for (c; c > -1; c--) {
                e += d.charAt(a[c] >> 4 & 15) + d.charAt(a[c] & 15);
            }
            return e;
        }
    
    
        for (var i = 0; i < 8; i++) {
            longs[i] = temp & 255;
            temp = temp >> 8;
        }
    
        read(0, HASH_CHUNK_SIZE, function() {
            read(sizeFile - HASH_CHUNK_SIZE, undefined, function() {
                callback(binl2hex(longs));
            });
        });
    }



    static getHash(req: Request, res: Response){
        
        const filePath: String = req.body.videoPath;

        moviesController.hashFile(filePath, (hashString: any) => {
            console.log("LE HAAAAAASSSHHHHHHHHHH");
            console.log(hashString);
        });
    }
}