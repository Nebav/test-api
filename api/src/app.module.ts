import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersController } from './users/users.controller'
import { UsersService } from './users/users.service'
import { DogsController } from './dogs/dogs.controller'
import { DogsService } from './dogs/dogs.service'


@Module({
  imports: [],
  controllers: [AppController, UsersController, DogsController],
  providers: [AppService, UsersService, DogsService],
})
export class AppModule {}
