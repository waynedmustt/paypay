import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createPerformanceReviewsTable1602315898448
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'performance_reviews',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
            default: `uuid_generate_v4()`,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'year',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'isCompleted',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'createdAt',
            default: 'NOW()',
            type: 'timestamp',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('performance_reviews');
  }
}
