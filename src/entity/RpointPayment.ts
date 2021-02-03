import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index} from "typeorm";

@Entity()
@Index(["issueDate", "serviceName", "type", "amount"], {unique: true})
export class RpointPayment {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column('date', {name: 'issue_date'})
    issueDate: string;

    @Column({name: 'service_name'})
    serviceName: string;

    @Column()
    type: String;

    @Column()
    amount: number;

    @CreateDateColumn({name : 'create_date'})
    credateDate: Date;

    @UpdateDateColumn({name : 'update_date'})
    updateDate: Date;

    @Column({nullable: true})
    memo?: string;

    @Column({name : 'effective_date', nullable: true})
    effectiveDate?: string;

    @Column({nullable: true})
    place?: string;

    @Column({name : 'zaim_pass_date', nullable: true})
    zaimPassDate?: Date;

    @Column({name : 'zaim_money_id', nullable: true})
    zaimMoneyId?: string;

    constructor(
        issueDate: string,
        serviceName: string,
        type: String,
        amount: number,
        credateDate: Date,
        updateDate: Date,
        memo?: string,
        effectiveDate?: string,
        place?: string,
        zaimPassDate?: Date,
        zaimMoneyId?: string,
    ) {
        this.issueDate = issueDate;
        this.serviceName = serviceName;
        this.type = type;
        this.amount = amount;
        this.memo = memo;
        this.effectiveDate = effectiveDate;
        this.place = place;
        this.zaimPassDate = zaimPassDate;
        this.zaimMoneyId = zaimMoneyId;
        this.credateDate = credateDate;
        this.updateDate = updateDate;
    }
    
}