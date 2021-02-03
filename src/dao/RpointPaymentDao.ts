import { createConnection, getRepository, createQueryBuilder } from 'typeorm';
import { RpointPayment } from '../entity/RpointPayment'


export async function setPayment(payments:RpointPayment[]) {
    const conn = await createConnection('default');
    const rPaymentRepository = getRepository(RpointPayment);
    let updCnt = 0;

    for(let i = 0; i< payments.length; i++) {
        try{
           await rPaymentRepository.insert(payments[i]);
           updCnt += 1;
        } catch(e) {
            if(e.code == 'ER_DUP_ENTRY') {
                // キー重複なら続行
                console.log(e.sqlMessage);
            } else {
                throw e;
            }
        }
    }
    await conn.close();
    return updCnt;
}

export async function getNoPassPayment() {
    const conn = await createConnection('default');
    let returnList:RpointPayment[] = [];

    const rowRpays:any[] = await createQueryBuilder().from(RpointPayment, 'rpoint_payment')
        .where('zaim_money_id IS NULL', {}).execute();

    for (const rowRpay of rowRpays) {
        let rpay = new RpointPayment(
            rowRpay.issue_date, rowRpay.service_name, rowRpay.type, rowRpay.amount, rowRpay.create_date,
             rowRpay.update_date, rowRpay.memo, rowRpay.effective_date, rowRpay.place);
        rpay.id = rowRpay.id;
        returnList.push(rpay);
    } 

    await conn.close();
    return returnList;
}

export async function updateZaimMoneyId(id:number, nowDate:Date, moneyId:string) {
    const conn = await createConnection('default');

    var saaa = await createQueryBuilder()
        .update(RpointPayment)
        .set({zaimPassDate: nowDate, zaimMoneyId: moneyId, updateDate: nowDate})
        .where('id = :id', { id: id})
        .execute();
    
    await conn.close();
}
