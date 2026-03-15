import { Controller, Post, Body, Headers } from '@nestjs/common'
import { UsageService } from './usage.service'
import { TrackUsageDto } from './dto/track-usage.dto'

@Controller('usage')
export class UsageController {
  constructor(private readonly usageService: UsageService) {}

  @Post('batch')
  trackUsage(
    @Body() body: TrackUsageDto,
    @Headers('x-api-key') apiKey: string,
  ) {
    return this.usageService.trackUsage(body, apiKey)
  }
}
