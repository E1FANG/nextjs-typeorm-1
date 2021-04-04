import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateUsers1617293279525 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'Users',
        columns: [
          {name: 'id', isGenerated: true, type: 'int', generationStrategy: 'increment', isPrimary: true},
          {name: 'username', type: 'varchar'},
          {name: 'password_digest', type: 'varchar'}
        ]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('users')
    }

}
