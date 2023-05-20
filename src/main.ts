import {
  ValidationPipe,
  ValidationError,
  BadRequestException,
} from '@nestjs/common';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      // by setting whitelist to true it will remove the properties in request payload which are not included in the
      whitelist: true,
      // Validation from type 1 to type 2
      exceptionFactory: (errors: ValidationError[]) => {
        const customError = errors.map((el: any) => ({
          [el.property]: Object.keys(el.constraints).map(
            (val) => el.constraints[val],
          ),
        }));

        return new BadRequestException(customError, 'Validation error');
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();

// Error type 1
// {
//     "statusCode": 400,
//     "message": [
//         {
//             "target": {
//                 "name": "",
//                 "brand": "mercedes"
//             },
//             "value": "",
//             "property": "name",
//             "children": [],
//             "constraints": {
//                 "isNotEmpty": "name should not be empty"
//             }
//         }
//     ],
//     "error": "Validation error"
// }

// Error type 2
// {
//     "statusCode": 400,
//     "message": [
//         {
//             "name": [
//                 "name should not be empty"
//             ]
//         }
//     ],
//     "error": "Validation error"
// }
