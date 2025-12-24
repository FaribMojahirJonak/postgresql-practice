import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    @Post()
    async createUser(@Body() data : Partial<User>) : Promise<User> {
        return this.userService.createUser(data);
    }

    @Get()
    async findAll() : Promise<User[]> {
        return this.userService.findAll();
    }

    @Get('search')
    async searchUsers(@Query('name') name? : string, @Query('email') email? : string, @Query('age') age? : number) : Promise<User[]> {
        return this.userService.search({ name, email, age });
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<User> {
        return this.userService.findOne(id);
    }

    @Put(':id')
    async updateUser(@Param('id') id: number, @Body() updatedData : Partial<User>) : Promise<User> {
        return this.userService.update(id, updatedData);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id : number) : Promise< {message : string} > {
        return this.userService.delete(id);
    }
}
