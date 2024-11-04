import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1730635095763 implements MigrationInterface {
    name = 'NewMigration1730635095763'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notification\` ADD \`createdAt\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD \`read\` tinyint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notification\` DROP COLUMN \`read\``);
        await queryRunner.query(`ALTER TABLE \`notification\` DROP COLUMN \`createdAt\``);
    }

}
