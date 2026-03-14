import { IsString } from 'class-validator'

export class CreateProjectDto {
  @IsString()
  name: string
}

export class UpdateProjectDto {
  @IsString()
  name: string
}
