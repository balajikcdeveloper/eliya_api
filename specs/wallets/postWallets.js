const HttpError = {
    Unauthorized: {
        reasonPhrase: 'Not authorized to access this route',
        statusCode: '401',
    },
    BadRequest: {
        reasonPhrase: 'please add a name',
        statusCode: '400',
    },
    Conflict: {
        reasonPhrase: 'Wallet found with name',
        statusCode: '409',
    },
};

const postWallets = {
    tags: ['Eliya-Wallets'],
    description: 'Create users',
    operationId: 'createUsers',
    security: [{ bearerAuth: [] }],
    parameters: [],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            required: true,
                        },
                        amount: {
                            type: 'number',
                            required: true,
                        },
                        description: {
                            type: 'string',
                        },
                    },
                },
            },
        },
        required: true,
    },
    responses: {
        '201': {
            description: 'Created',
        },
        '401': {
            description: 'Unauthorized',
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/Error',
                    },
                    example: {
                        reasonPhrase: HttpError.Unauthorized.reasonPhrase,
                        statusCode: HttpError.Unauthorized.statusCode,
                    },
                },
            },
        },
        '400': {
            description: 'Bad Request',
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/Error',
                    },
                    example: {
                        reasonPhrase: HttpError.BadRequest.reasonPhrase,
                        statusCode: HttpError.BadRequest.statusCode,
                    },
                },
            },
        },
        '409': {
            description: 'Conflict',
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/Error',
                    },
                    example: {
                        reasonPhrase: HttpError.Conflict.reasonPhrase,
                        statusCode: HttpError.Conflict.statusCode,
                    },
                },
            },
        },
    },
};

module.exports = postWallets;
