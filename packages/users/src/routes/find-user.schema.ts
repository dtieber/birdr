import type { FastifySchema } from 'fastify/types/schema'

export const findUserRequestParams = {
  type: 'object',
  required: [
    'id',
  ],
  properties: {
    id: {
      type: 'string',
    },
  },
} as const

export const requestSchema: FastifySchema = {
  params: findUserRequestParams,
}

export const responseSchema: FastifySchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        userid: {
          type: 'string',
        },
        username: {
          type: 'string',
        },
      },
      required: [
        'userid',
        'username',
      ],
    },
    404: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
      },
      required: [
        'message',
      ],
    },
    500:  {
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
      },
      required: [
        'message',
      ],
    },
  },
}
