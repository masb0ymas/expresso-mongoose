module.exports = {
  '/role': {
    get: {
      tags: ['Role'],
      summary: 'Get All Role',
      produces: ['application/json'],
      security: [
        {
          auth_token: [],
        },
      ],
      parameters: [
        {
          $ref: '#/components/parameters/page',
        },
        {
          $ref: '#/components/parameters/pageSize',
        },
        {
          $ref: '#/components/parameters/filtered',
        },
        {
          $ref: '#/components/parameters/sorted',
        },
      ],
      responses: {
        200: {
          description: 'Get All Role',
        },
      },
    },
    post: {
      tags: ['Role'],
      summary: 'Create New Role',
      security: [
        {
          auth_token: [],
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                },
              },
              required: ['name'],
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Create New Role',
        },
      },
    },
  },
  '/role/multiple/delete': {
    post: {
      tags: ['Role'],
      summary: 'Multiple Force Delete Role ( Forever )',
      security: [
        {
          auth_token: [],
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              type: 'object',
              properties: {
                ids: {
                  type: 'string',
                  description: '["id_1", "id_2"]',
                },
              },
              required: ['ids'],
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Multiple Force Delete Role ( Forever )',
        },
      },
    },
  },
  '/role/{id}': {
    get: {
      tags: ['Role'],
      summary: 'Get Role By Id',
      produces: ['application/json'],
      security: [
        {
          auth_token: [],
        },
      ],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'Role Id',
        },
      ],
      responses: {
        200: {
          description: 'Get Role By Id',
        },
      },
    },
    put: {
      tags: ['Role'],
      summary: 'Update Data Role',
      security: [
        {
          auth_token: [],
        },
      ],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'Role Id',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                },
              },
              required: ['name'],
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Update Data Role',
        },
      },
    },
    delete: {
      tags: ['Role'],
      summary: 'Force Delete Role By Id ( Forever )',
      security: [
        {
          auth_token: [],
        },
      ],
      produces: ['application/json'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'Role Id',
        },
      ],
      responses: {
        200: {
          description: 'Force Delete Role By Id ( Forever )',
        },
      },
    },
  },
}
