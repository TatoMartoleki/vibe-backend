import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe({

    whitelist: true,

    transform: true

  }));
  
  const config = new DocumentBuilder()
    .setTitle('VibeTunes App Backend')
    .setDescription(
      'These are calls for the VibeTunes Backend. Developed By Davit and Tato'

    )
    .setVersion('1.1')
    .addBearerAuth()
    .build();

    const document = SwaggerModule.createDocument(app, config);
    const theme = new SwaggerTheme();
    const options = {
      explorer: true,
      customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK)
    };
    SwaggerModule.setup('api', app, document, options);

  await app.listen(3000);

}
bootstrap()


