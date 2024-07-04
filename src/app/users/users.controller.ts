import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  Request,
  ValidationPipe,
  UsePipes,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import { Roles } from 'src/guard/roles.decorator';
import { JwtAuthGuard } from 'src/middleware/auth/jwt-auth.guard';
import { RolesGuard } from 'src/guard/roles.guard';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
// @UseGuards(RolesGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @Roles('ADMIN')
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createUserDto: CreateUserDto, @Request() req: any) {
    try{
    return this.userService.create(createUserDto);
    }catch(e){
      throw e
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query('page') page: string, @Query('limit') limit: string) {
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;
    return this.userService.findAll(pageNumber, limitNumber);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  FindOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: Prisma.UserUpdateInput,
  ) {
    return this.userService.update(parseInt(id), updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/:status/change-status')
  // @HttpCode(204)
  changeStatus(
    @Param('id') id: string,
    @Param('status', ParseBoolPipe) status: boolean,
  ) {
    return this.userService.changeStatus(parseInt(id), status);
  }
}
