import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import * as fs from 'fs';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './globalServices/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // To parse the req bodies in json data and making it accessible under req.body
  app.use(bodyParser.json());

  // Morgan middleware
  morgan.token('body', (req: any) => JSON.stringify(req.body));
  morgan.token('status', (req, res) => res.statusCode.toString());
  const customFormat = ':method :url :status :response-time ms - :body';
  app.use(morgan(customFormat));

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Nest Js Project')
    .setDescription('Apis Collection')
    .setVersion('1.0')
    .addTag('Apis')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Global Exception Filter middleware
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.PORT || 3009);
}
bootstrap().catch((e) => {
  console.log('error starting in application', e);
});
