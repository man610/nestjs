import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1755278887667 implements MigrationInterface {
    name = 'Migration1755278887667'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file_enitity" DROP COLUMN "timestamp"`);
        await queryRunner.query(`ALTER TABLE "file_enitity" ADD "timestamp" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file_enitity" DROP COLUMN "timestamp"`);
        await queryRunner.query(`ALTER TABLE "file_enitity" ADD "timestamp" character varying NOT NULL`);
    }

}
