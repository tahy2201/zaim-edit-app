// import cheerio from 'cheerio';
const cheerio = require('cheerio')
import { RpointPayment } from './entity/RpointPayment'

export const scrapUseList = (htmlStr: string): RpointPayment[] => {
    const $ = cheerio.load(htmlStr);
    const rawUseList = $('.use').children().toArray();
    const nowDate = new Date();
    let useList = [];
    let counter = 0;
    let rpayAmount: RpointPayment = new RpointPayment('', '', 'use', 0, nowDate, nowDate);
    for (const vl of rawUseList){
    //.forEach(vl => {
        let className = '';
        try {
            className = vl.attribs.class;
        } catch(e) {
            throw e;
        }
        let data = vl.children[0].data;

        if('date' == className) {
            if(rpayAmount.issueDate != '') useList.push(rpayAmount);
            data = data + ('-' + vl.children[2].data).replace(/\r?\n/g,"").replace(/\r?\//g,"-").replace(/\r?\s/g,"");
            rpayAmount = new RpointPayment(data, '', 'use', 0, nowDate, nowDate);
        } else if('service' == className) {
            rpayAmount.serviceName = '' + vl.children[0].children[0].data;
        } else if('detail' == className) {
            if(!data) {
                // 楽天kobo
                rpayAmount.place = '' + vl.children[0].children[0].data;
                rpayAmount.effectiveDate = 
                    ('' + vl.children[2].children[1].children[0].data)
                    .replace(/\r?\[/g,"").replace(/\r?\]/g,"").replace(/\r?\//g,"-");
            } else {
                rpayAmount.place = ('' + data).replace(/\r?楽天ペイでポイントを利用/g,"")
                    .replace(/\r?で楽天ペイを利用しての購入によるポイント利用/g,"").replace(/\r?\s/g,"");
                rpayAmount.effectiveDate = 
                    ('' + vl.children[1].children[1].children[0].data).replace(/\r?\[/g,"").replace(/\r?\]/g,"").replace(/\r?\//g,"-");
            } 
        } else if('point' == className) {
            rpayAmount.amount = parseInt(('' + data).replace(/\r?,/g,""));
        }
        counter += 1;
    }
    useList.push(rpayAmount);

    return useList;
}

export const scrapGetList = (htmlStr: string): RpointPayment[] => {
    const $ = cheerio.load(htmlStr);
    const rawGetList = $('.get').children().toArray();
    const nowDate = new Date();
    let getList = [];
    let counter = 0;
    let rpayAmount: RpointPayment = new RpointPayment('', '', 'get', 0, nowDate, nowDate);
    for (const vl of rawGetList){
        let className = '';
        try {
            className = vl.attribs.class;
        } catch(e) {
            throw e;
        }
        let data = vl.children[0].data;

        if('date' == className) {
            if(rpayAmount.issueDate != '') getList.push(rpayAmount);
            data = data + ('-' + vl.children[2].data).replace(/\r?\n/g,"").replace(/\r?\//g,"-").replace(/\r?\s/g,"");
            rpayAmount = new RpointPayment(data, '', 'get', 0, nowDate, nowDate);
        } else if('service' == className) {
            rpayAmount.serviceName = '' + vl.children[0].children[0].data;
        } else if('detail' == className) {
            if(!data) {
                // 楽天kobo
                rpayAmount.place = '' + vl.children[0].children[0].data;
                rpayAmount.memo = ('' + vl.children[0].children[0].data).replace(/\r?\s/g,"");
            } else {
                rpayAmount.place = ('' + data).replace(/\r?でポイントを獲得/g,"").replace(/\r?によるポイント付与/g,"").replace(/\r?\s/g,"");
                rpayAmount.memo = ('' + data).replace(/\r?\s/g,"");
            } 
        } else if('point' == className) {
            rpayAmount.amount = parseInt(('' + data).replace(/\r?,/g,""));
        } else if('note' == className) {
            let effdateTmp;
            if(rpayAmount.serviceName == '楽天Kobo') {
                effdateTmp = ('' + vl.children[2].data).match(/\d{4}\/\d{2}\/\d{2}/g);
            } else {
                effdateTmp = ('' + data).match(/\d{4}\/\d{2}\/\d{2}/g);
            }
            rpayAmount.effectiveDate = effdateTmp != null ? effdateTmp[0].replace(/\r?\//g,"-") : '';
        }
        counter += 1;
    }
    getList.push(rpayAmount);
    return getList;
}

const main2 = () => {
    console.log('It works!');

    // htmlファイル読み込み
    const fs = require("fs");
    const htmlStr = fs.readFileSync("./htmls/point.html", "utf-8");

    // 抜き出し
    const $ = cheerio.load(htmlStr);
    //scrapGetList($)
    console.log(scrapGetList(htmlStr));
};

