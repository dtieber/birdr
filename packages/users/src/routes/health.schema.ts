import type { FastifySchema } from 'fastify/types/schema'

export const requestSchema: FastifySchema = {
  querystring: {
    type: 'object',
    required: [
    ],
    properties: {},
  },
}

export const responseSchema: FastifySchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
        },
      },
      required: [
        'status',
      ],
    },
  },
}
