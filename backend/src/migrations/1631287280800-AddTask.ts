import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTask1631287280800 implements MigrationInterface {
  name = 'AddTask1631287280800'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "task" ("id" SERIAL NOT NULL, "title" character varying(64), "description" character varying(1024), "status" character varying NOT NULL DEFAULT 'Created', CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "task"`);
  }
}
