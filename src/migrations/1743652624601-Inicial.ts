import { MigrationInterface, QueryRunner } from 'typeorm';

export class Inicial1743652624601 implements MigrationInterface {
  name = 'Inicial1743652624601';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "post_rating" (
                "id" SERIAL NOT NULL,
                "stars" integer NOT NULL,
                "like_dislike" boolean NOT NULL,
                "post_id" integer NOT NULL,
                "user_id" uuid NOT NULL,
                CONSTRAINT "UQ_8c82f62e61c114939d5bd0450ae" UNIQUE ("user_id", "post_id"),
                CONSTRAINT "CHK_c4c2573ed0a12102b9300bd8d6" CHECK (
                    stars >= 1
                    AND stars <= 5
                ),
                CONSTRAINT "PK_16cdf0a1ef026be904d03509611" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "comment_rating" (
                "id" SERIAL NOT NULL,
                "stars" integer NOT NULL,
                "like_dislike" boolean NOT NULL,
                "comment_id" integer NOT NULL,
                "user_id" uuid NOT NULL,
                CONSTRAINT "UQ_c4b247dcdbdc3ba266e3e49e54b" UNIQUE ("user_id", "comment_id"),
                CONSTRAINT "CHK_7577ed26b7a2e2f18b94e14bef" CHECK (
                    stars >= 1
                    AND stars <= 5
                ),
                CONSTRAINT "PK_e4c743311e0b0179bbdbd7cc190" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "comment" (
                "id" SERIAL NOT NULL,
                "text" text NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "post_id" integer NOT NULL,
                "user_id" uuid NOT NULL,
                CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "post" (
                "id" SERIAL NOT NULL,
                "title" character varying(200) NOT NULL,
                "content" text NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "files" jsonb NOT NULL DEFAULT '[]'::jsonb,
                "user_id" uuid NOT NULL,
                CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "user" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying(100) NOT NULL,
                "email" character varying(150) NOT NULL,
                "password" character varying(255) NOT NULL,
                "role" "public"."user_role_enum" NOT NULL DEFAULT 'subscribed',
                "permissions" jsonb NOT NULL DEFAULT '[]'::jsonb,
                "verified" boolean NOT NULL DEFAULT false,
                "registered_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "post_rating"
            ADD CONSTRAINT "FK_340e702034899adcc7cc66a594c" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "post_rating"
            ADD CONSTRAINT "FK_266bbe21cafe58d9703912f4a08" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "comment_rating"
            ADD CONSTRAINT "FK_a7da8b7d43ac03bd53e59fd9f26" FOREIGN KEY ("comment_id") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "comment_rating"
            ADD CONSTRAINT "FK_421e2351bb5733cb049da011c81" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "comment"
            ADD CONSTRAINT "FK_8aa21186314ce53c5b61a0e8c93" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "comment"
            ADD CONSTRAINT "FK_bbfe153fa60aa06483ed35ff4a7" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "post"
            ADD CONSTRAINT "FK_52378a74ae3724bcab44036645b" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "post" DROP CONSTRAINT "FK_52378a74ae3724bcab44036645b"
        `);
    await queryRunner.query(`
            ALTER TABLE "comment" DROP CONSTRAINT "FK_bbfe153fa60aa06483ed35ff4a7"
        `);
    await queryRunner.query(`
            ALTER TABLE "comment" DROP CONSTRAINT "FK_8aa21186314ce53c5b61a0e8c93"
        `);
    await queryRunner.query(`
            ALTER TABLE "comment_rating" DROP CONSTRAINT "FK_421e2351bb5733cb049da011c81"
        `);
    await queryRunner.query(`
            ALTER TABLE "comment_rating" DROP CONSTRAINT "FK_a7da8b7d43ac03bd53e59fd9f26"
        `);
    await queryRunner.query(`
            ALTER TABLE "post_rating" DROP CONSTRAINT "FK_266bbe21cafe58d9703912f4a08"
        `);
    await queryRunner.query(`
            ALTER TABLE "post_rating" DROP CONSTRAINT "FK_340e702034899adcc7cc66a594c"
        `);
    await queryRunner.query(`
            DROP TABLE "user"
        `);
    await queryRunner.query(`
            DROP TABLE "post"
        `);
    await queryRunner.query(`
            DROP TABLE "comment"
        `);
    await queryRunner.query(`
            DROP TABLE "comment_rating"
        `);
    await queryRunner.query(`
            DROP TABLE "post_rating"
        `);
  }
}
