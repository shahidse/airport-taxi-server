import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRole1739481213001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Insert roles into the roles table with brandsId set to 1
    await queryRunner.query(`
            INSERT INTO roles (role, code, secret, createdAt, updatedAt)
            VALUES
                ('User', '0000', 'user', NOW(), NOW(), 1),
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove the inserted roles
    await queryRunner.query(`
            DELETE FROM roles WHERE code IN ('0000');
        `);
  }
}
