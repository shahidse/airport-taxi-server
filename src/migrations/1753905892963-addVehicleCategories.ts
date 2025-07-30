import { MigrationInterface, QueryRunner } from 'typeorm';
const categories = [
  {
    name: 'Standard',
    description: 'Affordable rides for everyday travel',
    maxPassengers: 4,
    maxLuggage: 2,
    baseFare: 10.0,
    perKmRate: 1.5,
    imageUrl: null,
    isActive: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'Executive',
    description: 'Premium rides for business and comfort',
    maxPassengers: 4,
    maxLuggage: 3,
    baseFare: 20.0,
    perKmRate: 2.5,
    imageUrl: null,
    isActive: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: 'Luxury',
    description: 'Top-tier luxury vehicles for special occasions',
    maxPassengers: 4,
    maxLuggage: 3,
    baseFare: 35.0,
    perKmRate: 4.0,
    imageUrl: null,
    isActive: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
];

export class AddVehicleCategories1753905892963 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const category of categories) {
      await queryRunner.query(
        `INSERT INTO vehicle_categories 
                    (name, description, maxPassengers, maxLuggage, baseFare, perKmRate, imageUrl, isActive, createdAt, updatedAt)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          category.name,
          category.description,
          category.maxPassengers,
          category.maxLuggage,
          category.baseFare,
          category.perKmRate,
          category.imageUrl,
          category.isActive,
          category.created_at,
          category.updated_at,
        ],
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM vehicle_categories WHERE name IN (?, ?, ?)`,
      ['Standard', 'Executive', 'Luxury'],
    );
  }
}
