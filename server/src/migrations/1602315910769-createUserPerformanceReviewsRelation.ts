import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class createUserPerformanceReviewsRelation1602315910769
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // USER ID FOREIGN KEY TO PERFORMANCE REVIEWS
    await queryRunner.addColumn(
      'performance_reviews',
      new TableColumn({
        name: 'userId',
        type: 'uuid',
        generationStrategy: 'uuid',
        default: `uuid_generate_v4()`,
      }),
    );

    await queryRunner.createForeignKey(
      'performance_reviews',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // DELETE PERFORMANCE REVIEW FOREIGN KEYS
    const performanceReviews = await queryRunner.getTable(
      'performance_reviews',
    );
    const userPerformanceReviewFk = performanceReviews.foreignKeys.find(
      fk => fk.columnNames.indexOf('userId') !== -1,
    );
    await queryRunner.dropForeignKey(
      'performance_reviews',
      userPerformanceReviewFk,
    );
    await queryRunner.dropColumn('performance_reviews', 'userId');
  }
}
