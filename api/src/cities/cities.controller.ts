import { Controller, Get, Post, Body, Put, Param, Delete, Query, HttpException, HttpStatus } from '@nestjs/common'
import { CitiesService } from './cities.service'
import bodyParser = require('body-parser');

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) { }

  @Post()
  async create(@Body('name') name, @Body('population') population) {
    return await this.citiesService.create(name, population)
  }
  @Post('add')
  async add(@Body('idUser') idUser, @Body('idCity') idCity, @Body('position') position) {
    return await this.citiesService.addUserCity(idUser, idCity, position)
  }
  @Put('update')
  async update(@Body('id') id, @Body('userCities') userCities) {
    await this.citiesService.deleteUserCities(id)
    return await this.citiesService.addUserCities(id, userCities)
  }
  @Get()
  async findAll() {
    return await this.citiesService.getAllCities()
  }
  @Get('usercities/:id')
  async findAllUserCities(@Param('id') id) {
    return await this.citiesService.getUserCities(id)
  }
  @Get(':name')
  async getUser(@Param('name') name) {
    const user = await this.citiesService.getCity(name)
    if (!user) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'City : ' + name + ' doesn\'t exists',
      }, 404)
    }
    return user
  }
}
