import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class createAssigneesRelation1602317642522
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // USER ID FOREIGN KEY TO ASSIGNEES
    await queryRunner.addColumn(
      'assignees',
      new TableColumn({
        name: 'userId',
        type: 'uuid',
        generationStrategy: 'uuid',
        default: `uuid_generate_v4()`,
      }),
    );
    await queryRunner.createForeignKey(
      'assignees',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    // PERFORMANCE REVIEWS ID FOREIGN KEY TO ASSIGNEES
    await queryRunner.addColumn(
      'assignees',
      new TableColumn({
        name: 'performanceReviewId',
        type: 'uuid',
        generationStrategy: 'uuid',
        default: `uuid_generate_v4()`,
      }),
    );

    await queryRunner.createForeignKey(
      'assignees',
      new TableForeignKey({
        columnNames: ['performanceReviewId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'performance_reviews',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const assignees = await queryRunner.getTable('assignees');
    const userFk = assignees.foreignKeys.find(
      fk => fk.columnNames.indexOf('userId') !== -1,
    );
    await queryRunner.dropForeignKey('assignees', userFk);
    await queryRunner.dropColumn('assignees', 'userId');

    const performanceReviewFk = assignees.foreignKeys.find(
      fk => fk.columnNames.indexOf('performanceReviewId') !== -1,
    );
    await queryRunner.dropForeignKey('assignees', performanceReviewFk);
    await queryRunner.dropColumn('assignees', 'performanceReviewId');
  }
}
