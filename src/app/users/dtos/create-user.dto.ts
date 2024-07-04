import { Role } from '@prisma/client';
import {IsEmail, IsNotEmpty, IsString} from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email:string;

    @IsNotEmpty()
    @IsString()
    role:Role;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}