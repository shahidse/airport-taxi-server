import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddVehiclesForEachCategory1753908000000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const categories = await queryRunner.query(
      `SELECT id FROM vehicle_categories`,
    );
    for (const category of categories) {
      await queryRunner.query(
        `INSERT INTO vehicles (registrationNumber, model, color, year, status, isVerified, categoryId, driverId)
                 VALUES 
                 (?, ?, ?, ?, ?, ?, ?, ?),
                 (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          // First vehicle for this category
          `REG${category.id}A`,
          'ModelA',
          'Red',
          2022,
          'available',
          true,
          category.id,
          null,
          // Second vehicle for this category
          `REG${category.id}B`,
          'ModelB',
          'Blue',
          2023,
          'available',
          true,
          category.id,
          null,
        ],
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const categories = await queryRunner.query(
      `SELECT id FROM vehicle_categories`,
    );
    const regNumbers = categories.flatMap((category: any) => [
      `REG${category.id}A`,
      `REG${category.id}B`,
    ]);
    if (regNumbers.length > 0) {
      await queryRunner.query(
        `DELETE FROM vehicles WHERE registrationNumber = ANY($1)`,
        [regNumbers],
      );
    }
  }
}
