import { RpointPayment } from './entity/RpointPayment'
import { ZaimGenre } from './entity/ZaimGenre';
import Zaim from './zaim/zaim'
import Config from "config";

export class ZaimService {
    zaim:Zaim;

    constructor() {
        this.zaim = new Zaim(Config.get('zaim'));
    }


    async createRpayPayment(rpays:RpointPayment, zgenre:ZaimGenre) {
        const reqParam = {
            category_id: zgenre.categoryId,
            genre_id: zgenre.genreId,
            amount: rpays.amount,
            date: rpays.effectiveDate,
            from_account_id: 14132440,
            comment: rpays.memo,
            name: '',
            place: rpays.place
        }

        const data = await this.zaim.createPay(reqParam)?.then();
        if(data != null) return JSON.parse(data).money.id;
        return '';
    }

    async createRpayIncome(rpays:RpointPayment) {
        const reqParam = {
            category_id: 19,
            amount: rpays.amount,
            date: rpays.effectiveDate != null ? rpays.effectiveDate : rpays.issueDate,
            to_account_id: 14132440,
            comment: rpays.memo,
            place: rpays.place
        }

        const data = await this.zaim.createIncome(reqParam)?.then();
        if(data != null) return JSON.parse(data).money.id;
        return '';
    }

}

