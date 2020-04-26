const getWallets = require('./wallets/getWallets');
const postWallets = require('./wallets/postWallets');
const walletSchema = require('./wallets/WalletSchema');

module.exports = {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'Eliya',
    description: 'Eliya API - Personal expense manager application',
    termsOfService: 'http://api_url/terms/',
    contact: {
      name: 'Balaji K C',
      email: 'balajikcdeveloper@gmail.com',
      url: 'http://www.kcbalaji.com',
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000/api/v1',
      description: 'Local server',
    },
  ],
  security: [
    {
      ApiKeyAuth: [],
    },
  ],
  tags: [
    {
      name: 'Eliya-Wallets',
    },
  ],
  paths: {
    '/wallets': {
      get: getWallets,
      post: postWallets,
    },
  },
  components: {
    schemas: {
      Wallet: walletSchema,
      User: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
            example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
          },
          name: {
            type: 'string',
          },
          email: {
            type: 'email',
          },
          role: {
            type: 'string',
          },
          isActive: {
            type: 'boolean',
          },
          createdAt: {
            type: 'string',
          },
        },
      },
      Error: {
        type: 'object',
        properties: {
          reasonPhrase: {
            type: 'string',
          },
          statusCode: {
            type: 'number',
          },
        },
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};
