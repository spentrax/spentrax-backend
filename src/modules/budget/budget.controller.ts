import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { CreateBudgetDto } from './dto/budget.dto';

@Controller('targets')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}


  @Post()
  create(@Body() dto: CreateBudgetDto) {
    return this.budgetService.createTarget("7e43ae41-5583-44f3-8d63-562501c0cd30", dto);
  }

  @Get()
  getAll() {
    return this.budgetService.getTargets("7e43ae41-5583-44f3-8d63-562501c0cd30");
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.budgetService.getTarget("7e43ae41-5583-44f3-8d63-562501c0cd30", id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body('limit') limit: number) {
    return this.budgetService.updateTarget("7e43ae41-5583-44f3-8d63-562501c0cd30", id, limit);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.budgetService.deleteTarget("7e43ae41-5583-44f3-8d63-562501c0cd30", id);
  }
}