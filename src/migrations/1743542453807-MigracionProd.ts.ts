import { MigrationInterface, QueryRunner } from 'typeorm';

export class MigracionProd1743542453807 implements MigrationInterface {
  name = 'MigracionProd.ts1743542453807';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "files" SET DEFAULT '[]'::jsonb`);
    await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "permissions" SET DEFAULT '[]'::jsonb`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "permissions" SET DEFAULT '[]'`);
    await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "files" SET DEFAULT '[]'`);
  }
}
