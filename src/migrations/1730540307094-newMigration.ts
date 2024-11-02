import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1730540307094 implements MigrationInterface {
    name = 'NewMigration1730540307094'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`expenditure\` ADD \`typeSprindingId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`expenditure\` ADD CONSTRAINT \`FK_d40c3c3829e39943f2aea6bb181\` FOREIGN KEY (\`typeSprindingId\`) REFERENCES \`type_sprinding\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`expenditure\` DROP FOREIGN KEY \`FK_d40c3c3829e39943f2aea6bb181\``);
        await queryRunner.query(`ALTER TABLE \`expenditure\` DROP COLUMN \`typeSprindingId\``);
    }

}
