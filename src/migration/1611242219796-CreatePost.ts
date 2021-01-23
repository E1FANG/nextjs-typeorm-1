import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreatePost1611242219796 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    //  up 升级数据库
    //   queryRunner 字面意思 查询语句执行器
      return await queryRunner.createTable(new Table({
        name: 'posts', //创建一个叫posts的表
        columns: [{
          //数组第一项为第一列
          name: 'id',
          type: 'int',
          isPrimary: true,  //是否为主键
          isGenerated: true, //是否为自动创建的
          generationStrategy: 'increment'  //创建策略为 自增1
        }, {
          //第二列
          name: 'title',
          type: 'varchar',//可变长的字符串 一般长度为256
        }, {
          name: 'content',
          type: 'text'  //text：文本 可以无限长
        }]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    //  down 降级数据库
      // 升级表后怎么降级，直接drop就好了 删除
      return await queryRunner.dropTable('posts')
    }

}
