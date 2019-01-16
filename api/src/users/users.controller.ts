import { Controller, Get, Post, Body, Put, Param, Delete, Query, HttpException, HttpStatus } from '@nestjs/common'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body('username') username) {
    return await this.usersService.create(username)
  }
  @Get()
  async findAll() {
    return await this.usersService.getAllUsers()
  }
  @Get(':username')
  async getUser(@Param('username') username) {
    const user = await this.usersService.getUser(username)
    if (!user) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'User : ' + username + ' doesn\'t exists',
      }, 404)
    }
    return user
  }
}
