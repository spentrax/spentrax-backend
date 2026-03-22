import { Controller, Get } from '@nestjs/common'

import { UserService } from './user.service'
import { CurrentUserId } from '../../common/utils/common.util'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getMe(@CurrentUserId() userId: string) {
    return this.userService.getMe(userId)
  }
}
