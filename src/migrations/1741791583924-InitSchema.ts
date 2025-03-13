import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1741791583924 implements MigrationInterface {
    name = 'InitSchema1741791583924'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" text NOT NULL, "startDate" TIMESTAMP NOT NULL, "dueDate" TIMESTAMP NOT NULL, "taskType" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'To-Do', "priority" character varying NOT NULL, "assignedUserId" integer, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_e3bd734666db0cb70e8c8d542c8" FOREIGN KEY ("assignedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_e3bd734666db0cb70e8c8d542c8"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
