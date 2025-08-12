import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import passport from 'passport';
import session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: 'key',
      resave: false,
      saveUninitialized: true, // <-- important for PKCE
      cookie: { maxAge: 5 * 60 * 1000 },
    }),
  );

  app.enableCors('*')
  app.use(passport.initialize());
  app.use(passport.session());

    const port = process.env.PORT || 3000; // Use Render's port if provided
  await app.listen(port, '0.0.0.0'); // Bind to all interfaces
}
bootstrap();
