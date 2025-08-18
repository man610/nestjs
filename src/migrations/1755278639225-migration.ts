import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1755278639225 implements MigrationInterface {
    name = 'Migration1755278639225'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "file_enitity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" character varying NOT NULL, "irysId" character varying NOT NULL, "signature" character varying NOT NULL, "timestamp" character varying NOT NULL, CONSTRAINT "PK_f2c18a60b9ef559dcde54654ff7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "file_enitity" ADD CONSTRAINT "FK_ca9f262c9686c145e5237557ed7" FOREIGN KEY ("userId") REFERENCES "user_enitity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file_enitity" DROP CONSTRAINT "FK_ca9f262c9686c145e5237557ed7"`);
        await queryRunner.query(`DROP TABLE "file_enitity"`);
    }

}
