import {MigrationInterface, QueryRunner} from "typeorm";

export class AllowNullReturnDate1642655857940 implements MigrationInterface {
    name = 'AllowNullReturnDate1642655857940'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "birthdate"`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "birthdate" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movies" DROP COLUMN "parentalRating"`);
        await queryRunner.query(`ALTER TABLE "movies" ADD "parentalRating" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rentals" DROP CONSTRAINT "FK_f62e553494249837d406ad4d5d8"`);
        await queryRunner.query(`ALTER TABLE "rentals" DROP CONSTRAINT "FK_c2d7d6dba8d2e356f8017cc8d49"`);
        await queryRunner.query(`ALTER TABLE "rentals" DROP COLUMN "rentDate"`);
        await queryRunner.query(`ALTER TABLE "rentals" ADD "rentDate" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rentals" DROP COLUMN "returnDate"`);
        await queryRunner.query(`ALTER TABLE "rentals" ADD "returnDate" date`);
        await queryRunner.query(`ALTER TABLE "rentals" ALTER COLUMN "movieId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rentals" ALTER COLUMN "customerId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rentals" ADD CONSTRAINT "FK_f62e553494249837d406ad4d5d8" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rentals" ADD CONSTRAINT "FK_c2d7d6dba8d2e356f8017cc8d49" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rentals" DROP CONSTRAINT "FK_c2d7d6dba8d2e356f8017cc8d49"`);
        await queryRunner.query(`ALTER TABLE "rentals" DROP CONSTRAINT "FK_f62e553494249837d406ad4d5d8"`);
        await queryRunner.query(`ALTER TABLE "rentals" ALTER COLUMN "customerId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rentals" ALTER COLUMN "movieId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rentals" DROP COLUMN "returnDate"`);
        await queryRunner.query(`ALTER TABLE "rentals" ADD "returnDate" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rentals" DROP COLUMN "rentDate"`);
        await queryRunner.query(`ALTER TABLE "rentals" ADD "rentDate" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rentals" ADD CONSTRAINT "FK_c2d7d6dba8d2e356f8017cc8d49" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rentals" ADD CONSTRAINT "FK_f62e553494249837d406ad4d5d8" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movies" DROP COLUMN "parentalRating"`);
        await queryRunner.query(`ALTER TABLE "movies" ADD "parentalRating" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "birthdate"`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "birthdate" character varying NOT NULL`);
    }

}
