import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1731925982979 implements MigrationInterface {
    name = 'NewMigration1731925982979'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`e_wallet\` CHANGE \`balance\` \`balance\` decimal(15,2) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`e_wallet\` CHANGE \`balance\` \`balance\` decimal(10,0) NOT NULL`);
    }

}
