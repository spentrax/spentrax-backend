import { IsString, ValidateNested, IsArray, IsNumber } from 'class-validator'
import { Type } from 'class-transformer'

export class TrackEventDto {
  @IsString()
  provider!: string

  @IsString()
  model!: string

  @IsNumber()
  inputTokens!: number

  @IsNumber()
  outputTokens!: number
}

export class TrackUsageDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TrackEventDto)
  events!: TrackEventDto[]
}