import {MigrationInterface, QueryRunner} from "typeorm";

export class RpointPayment1611885216641 implements MigrationInterface {
    name = 'RpointPayment1611885216641'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `rpoint_payment` ADD `zaim_pass_date` datetime NULL");
        await queryRunner.query("ALTER TABLE `rpoint_payment` ADD `zaim_money_id` varchar(255) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `rpoint_payment` DROP COLUMN `zaim_money_id`");
        await queryRunner.query("ALTER TABLE `rpoint_payment` DROP COLUMN `zaim_pass_date`");
    }

}
