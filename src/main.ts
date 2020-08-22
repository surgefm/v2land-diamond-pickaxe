import { LogLevel, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
	let app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());
	const configService = app.get(ConfigService);

	// Set log level
	const env = configService.get<string>('NODE_ENV');
	const logLevels: LogLevel[] =
		env === 'production' ? [ 'error', 'warn' ] : [ 'log', 'error', 'warn', 'debug', 'verbose' ];

	app = await NestFactory.create(AppModule, {
		logger: logLevels
	});

	// Allow CORS in development envorinment
	if (env === 'development') app.enableCors();

	// Set listening port
	await app.listen(configService.get<number>('PORT'));
}
bootstrap();
