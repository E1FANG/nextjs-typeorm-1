import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreatePosts1617556039430 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'posts',
        columns: [
          {name: 'id', isGenerated: true, type: 'int', generationStrategy: 'increment', isPrimary: true},
          {name: 'title', type: 'varchar'},
          {name: 'content', type: 'text'},
          {name:'author_id',type:'int'},
          {name: 'tags', type: 'text'}
        ]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('posts')
    }

}
