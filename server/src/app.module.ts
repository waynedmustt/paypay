import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssigneesModule } from './modules/assignees/assignees.module';
import { AuthModule } from './modules/auth/auth.module';
import { PerformanceReviewsModule } from './modules/performance-reviews/performance-reviews.module';
import { RolesModule } from './modules/roles/roles.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    UsersModule,
    PerformanceReviewsModule,
    AssigneesModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
