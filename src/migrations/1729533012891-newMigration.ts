import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1729533012891 implements MigrationInterface {
    name = 'NewMigration1729533012891'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`FK_fb3e42cb9940154393670fb24a1\` ON \`type_sprinding\``);
        await queryRunner.query(`DROP INDEX \`FK_d386864cc16b3a4d3b52d226fd5\` ON \`type_sprinding\``);
        await queryRunner.query(`DROP INDEX \`FK_83c2524229af7b3cc91464a5ffa\` ON \`type_sprinding\``);
        await queryRunner.query(`DROP INDEX \`FK_1ced25315eb974b73391fb1c81b\` ON \`notification\``);
        await queryRunner.query(`DROP INDEX \`FK_ccf149a6d9d2548071bdd9e13c0\` ON \`e_wallet\``);
        await queryRunner.query(`DROP INDEX \`FK_77eecfdc1c605914b53437aec49\` ON \`expenditure\``);
        await queryRunner.query(`ALTER TABLE \`type_sprinding\` DROP COLUMN \`idIcon\``);
        await queryRunner.query(`ALTER TABLE \`type_sprinding\` DROP COLUMN \`idColor\``);
        await queryRunner.query(`ALTER TABLE \`type_sprinding\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`type_sprinding\` CHANGE \`colorId\` \`colorId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`type_sprinding\` CHANGE \`iconId\` \`iconId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`notification\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`e_wallet\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`expenditure\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`type_sprinding\` ADD CONSTRAINT \`FK_fb3e42cb9940154393670fb24a1\` FOREIGN KEY (\`userId\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`type_sprinding\` ADD CONSTRAINT \`FK_d386864cc16b3a4d3b52d226fd5\` FOREIGN KEY (\`colorId\`) REFERENCES \`color\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`type_sprinding\` ADD CONSTRAINT \`FK_83c2524229af7b3cc91464a5ffa\` FOREIGN KEY (\`iconId\`) REFERENCES \`icon\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_1ced25315eb974b73391fb1c81b\` FOREIGN KEY (\`userId\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`e_wallet\` ADD CONSTRAINT \`FK_ccf149a6d9d2548071bdd9e13c0\` FOREIGN KEY (\`userId\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`expenditure\` ADD CONSTRAINT \`FK_77eecfdc1c605914b53437aec49\` FOREIGN KEY (\`userId\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`expenditure\` DROP FOREIGN KEY \`FK_77eecfdc1c605914b53437aec49\``);
        await queryRunner.query(`ALTER TABLE \`e_wallet\` DROP FOREIGN KEY \`FK_ccf149a6d9d2548071bdd9e13c0\``);
        await queryRunner.query(`ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_1ced25315eb974b73391fb1c81b\``);
        await queryRunner.query(`ALTER TABLE \`type_sprinding\` DROP FOREIGN KEY \`FK_83c2524229af7b3cc91464a5ffa\``);
        await queryRunner.query(`ALTER TABLE \`type_sprinding\` DROP FOREIGN KEY \`FK_d386864cc16b3a4d3b52d226fd5\``);
        await queryRunner.query(`ALTER TABLE \`type_sprinding\` DROP FOREIGN KEY \`FK_fb3e42cb9940154393670fb24a1\``);
        await queryRunner.query(`ALTER TABLE \`expenditure\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`e_wallet\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`notification\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`type_sprinding\` CHANGE \`iconId\` \`iconId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`type_sprinding\` CHANGE \`colorId\` \`colorId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`type_sprinding\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`type_sprinding\` ADD \`idColor\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`type_sprinding\` ADD \`idIcon\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE INDEX \`FK_77eecfdc1c605914b53437aec49\` ON \`expenditure\` (\`userId\`)`);
        await queryRunner.query(`CREATE INDEX \`FK_ccf149a6d9d2548071bdd9e13c0\` ON \`e_wallet\` (\`userId\`)`);
        await queryRunner.query(`CREATE INDEX \`FK_1ced25315eb974b73391fb1c81b\` ON \`notification\` (\`userId\`)`);
        await queryRunner.query(`CREATE INDEX \`FK_83c2524229af7b3cc91464a5ffa\` ON \`type_sprinding\` (\`iconId\`)`);
        await queryRunner.query(`CREATE INDEX \`FK_d386864cc16b3a4d3b52d226fd5\` ON \`type_sprinding\` (\`colorId\`)`);
        await queryRunner.query(`CREATE INDEX \`FK_fb3e42cb9940154393670fb24a1\` ON \`type_sprinding\` (\`userId\`)`);
    }

}
