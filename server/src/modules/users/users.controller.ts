import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseFilters,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { RolesGuard } from '../../commons/guards/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { Roles } from '../../commons/decorators/roles.decorators';
import { HashPasswordPipe } from '../../commons/pipes/hash-password.pipe';
import { createUserSchema } from '../../commons/validations/schemas/User';
import { ValidationPipe } from '../../commons/validations/validation';
import { Users } from '../../entities/users.entity';
import { updateUserSchema } from '../../commons/validations/schemas/UserUpdate';
import { updateUserPasswordSchema } from '../../commons/validations/schemas/UserUpdatePassword';
import { HttpExceptionFilter } from '../../commons/filters/http-exception.filter';

@Controller('users')
@UseFilters(new HttpExceptionFilter())
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('admin')
  @Roles('admin')
  findAllAdminUsers(@Query() query) {
    return this.usersService.getAllAdminUsers(query);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  @Roles('admin', 'employee')
  findAllUsers(@Query() query) {
    return this.usersService.getAllUsers(query);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  @Roles('admin', 'employee')
  findOne(@Param('id') id: string) {
    return this.usersService.get(id, null);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @Roles('admin')
  @UsePipes(new HashPasswordPipe(), new ValidationPipe(createUserSchema))
  create(@Body() body: Users) {
    return this.usersService.create(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  @Roles('admin')
  @UsePipes(new ValidationPipe(updateUserSchema))
  update(@Param('id') id: string, @Body() body: Users) {
    return this.usersService.update(id, body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('update/password')
  @UsePipes(
    new HashPasswordPipe(),
    new ValidationPipe(updateUserPasswordSchema),
  )
  updatePassword(@Body() body: Users) {
    return this.usersService.updatePassword(body);
  }
}
