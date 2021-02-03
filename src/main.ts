import Config from "config";
import log4js from "log4js";
import { setPayment, getNoPassPayment, updateZaimMoneyId } from './dao/RpointPaymentDao'
import { getGenre, getDefaultGenre } from './dao/ZaimGenreDao'
import { getRpointPayments } from './getRpoint'
import { ZaimService } from './ZaimService'
import { ZaimGenre } from './entity/ZaimGenre'

log4js.configure(Config.get('log4js'));

const logger = log4js.getLogger()

async function main() {
    const nowDate = new Date();
    logger.info('zaim-edit-app start.')

    // rpay情報取得
    const rpayAmounts = await getRpointPayments(nowDate).then();

    // 取得結果DB書き込み
    if(rpayAmounts.length != 0) {
        try{
            const updCnt = await setPayment(rpayAmounts);
            logger.info('update count:', updCnt);
        } catch (e) {
            logger.error(e);
        }
    }

    // Zaim実行
    const rpays = await getNoPassPayment().then();
    logger.info('zaim exec target:', rpays.length);
    const zaimService = new ZaimService();

    for (const rpay of rpays) {
        if(rpay.type == 'use') {
            try {
                let zGenre:ZaimGenre = getDefaultGenre();
                if(rpay.place != null) {
                    zGenre = await getGenre(!rpay.place ? '' :rpay.place).then()
                }
                const moneyId = await zaimService.createRpayPayment(rpay, zGenre).then();
                // idがundfinedになることはない。コンパイラ対策
                await updateZaimMoneyId(rpay.id != null? rpay.id : 1, nowDate, moneyId);
            } catch (e) {
                logger.info(rpay);
                logger.error('zaim create_payment error:', `id:${rpay.id}`,
                    `service_name:${rpay.serviceName}`, `amount:${rpay.amount}\n`, e);
                process.exit(1);
            }
        } else if (rpay.type == 'get') {
            try {
                const moneyId = await zaimService.createRpayIncome(rpay).then();
                // idがundfinedになることはない。コンパイラ対策
                await updateZaimMoneyId(rpay.id != null? rpay.id : 1, nowDate, moneyId);
            } catch (e) {
                logger.info(rpay);
                logger.error('zaim create_income error:', `id:${rpay.id}`,
                    `service_name:${rpay.serviceName}`, `amount:${rpay.amount}\n`, e);
                process.exit(1);
            }
        }
    }
    
    logger.info('zaim-edit-app end.')
}

main();
