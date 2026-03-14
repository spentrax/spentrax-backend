import { Controller, Post, Body } from '@nestjs/common';

import { UsageService } from './usage.service';

@Controller('usage')
export class UsageController {
  constructor(private readonly usageService: UsageService) {}

  @Post()
  trackUsage(@Body() body: any) {
    return this.usageService.trackUsage(body);
  }
}