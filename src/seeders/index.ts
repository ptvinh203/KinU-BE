import { DataSource } from 'typeorm';
import IconSeeder from './icon.seeder';
import ColorSeeder from './color.seeder';
import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config();

async function runSeeders() {
    const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: +(process.env.DB_PORT || 3306),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [join(__dirname, '../models/*.ts')],
    });

    await dataSource.initialize();
    
    const seeders = [
        new IconSeeder(),
        new ColorSeeder(),
    ];

    for (const seeder of seeders) {
        await seeder.run(dataSource);
    }

    await dataSource.destroy();
    console.log('All seeders completed');
}

runSeeders().catch(error => console.error(error));
