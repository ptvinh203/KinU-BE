import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1729438316296 implements MigrationInterface {
    name = 'NewMigration1729438316296'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`account\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`fullname\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`birthday\` datetime NOT NULL, \`gender\` int NOT NULL, UNIQUE INDEX \`IDX_41dfcb70af895ddf9a53094515\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`type_sprinding\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`estimatedAmount\` decimal(10,2) NOT NULL, \`abbreviation\` varchar(255) NOT NULL, \`idIcon\` varchar(255) NOT NULL, \`idColor\` varchar(255) NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`e_wallet\` (\`id\` int NOT NULL AUTO_INCREMENT, \`phone\` varchar(255) NOT NULL, \`pinCode\` varchar(255) NOT NULL, \`balance\` decimal NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`expenditure\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`amount\` decimal NOT NULL, \`dateSpinding\` datetime NOT NULL, \`paymentType\` tinyint NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`notification\` (\`id\` int NOT NULL AUTO_INCREMENT, \`content\` varchar(255) NOT NULL, \`typeNotifiction\` varchar(255) NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`type_sprinding\` ADD CONSTRAINT \`FK_fb3e42cb9940154393670fb24a1\` FOREIGN KEY (\`userId\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`e_wallet\` ADD CONSTRAINT \`FK_ccf149a6d9d2548071bdd9e13c0\` FOREIGN KEY (\`userId\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`expenditure\` ADD CONSTRAINT \`FK_77eecfdc1c605914b53437aec49\` FOREIGN KEY (\`userId\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_1ced25315eb974b73391fb1c81b\` FOREIGN KEY (\`userId\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_1ced25315eb974b73391fb1c81b\``);
        await queryRunner.query(`ALTER TABLE \`expenditure\` DROP FOREIGN KEY \`FK_77eecfdc1c605914b53437aec49\``);
        await queryRunner.query(`ALTER TABLE \`e_wallet\` DROP FOREIGN KEY \`FK_ccf149a6d9d2548071bdd9e13c0\``);
        await queryRunner.query(`ALTER TABLE \`type_sprinding\` DROP FOREIGN KEY \`FK_fb3e42cb9940154393670fb24a1\``);
        await queryRunner.query(`DROP TABLE \`notification\``);
        await queryRunner.query(`DROP TABLE \`expenditure\``);
        await queryRunner.query(`DROP TABLE \`e_wallet\``);
        await queryRunner.query(`DROP TABLE \`type_sprinding\``);
        await queryRunner.query(`DROP INDEX \`IDX_41dfcb70af895ddf9a53094515\` ON \`account\``);
        await queryRunner.query(`DROP TABLE \`account\``);
    }

}
