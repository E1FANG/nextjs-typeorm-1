import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddCreateAtAndUpdatedAt1617557433542 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumns('users',[
        new TableColumn({name:'createAt',type:'time',isNullable:false,default:'now()'}),
        new TableColumn({name:'updatedAt',type:'time',isNullable:false,default:'now()'})
        ])
      await queryRunner.addColumns('posts',[
        new TableColumn({name:'createAt',type:'time',isNullable:false,default:'now()'}),
        new TableColumn({name:'updatedAt',type:'time',isNullable:false,default:'now()'})
      ])
      await queryRunner.addColumns('comments',[
        new TableColumn({name:'createAt',type:'time',isNullable:false,default:'now()'}),
        new TableColumn({name:'updatedAt',type:'time',isNullable:false,default:'now()'})
      ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      // try {
        await queryRunner.dropColumn('users','createAt')
        await queryRunner.dropColumn('users','updatedAt')
        await queryRunner.dropColumn('posts','createAt')
        await queryRunner.dropColumn('posts','updatedAt')
        await queryRunner.dropColumn('comments','createAt')
        await queryRunner.dropColumn('comments','updatedAt')
      // }catch (error){
      // }
    }
}
