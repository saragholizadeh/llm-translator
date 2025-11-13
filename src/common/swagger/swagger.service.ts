import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerService {
  static setup(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('LLM Translator API')
      .setDescription('API documentation for the translation service 🌐')
      .setVersion('1.0.0')
      .addTag('Translation')
      .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        'access-token',
      )
      .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }, 'api-key')
      .build();

    const document = SwaggerModule.createDocument(app, config, {});

    SwaggerModule.setup('docs', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
        docExpansion: 'list',
        filter: true,
        showRequestDuration: true,
        displayOperationId: true,
      },
      customSiteTitle: 'LLM Translator API Docs',
      customCss: `
        .swagger-ui .topbar { background-color: #1E88E5; }
        .swagger-ui .topbar a span { color: white; }
        .swagger-ui .info { background-color: #f0f4f8; padding: 10px; border-radius: 8px; }
        .swagger-ui .btn { background-color: #1E88E5; color: white; border-radius: 4px; }
      `,
    });
  }
}
