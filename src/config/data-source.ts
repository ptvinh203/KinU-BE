import { DataSource } from 'typeorm';
import { Account } from '../models/Account';
import { TypeSprinding } from '@src/models/TypeSprinding';
import { Expenditure } from '@src/models/Expenditure';
import { EWallet } from '@src/models/EWallet';
import { Notification } from '@src/models/Notification';

export const AppDataSource = new DataSource({
  type: 'mysql', // Hoặc 'postgres'
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '582003',
  database: process.env.DB_NAME || 'kinu',
  synchronize: true, // Chỉ bật synchronize khi là development
  logging: process.env.NODE_ENV === 'development',    // Bật logging trong môi trường dev
  entities: [Account, TypeSprinding, Expenditure, EWallet, Notification],
});