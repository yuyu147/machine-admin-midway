import { Rule, RuleType } from '@midwayjs/decorator';
/**
 * 登录参数校验
 */
export class LoginDTO {
  // 用户名
  @Rule(RuleType.string().required())
  username: string;

  // 密码
  @Rule(RuleType.string().required())
  password: number;

  // 验证码ID
  @Rule(RuleType.string())
  captchaId: string;

  // 验证码
  @Rule(RuleType.string())
  verifyCode: number;
}
