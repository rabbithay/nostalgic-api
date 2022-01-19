import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateDateType1642530886036 implements MigrationInterface {
    name = 'UpdateDateType1642530886036'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "birthdate"`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "birthdate" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movies" DROP COLUMN "parentalRating"`);
        await queryRunner.query(`ALTER TABLE "movies" ADD "parentalRating" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rentals" DROP COLUMN "rentDate"`);
        await queryRunner.query(`ALTER TABLE "rentals" ADD "rentDate" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rentals" DROP COLUMN "returnDate"`);
        await queryRunner.query(`ALTER TABLE "rentals" ADD "returnDate" date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rentals" DROP COLUMN "returnDate"`);
        await queryRunner.query(`ALTER TABLE "rentals" ADD "returnDate" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rentals" DROP COLUMN "rentDate"`);
        await queryRunner.query(`ALTER TABLE "rentals" ADD "rentDate" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movies" DROP COLUMN "parentalRating"`);
        await queryRunner.query(`ALTER TABLE "movies" ADD "parentalRating" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "birthdate"`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "birthdate" character varying NOT NULL`);
    }

}
