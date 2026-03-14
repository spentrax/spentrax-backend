import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'

import configuration from './common/config'
import { HealthModule } from './health/health.module'
import { AuthModule } from './modules/auth/auth.module'
import { PrismaModule } from './prisma/prisma.module'
import { ProjectModule } from './modules/project/project.module'
import { BudgetModule } from './modules/budget/budget.module'
import { UsageModule } from './modules/usage/usage.module'
import { AuthGuard } from './common/guards/auth.guard'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('jwtAccessSecret'),
        signOptions: { expiresIn: config.get<string>('jwtAccessDuration') ?? '15m' },
      }),
      inject: [ConfigService],
    }),
    PrismaModule,
    HealthModule,
    AuthModule,
    ProjectModule,
    BudgetModule,
    UsageModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
