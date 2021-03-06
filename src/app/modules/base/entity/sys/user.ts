/*
 * @Author: Chenxu
 * @Date: 2021-03-23 10:47:00
 * @LastEditTime: 2021-03-30 15:59:50
 * @Msg: Nothing
 */
import { EntityModel } from '@midwayjs/orm';
import { BaseEntity } from 'midwayjs-cool-core';
import { Column, Index, OneToMany } from 'typeorm';
import { DeviceEntity } from "../../../machine/entity/device";

/**
 * 系统用户
 */
@EntityModel('base_sys_user')
export class BaseSysUserEntity extends BaseEntity {
  @Index()
  @Column({ comment: '部门ID', type: 'bigint', nullable: true })
  departmentId: number;

  @Column({ comment: '上级人员ID', type: 'bigint', nullable: true })
  pid: number;

  @Column({ comment: '姓名', nullable: true })
  name: string;

  @Index({ unique: true })
  @Column({ comment: '用户名', length: 100 })
  username: string;

  @Column({ comment: '密码' })
  password: string;

  @Column({
    comment: '密码版本, 作用是改完密码，让原来的token失效',
    default: 1,
  })
  passwordV: number;

  @Column({ comment: '昵称', nullable: true })
  nickName: string;

  @Column({ comment: '头像', nullable: true })
  headImg: string;

  @Index()
  @Column({ comment: '手机', nullable: true, length: 20 })
  phone: string;

  @Column({ comment: '邮箱', nullable: true })
  email: string;

  @Column({ comment: '备注', nullable: true })
  remark: string;

  @Column({ comment: '状态 0:禁用 1：启用', default: 1, type: 'tinyint' })
  status: number;

  // 对应设备（一对多）
  @OneToMany((type) => DeviceEntity, (device) => device.user)
  device: DeviceEntity[];

  // 部门名称
  departmentName: string;
  // 角色ID列表
  roleIdList: number[];
}
