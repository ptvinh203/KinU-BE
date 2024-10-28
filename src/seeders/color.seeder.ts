import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Color } from '@src/models/Color';

export default class ColorSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const colorRepo = dataSource.getRepository(Color);

    const colorData = [
      { name: 'E0E0E0', colorCode: '#E0E0E0', id: 1 },
      { name: 'FFFBF3', colorCode: '#FFFBF3' },
      { name: '90CDF4', colorCode: '#90CDF4' },
      { name: 'F5F5F5', colorCode: '#F5F5F5' },
      { name: '65100B', colorCode: '#65100B' },
      { name: '515669', colorCode: '#515669' },
      { name: 'FA508D', colorCode: '#FA508D' },
      { name: 'E89E08', colorCode: '#E89E08' },
      { name: '102C57', colorCode: '#102C57' },
      { name: '6B7EDF', colorCode: '#6B7EDF' },
      { name: '219653', colorCode: '#219653' },
      { name: '00AC54', colorCode: '#00AC54' },
      { name: '171314', colorCode: '#171314' },
      { name: '1A1F36', colorCode: '#1A1F36' },
      { name: 'C00045', colorCode: '#C00045' },
      { name: '737373', colorCode: '#737373' },
      { name: 'EE3E2C', colorCode: '#EE3E2C' },
      { name: 'A5ACB8', colorCode: '#A5ACB8' },
      { name: '452E02', colorCode: '#452E02' },
      { name: 'FFFFFF', colorCode: '#FFFFFF' },
      { name: 'FD5A33', colorCode: '#FD5A33' },
      { name: 'E11616', colorCode: '#E11616' },
      { name: '7F42FF', colorCode: '#7F42FF' },
      { name: 'EB001B', colorCode: '#EB001B' },
      { name: '00510C', colorCode: '#00510C' },
      { name: 'E89B00', colorCode: '#E89B00' },
      { name: '000000', colorCode: '#000000' },
      { name: '697386', colorCode: '#697386' },
      { name: '000300', colorCode: '#000300' },
      { name: 'E95744', colorCode: '#E95744' },
    ];

    await colorRepo.delete({});

    await colorRepo.save(colorData);
    console.log('Color data seeded successfully');
  }
}
