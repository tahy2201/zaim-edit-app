import {MigrationInterface, QueryRunner} from "typeorm";

export class RpointPayment1611838867562 implements MigrationInterface {
    name = 'RpointPayment1611838867562'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `rpoint_payment` DROP COLUMN `credate_date`");
        await queryRunner.query("ALTER TABLE `rpoint_payment` ADD `create_date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `rpoint_payment` DROP COLUMN `service_name`");
        await queryRunner.query("ALTER TABLE `rpoint_payment` ADD `service_name` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `rpoint_payment` DROP COLUMN `type`");
        await queryRunner.query("ALTER TABLE `rpoint_payment` ADD `type` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `rpoint_payment` DROP COLUMN `memo`");
        await queryRunner.query("ALTER TABLE `rpoint_payment` ADD `memo` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `rpoint_payment` DROP COLUMN `effective_date`");
        await queryRunner.query("ALTER TABLE `rpoint_payment` ADD `effective_date` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `rpoint_payment` DROP COLUMN `place`");
        await queryRunner.query("ALTER TABLE `rpoint_payment` ADD `place` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `rpoint_payment` CHANGE `update_date` `update_date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_8ee2babd89c3448eccaf60366d` ON `rpoint_payment` (`issue_date`, `service_name`, `type`, `amount`)");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_8ee2babd89c3448eccaf60366d` ON `rpoint_payment`");
        await queryRunner.query("ALTER TABLE `rpoint_payment` CHANGE `update_date` `update_date` datetime(0) NULL");
        await queryRunner.query("ALTER TABLE `rpoint_payment` DROP COLUMN `place`");
        await queryRunner.query("ALTER TABLE `rpoint_payment` ADD `place` varchar(100) CHARACTER SET \"utf8\" COLLATE \"utf8_bin\" NULL");
        await queryRunner.query("ALTER TABLE `rpoint_payment` DROP COLUMN `effective_date`");
        await queryRunner.query("ALTER TABLE `rpoint_payment` ADD `effective_date` date NULL");
        await queryRunner.query("ALTER TABLE `rpoint_payment` DROP COLUMN `memo`");
        await queryRunner.query("ALTER TABLE `rpoint_payment` ADD `memo` varchar(100) CHARACTER SET \"utf8\" COLLATE \"utf8_bin\" NULL");
        await queryRunner.query("ALTER TABLE `rpoint_payment` DROP COLUMN `type`");
        await queryRunner.query("ALTER TABLE `rpoint_payment` ADD `type` varchar(20) CHARACTER SET \"utf8\" COLLATE \"utf8_bin\" NOT NULL");
        await queryRunner.query("ALTER TABLE `rpoint_payment` DROP COLUMN `service_name`");
        await queryRunner.query("ALTER TABLE `rpoint_payment` ADD `service_name` varchar(20) CHARACTER SET \"utf8\" COLLATE \"utf8_bin\" NOT NULL");
        await queryRunner.query("ALTER TABLE `rpoint_payment` DROP COLUMN `create_date`");
        await queryRunner.query("ALTER TABLE `rpoint_payment` ADD `credate_date` datetime NULL");
    }

}
