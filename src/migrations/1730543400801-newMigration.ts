import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1730543400801 implements MigrationInterface {
    name = 'NewMigration1730543400801'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`expenditure\` CHANGE \`amount\` \`amount\` decimal(15,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`type_sprinding\` CHANGE \`estimatedAmount\` \`estimatedAmount\` decimal(15,2) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`type_sprinding\` CHANGE \`estimatedAmount\` \`estimatedAmount\` decimal(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`expenditure\` CHANGE \`amount\` \`amount\` decimal(10,0) NOT NULL`);
    }

}
