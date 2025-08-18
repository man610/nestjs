import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1755275991605 implements MigrationInterface {
    name = 'Migration1755275991605'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_enitity" ("id" character varying NOT NULL, "name" character varying NOT NULL, "userName" character varying NOT NULL, "profileImage" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_980c518fbc4b5f2a7a79f113e48" UNIQUE ("userName"), CONSTRAINT "PK_fd407a256a8cc1eecdd8ebe8f4f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_enitity"`);
    }

}
