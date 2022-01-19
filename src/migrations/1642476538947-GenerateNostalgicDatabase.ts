import {MigrationInterface, QueryRunner} from "typeorm";

export class GenerateNostalgicDatabase1642476538947 implements MigrationInterface {
    name = 'GenerateNostalgicDatabase1642476538947'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customers" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "cpf" character varying NOT NULL, "birthdate" character varying NOT NULL, CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movies" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "parentalRating" integer NOT NULL, "newRelease" boolean NOT NULL, CONSTRAINT "PK_c5b2c134e871bfd1c2fe7cc3705" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rentals" ("id" SERIAL NOT NULL, "rentDate" character varying NOT NULL, "returnDate" integer NOT NULL, "movieId" integer, "customerId" integer, CONSTRAINT "PK_2b10d04c95a8bfe85b506ba52ba" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "rentals" ADD CONSTRAINT "FK_f62e553494249837d406ad4d5d8" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rentals" ADD CONSTRAINT "FK_c2d7d6dba8d2e356f8017cc8d49" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rentals" DROP CONSTRAINT "FK_c2d7d6dba8d2e356f8017cc8d49"`);
        await queryRunner.query(`ALTER TABLE "rentals" DROP CONSTRAINT "FK_f62e553494249837d406ad4d5d8"`);
        await queryRunner.query(`DROP TABLE "rentals"`);
        await queryRunner.query(`DROP TABLE "movies"`);
        await queryRunner.query(`DROP TABLE "customers"`);
    }

}
