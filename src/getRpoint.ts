import "reflect-metadata";
import Config from "config";
import { scrapUseList, scrapGetList } from './scraping'
import { RpointPayment } from './entity/RpointPayment'
import { formatDate } from './utility'

const puppeteer = require('puppeteer');
const LOGIN_URL = "https://point.rakuten.co.jp/history/?l-id=point_header_history";

function sleep(milliseconds: number) {
    return new Promise<void>(resolve => {
      setTimeout(() => resolve(), milliseconds);
    });
  }

async function execBrowser(page: any, url: string): Promise<any> {
    await page.goto(url) // ページへ移動
    await page.type('input[name="u"]', Config.get('rpoint.user'));
    await page.type('input[name="p"]', Config.get('rpoint.pass'));
    let button = await page.$('input.loginButton');
    await button.click();
    await page.waitForNavigation({timeout: 60000, waitUntil: "domcontentloaded"});
    const rpayHtml = await page.content();
    return rpayHtml;
}

export const getRpointPayments = async(noewDate:Date): Promise<RpointPayment[]> => {
    let rpayHtml = '';
    try {
        // const browser = await puppeteer.launch({
        //     headless: false,
        //     slowMo: 50,
        //     args: ['--lang=ja']
        // })
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--lang=ja', '--no-sandbox']
        })
        const page = await browser.newPage()
        await page.setExtraHTTPHeaders({
            'Accept-Language': 'ja-JP'
        });
        rpayHtml = await execBrowser(page, LOGIN_URL).then();
        browser.close();

        const fs = require("fs");
        fs.writeFileSync("rpayHtml_last.html", rpayHtml);
        
        const retRpayList = scrapUseList(rpayHtml).concat(scrapGetList(rpayHtml));
        return retRpayList;
    } catch(e) {
        console.error(e);
        const fs = require("fs");
        fs.writeFileSync("rpayHtml_" + formatDate(noewDate) + ".html", rpayHtml);
        process.exit(1);
    }

    return [];
  }

