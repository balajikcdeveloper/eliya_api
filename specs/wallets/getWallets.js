const getWallets = {
  tags: ['Eliya-Wallets'],
  description: 'Get wallets',
  operationId: 'getWallets',
  security: [{ bearerAuth: [] }],
  parameters: [
    {
      name: 'page',
      in: 'query',
      schema: {
        type: 'integer',
        default: 1,
      },
      required: false,
    },
    {
      name: 'limit',
      in: 'query',
      schema: {
        type: 'integer',
      },
      required: false,
    },
  ],
  responses: {
    '200': {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Wallet',
          },
        },
      },
    },
    '404': { description: 'Not Found' },
    '400': {
      description: 'Bad Request',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Error',
          },
          example: {
            reasonPhrase: 'userId is missing',
            statusCode: '400',
          },
        },
      },
    },
    '401': {
      description: 'Unauthorized',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Error',
          },
          example: {
            reasonPhrase: 'Not authorized to access this route',
            statusCode: '401',
          },
        },
      },
    },
  },
};

module.exports = getWallets;
