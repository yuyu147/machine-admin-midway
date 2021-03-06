/*
 * @Author: Chenxu
 * @Date: 2021-03-24 20:02:20
 * @LastEditTime: 2021-03-30 17:20:29
 */
import { Body, Inject, Post, Provide } from '@midwayjs/decorator';
import { Context } from 'egg';
import { CoolController, BaseController } from 'midwayjs-cool-core';
import { BaseSysUserEntity } from '../../../entity/sys/user';
import { BaseSysUserService } from '../../../service/sys/user';

/**
 * 系统用户
 */
@Provide()
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: BaseSysUserEntity,
  service: BaseSysUserService,
  // 查询自己和自己的下级
  listQueryOp: {
    where: async (ctx: Context) => {
      return [
        [`a.pid = ${ctx.admin.userId} or a.id = ${ctx.admin.userId}`]
      ]
    },
  },
  insertParam: (ctx => {
    return {
      pid: ctx.admin.userId
    }
  }),
})
export class BaseSysUserController extends BaseController {
  @Inject()
  baseSysUserService: BaseSysUserService;

  /**
   * 移动部门
   */
  @Post('/move')
  async move(@Body() departmentId: number, @Body() userIds: []) {
    await this.baseSysUserService.move(departmentId, userIds);
    return this.ok();
  }
}
