import { Controller, Get, Post, Body, Put, Param, Delete, Query, HttpException, HttpStatus } from '@nestjs/common'
import { DogsService } from './dogs.service'
import bodyParser = require('body-parser');

@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) { }

  @Post('add')
  async add(@Body('idUser') idUser, @Body('idDog') idDog) {
    return await this.dogsService.addUserDog(idUser, idDog)
  }
  @Post('update')
  async update(@Body('id') id, @Body('userDogs') userDogs) {
    await this.dogsService.deleteUserDogs(id)
    return await this.dogsService.addUserDogs(id, userDogs)
  }
  @Get()
  async findAll() {
    return await this.dogsService.getAllDogs()
  }
  @Get('userdogs/:id')
  async findAllUserDogs(@Param('id') id) {
    return await this.dogsService.getUserDogs(id)
  }
  @Get(':name')
  async getUser(@Param('name') name) {
    const user = await this.dogsService.getDog(name)
    if (!user) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Dog : ' + name + ' doesn\'t exists',
      }, 404)
    }
    return user
  }
}
