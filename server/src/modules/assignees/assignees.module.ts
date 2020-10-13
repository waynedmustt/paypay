import { Module } from '@nestjs/common';
import { AssigneesService } from './assignees.service';
import { AssigneesController } from './assignees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssigneesRepository } from './assignees.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AssigneesRepository])],
  providers: [AssigneesService],
  controllers: [AssigneesController],
})
export class AssigneesModule {}
