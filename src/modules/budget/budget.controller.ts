import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { CreateBudgetDto } from './dto/budget.dto';
import { CurrentUserId } from '../../common/utils/common.util';

@Controller('targets')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Post()
  create(@CurrentUserId() userId: string, @Body() dto: CreateBudgetDto) {
    return this.budgetService.createTarget(userId, dto);
  }

  @Get()
  getAll(@CurrentUserId() userId: string) {
    return this.budgetService.getTargets(userId);
  }

  @Get(':id')
  getOne(@CurrentUserId() userId: string, @Param('id') id: string) {
    return this.budgetService.getTarget(userId, id);
  }

  @Patch(':id')
  update(@CurrentUserId() userId: string, @Param('id') id: string, @Body('limit') limit: number) {
    return this.budgetService.updateTarget(userId, id, limit);
  }

  @Delete(':id')
  delete(@CurrentUserId() userId: string, @Param('id') id: string) {
    return this.budgetService.deleteTarget(userId, id);
  }
}