import { Controller, Get, UseFilters, UseGuards } from '@nestjs/common';
import { HttpExceptionFilter } from '../../commons/filters/http-exception.filter';
import { RolesGuard } from '../../commons/guards/roles.guard';
import { Roles } from '../../commons/decorators/roles.decorators';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesService } from './roles.service';

@Controller('roles')
@UseFilters(new HttpExceptionFilter())
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('')
  @Roles('admin')
  findAll() {
    return this.rolesService.getAll();
  }
}
