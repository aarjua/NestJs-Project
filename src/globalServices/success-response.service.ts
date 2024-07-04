import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class SuccessResponseService {
  handle(
    status: string,
    httpstatus: any,
    message: string = 'Request successful',
    data?: any,
  ) {
    throw new HttpException(
      {
        status: status,
        message,
        httpstatus,
        data,
      },
      httpstatus,
    );
  }
  // createdRes(data: any, message: string = 'Data successfully created') {
  //   throw new HttpException(
  //     {
  //       status: 'success',
  //       message,
  //       data,
  //     },
  //     HttpStatus.CREATED,
  //   );
  // }
  // updatedRes(data: any, message: string = 'Data successfully created') {
  //   throw new HttpException(
  //     {
  //       status: 'success',
  //       message,
  //       data,
  //     },
  //     HttpStatus.FOUND,
  //   );
  // }
  // deletedRes(data: any, message: string = 'Data successfully created') {
  //   throw new HttpException(
  //     {
  //       status: 'success',
  //       message,
  //       data,
  //     },
  //     HttpStatus.NOT_MODIFIED,
  //   );
  // }
  // notFoundRes(data?: any, message: string = 'Data successfully created') {
  //   throw new HttpException(
  //     {
  //       status: 'Not found',
  //       message,
  //       data,
  //     },
  //     HttpStatus.NOT_FOUND,
  //   );
  // }
}
