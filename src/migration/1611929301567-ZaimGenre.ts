import {MigrationInterface, QueryRunner} from "typeorm";

export class ZaimGenre1611929301567 implements MigrationInterface {
    name = 'ZaimGenre1611929301567'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `zaim_genre` (`id` int NOT NULL AUTO_INCREMENT, `place` varchar(255) NOT NULL, `category_id` int NOT NULL, `category_name` varchar(255) NOT NULL, `genre_id` int NOT NULL, `genre_name` varchar(255) NOT NULL, `create_date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `update_date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_28ea7bd8aff8fee1f98ff99280` (`place`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_28ea7bd8aff8fee1f98ff99280` ON `zaim_genre`");
        await queryRunner.query("DROP TABLE `zaim_genre`");
    }

}
