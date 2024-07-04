import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/config/database/database.service';
import { SuccessResponseService } from 'src/globalServices/success-response.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly responseService: SuccessResponseService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    let created = await this.databaseService.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        address: createUserDto.address,
        role: createUserDto.role,
        password: createUserDto.password,
      },
    });
    let resMsg: string;
    created
      ? (resMsg = 'user created successfully')
      : (resMsg = 'Creation error');
    return this.responseService.handle('success', HttpStatus.CREATED, resMsg);
  }

  async findAll(page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;

    const users = await this.databaseService.user.findMany({
      where: { status: true },
      skip: offset,
      take: limit,
      include: {
        products: true, // This includes the related products in the result
      },
    });

    const totalCount = await this.databaseService.user.count();
    if (users.length)
      return {
        data: users,
        totalCount: totalCount,
        //   totalPages: Math.ceil(totalCount / limit),
        //   currentPage: page,
      };
    else
      return this.responseService.handle(
        'error',
        HttpStatus.NOT_FOUND,
        'users not found',
      );
  }

  async findOne(id: number) {
    let findUser = await this.databaseService.user.findUnique({
      where: {
        id,
        status: true,
      },
    });
    if (!findUser)
      return this.responseService.handle(
        'error',
        HttpStatus.NOT_FOUND,
        'user not found',
      );
    else
      return this.responseService.handle(
        'success',
        HttpStatus.FOUND,
        'user found successfully',
        findUser,
      );
  }

  async update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    let findUser = await this.databaseService.user.findUnique({
      where: {
        id,
      },
    });
    if (!findUser)
      return this.responseService.handle(
        'error',
        HttpStatus.NOT_FOUND,
        'user not found',
      );
    let upadteUser = await this.databaseService.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
    console.log(upadteUser, 'upadteUser');
    if (upadteUser)
      return this.responseService.handle(
        'success',
        HttpStatus.FOUND,
        'user updated',
      );
  }

  async remove(id: number) {
    await this.databaseService.user.delete({
      where: {
        id,
      },
    });
    return this.responseService.handle(
      'success',
      HttpStatus.FOUND,
      'user deleted successfully',
    );
  }

  async changeStatus(id: number, status: boolean) {
    await this.databaseService.user.update({
      where: {
        id,
      },
      data: { status: status ? true : false },
    });
    return this.responseService.handle(
      'success',
      HttpStatus.FOUND,
      'status updated',
    );
  }
}
