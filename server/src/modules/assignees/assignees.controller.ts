import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  UseFilters,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { Roles } from '../../commons/decorators/roles.decorators';
import { HttpExceptionFilter } from '../../commons/filters/http-exception.filter';
import { RolesGuard } from '../../commons/guards/roles.guard';
import { createAssigneeSchema } from '../../commons/validations/schemas/Assignee';
import { submitFeedbackAssigneeSchema } from '../../commons/validations/schemas/AssigneeSubmitFeedback';
import { ValidationPipe } from '../../commons/validations/validation';
import { Assignees } from '../../entities/assignees.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AssigneesService } from './assignees.service';

@Controller('assignees')
@UseFilters(new HttpExceptionFilter())
export class AssigneesController {
  constructor(private readonly assigneesService: AssigneesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @Roles('admin')
  @UsePipes(new ValidationPipe(createAssigneeSchema))
  create(@Body() body: Assignees) {
    return this.assigneesService.create(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('feedback/:id')
  @Roles('employee')
  @UsePipes(new ValidationPipe(submitFeedbackAssigneeSchema))
  update(@Param('id') id: string, @Body() body: Assignees) {
    return this.assigneesService.submitFeedback(id, body);
  }
}
