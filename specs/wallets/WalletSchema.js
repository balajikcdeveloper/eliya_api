const WalletSchema = {
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
    userId: {
      type: 'string',
    },
    isActive: {
      type: 'boolean',
    },
  },
};

module.exports = WalletSchema;
