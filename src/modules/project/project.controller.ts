import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common'

import { ProjectsService } from './projects.service'
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto'

@Controller('project')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() dto: CreateProjectDto) {
    const userId = '7e43ae41-5583-44f3-8d63-562501c0cd30'
    return this.projectsService.create(userId, dto.name)
  }

  @Get()
  findAll() {
    const userId = '7e43ae41-5583-44f3-8d63-562501c0cd30'
    return this.projectsService.findAll(userId)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProjectDto) {
    return this.projectsService.update(id, dto.name)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id)
  }
}
