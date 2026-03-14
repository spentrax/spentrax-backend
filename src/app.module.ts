import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import configuration from './common/config'
import { HealthModule } from './health/health.module'
import { AuthModule } from './modules/auth/auth.module'
import { PrismaModule } from './prisma/prisma.module'
import { ProjectModule } from './modules/project/project.module'
import { BudgetModule } from './modules/budget/budget.module'
import { UsageModule } from './modules/usage/usage.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),

    PrismaModule,
    HealthModule,
    AuthModule,
    ProjectModule,
    BudgetModule,
    UsageModule,
  ],
})
export class AppModule {}
