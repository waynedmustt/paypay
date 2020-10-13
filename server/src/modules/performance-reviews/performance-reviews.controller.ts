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
import { Roles } from '../../commons/decorators/roles.decorators';
import { HttpExceptionFilter } from '../../commons/filters/http-exception.filter';
import { RolesGuard } from '../../commons/guards/roles.guard';
import { createPerformanceReviewSchema } from '../../commons/validations/schemas/PerformanceReview';
import { updatePerformanceReviewSchema } from '../../commons/validations/schemas/PerformanceReviewUpdate';
import { ValidationPipe } from '../../commons/validations/validation';
import { PerformanceReviews } from '../../entities/performance-reviews.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PerformanceReviewsService } from './performance-reviews.service';

@Controller('performance-reviews')
@UseFilters(new HttpExceptionFilter())
export class PerformanceReviewsController {
  constructor(
    private readonly performanceReviewsService: PerformanceReviewsService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  @Roles('admin', 'employee')
  findAll(@Query() query) {
    return this.performanceReviewsService.getAll(query);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  @Roles('admin', 'employee')
  findOne(@Param('id') id: string) {
    return this.performanceReviewsService.get(id, null);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @Roles('admin')
  @UsePipes(new ValidationPipe(createPerformanceReviewSchema))
  create(@Body() body: PerformanceReviews) {
    return this.performanceReviewsService.create(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  @Roles('admin')
  @UsePipes(new ValidationPipe(updatePerformanceReviewSchema))
  update(@Param('id') id: string, @Body() body: PerformanceReviews) {
    return this.performanceReviewsService.update(id, body);
  }
}
