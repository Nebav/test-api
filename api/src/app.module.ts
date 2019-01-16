import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersController } from './users/users.controller'
import { UsersService } from './users/users.service'
import { CitiesController } from './cities/cities.controller';
import { CitiesService } from './cities/cities.service';

@Module({
  imports: [],
  controllers: [AppController, UsersController, CitiesController],
  providers: [AppService, UsersService, CitiesService],
})
export class AppModule {}
