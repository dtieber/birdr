import type { FastifySchema } from 'fastify/types/schema'

export const AddUserRequestBody = {
  type: 'object',
  required: [
    'username',
  ],
  properties: {
    username: {
      type: 'string',
      minLength: 3,
    },
  },
} as const

export const requestSchema: FastifySchema = {
  body: AddUserRequestBody,
}

export const responseSchema: FastifySchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        userid: {
          type: 'string',
        },
      },
      required: [
        'userid',
      ],
    },
    409: {
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
