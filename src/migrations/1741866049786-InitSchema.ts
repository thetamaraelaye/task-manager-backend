import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1741866049786 implements MigrationInterface {
    name = 'InitSchema1741866049786'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "avatar" character varying`);
        await queryRunner.query(`ALTER TABLE "task" ADD "createdById" integer`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_91d76dd2ae372b9b7dfb6bf3fd2" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_91d76dd2ae372b9b7dfb6bf3fd2"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "createdById"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatar"`);
    }

}
