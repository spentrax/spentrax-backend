import { IsEnum, IsNumber, IsString } from 'class-validator';
import { BudgetType } from '@prisma/client';

export class CreateBudgetDto {

  @IsString()
  projectId: string;

  @IsEnum(BudgetType)
  type: BudgetType;

  @IsNumber()
  limit: number;
}