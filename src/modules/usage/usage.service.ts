import { Injectable, UnauthorizedException } from '@nestjs/common';
import { BudgetType } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsageService {
  constructor(private readonly prisma: PrismaService) {}

  async trackUsage(dto: any) {
    const { apiKey, provider, model, inputTokens, outputTokens } = dto;

    // 1️⃣ validate api key
    const apiKeyRecord = await this.prisma.projectApiKey.findUnique({
      where: { key: apiKey },
    });

    if (!apiKeyRecord) {
      throw new UnauthorizedException('Invalid API Key');
    }

    const projectId = apiKeyRecord.projectId;

    // 2️⃣ calculate tokens
    const totalTokens = inputTokens + outputTokens;

    // 3️⃣ calculate cost
    const cost = this.calculateCost(provider, model, totalTokens);

    // 4️⃣ store usage event
    const usage = await this.prisma.usageEvent.create({
      data: {
        projectId,
        provider,
        model,
        inputTokens,
        outputTokens,
        cost,
      },
    });

    // 5️⃣ check budget
    await this.checkBudget(projectId);

    return usage;
  }

  calculateCost(provider: string, model: string, tokens: number) {
    const pricing = {
      openai: {
        'gpt-4': 0.03,
        'gpt-3.5': 0.002,
      },
    };

    const pricePer1k = pricing?.[provider]?.[model];

    if (!pricePer1k) return 0;

    return (tokens / 1000) * pricePer1k;
  }

  async checkBudget(projectId: string) {
    const now = new Date();
  
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
  
    const budgets = await this.prisma.budget.findMany({
      where: {
        projectId,
        month,
        year,
      },
    });
  
    for (const budget of budgets) {
  
      // COST LIMIT CHECK
      if (budget.type === BudgetType.COST) {
        const usage = await this.prisma.usageEvent.aggregate({
          where: { projectId },
          _sum: { cost: true },
        });
  
        if (usage._sum.cost && Number(usage._sum.cost) >= Number(budget.limit)) {
          this.sendNotification(projectId, 'Cost limit reached');
        }
      }
  
      // TOKEN LIMIT CHECK
      if (budget.type === BudgetType.TOKENS) {
        const usage = await this.prisma.usageEvent.aggregate({
          where: { projectId },
          _sum: {
            inputTokens: true,
            outputTokens: true,
          },
        });
  
        const totalTokens =
          (usage._sum.inputTokens || 0) + (usage._sum.outputTokens || 0);
  
        if (totalTokens >= Number(budget.limit)) {
          this.sendNotification(projectId, 'Token limit reached');
        }
      }
    }
  }

  sendNotification(projectId: string, message: string) {
    console.log(`Project ${projectId}: ${message}`);
  }
}