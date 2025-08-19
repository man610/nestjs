import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1755626554351 implements MigrationInterface {
    name = 'Migration1755626554351'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_enitity" ("id" character varying NOT NULL, "name" character varying NOT NULL, "userName" character varying NOT NULL, "profileImage" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_980c518fbc4b5f2a7a79f113e48" UNIQUE ("userName"), CONSTRAINT "PK_fd407a256a8cc1eecdd8ebe8f4f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."file_enitity_status_enum" AS ENUM('PENDING', 'VERIFIED', 'REJECTED')`);
        await queryRunner.query(`CREATE TABLE "file_enitity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" character varying NOT NULL, "irysId" character varying NOT NULL, "signature" character varying, "timestamp" TIMESTAMP NOT NULL, "status" "public"."file_enitity_status_enum" NOT NULL DEFAULT 'PENDING', CONSTRAINT "UQ_e39fd4b3463164f10b702411d9a" UNIQUE ("irysId"), CONSTRAINT "PK_f2c18a60b9ef559dcde54654ff7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "file_enitity" ADD CONSTRAINT "FK_ca9f262c9686c145e5237557ed7" FOREIGN KEY ("userId") REFERENCES "user_enitity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file_enitity" DROP CONSTRAINT "FK_ca9f262c9686c145e5237557ed7"`);
        await queryRunner.query(`DROP TABLE "file_enitity"`);
        await queryRunner.query(`DROP TYPE "public"."file_enitity_status_enum"`);
        await queryRunner.query(`DROP TABLE "user_enitity"`);
    }

}
