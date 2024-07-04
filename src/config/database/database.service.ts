import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit, OnModuleDestroy  {
    constructor() {
        super({
          log: ['query', 'info', 'warn', 'error'],
          errorFormat: 'minimal',
        });
      }
    
      async onModuleInit() {
        try {
          await this.$connect();
          console.log('Database connected successfully');
        } catch (error) {
          console.error('Failed to connect to the database', error);
          process.exit(1); // Exit the process if the database connection fails
        }
      }
    
      async onModuleDestroy() {
        await this.$disconnect();
        console.log('Database connection closed gracefully');
      }

}
