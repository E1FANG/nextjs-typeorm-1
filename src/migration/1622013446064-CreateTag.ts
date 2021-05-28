import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateTag1622013446064 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'tags',
        columns: [
          {name: 'id', isGenerated: true, type: 'int', generationStrategy: 'increment', isPrimary: true},
          {name: 'tagName', type: 'varchar'}
        ]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('tags')
    }
}
