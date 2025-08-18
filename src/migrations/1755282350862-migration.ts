import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1755282350862 implements MigrationInterface {
    name = 'Migration1755282350862'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."file_enitity_status_enum" AS ENUM('PENDING', 'VERIFIED', 'REJECTED')`);
        await queryRunner.query(`ALTER TABLE "file_enitity" ADD "status" "public"."file_enitity_status_enum" NOT NULL DEFAULT 'PENDING'`);
        await queryRunner.query(`ALTER TABLE "file_enitity" ADD CONSTRAINT "UQ_e39fd4b3463164f10b702411d9a" UNIQUE ("irysId")`);
        await queryRunner.query(`ALTER TABLE "file_enitity" ALTER COLUMN "signature" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file_enitity" ALTER COLUMN "signature" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "file_enitity" DROP CONSTRAINT "UQ_e39fd4b3463164f10b702411d9a"`);
        await queryRunner.query(`ALTER TABLE "file_enitity" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."file_enitity_status_enum"`);
    }

}
