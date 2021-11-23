/* eslint-disable @typescript-eslint/no-var-requires */
import { BASE_URL_SERVER } from '@config/baseURL'
import dotenv from 'dotenv'
import fs from 'fs'
import _ from 'lodash'
import path from 'path'
import swaggerJSDoc from 'swagger-jsdoc'

dotenv.config()

const APP_NAME = process.env.APP_NAME ?? 'expresso'
const NODE_ENV = process.env.NODE_ENV ?? 'development'

const URL_SERVER_STAGING =
  process.env.URL_SERVER_STAGING ?? 'https://api-staging.example.com'
const URL_SERVER_PRODUCTION =
  process.env.URL_SERVER_PRODUCTION ?? 'https://api.example.com'

const baseRoutes = path.resolve(`${__dirname}/../docs/swagger/routes`)
// const baseSchemas = path.resolve('./docs/swagger/schemas')

const getDocs = (basePath: string | Buffer): {} => {
  return fs.readdirSync(basePath).reduce((acc, file) => {
    const data = require(`${baseRoutes}/${file}`)
    acc = {
      ...acc,
      ...data,
    }
    return acc
  }, {})
}

const docsSources = getDocs(baseRoutes)
// const docsSchemes = getDocs(baseSchemas, getPathSchemes)

let baseURLServer = []
let swaggerOptURL = []

if (NODE_ENV === 'development') {
  baseURLServer = [
    {
      url: `${BASE_URL_SERVER}/v1`,
      description: `${_.capitalize(NODE_ENV)} Server`,
    },
    {
      url: `${URL_SERVER_STAGING}/v1`,
      description: 'Staging Server',
    },
    {
      url: `${URL_SERVER_PRODUCTION}/v1`,
      description: 'Production Server',
    },
  ]

  swaggerOptURL = [
    {
      url: `${BASE_URL_SERVER}/v1/api-docs.json`,
      name: `${_.capitalize(NODE_ENV)} Server`,
    },
    {
      url: `${URL_SERVER_STAGING}/v1/api-docs.json`,
      name: 'Staging Server',
    },
    {
      url: `${URL_SERVER_PRODUCTION}/v1/api-docs.json`,
      name: 'Production Server',
    },
  ]
} else {
  baseURLServer = [
    {
      url: `${BASE_URL_SERVER}/v1`,
      description: `${_.capitalize(NODE_ENV)} Server`,
    },
  ]

  swaggerOptURL = [
    {
      url: `${BASE_URL_SERVER}/v1/api-docs.json`,
      name: `${_.capitalize(NODE_ENV)} Server`,
    },
  ]
}

export const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    servers: baseURLServer,
    // Set GLOBAL
    // security: [
    //   {
    //     auth_token: []
    //   }
    // ],
    components: {
      securitySchemes: {
        auth_token: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description:
            'JWT Authorization header using the JWT scheme. Example: “Authorization: JWT {token}”',
        },
      },
      // schemas: docsSchemes,
      parameters: {
        page: {
          in: 'query',
          name: 'page',
          required: false,
          default: 1,
        },
        pageSize: {
          in: 'query',
          name: 'pageSize',
          required: false,
          default: 10,
        },
        filtered: {
          in: 'query',
          name: 'filtered',
          required: false,
          default: [],
          description: 'Example: [{"id": "email", "value": "anyValue"}]',
        },
        sorted: {
          in: 'query',
          name: 'sorted',
          required: false,
          default: [],
          description: 'Example: [{"id": "createdAt", "desc": true}]',
        },
      },
    },
    info: {
      title: `Api ${APP_NAME} Documentation`,
      version: '1.0.0',
    },
    paths: docsSources,
  },
  apis: [],
}

export const swaggerSpec = swaggerJSDoc(swaggerOptions)
export const optionsSwaggerUI = {
  explorer: true,
  swaggerOptions: { urls: swaggerOptURL },
}
