/* eslint-disable @typescript-eslint/no-var-requires */
import chalk from 'chalk'
import mongoose from 'mongoose'
import { LOG_SERVER } from './baseURL'

require('dotenv').config()

const USERNAME = process.env.MONGODB_USERNAME
const PASSWORD = process.env.MONGODB_PASSWORD
const AUTH_SOURCE = process.env.MONGODB_AUTH
const HOST = process.env.MONGODB_HOST
const PORT = process.env.MONGODB_PORT
const COLLECTION = process.env.MONGODB_DATABASE

const setUri = `mongodb://${HOST}:${PORT}/${COLLECTION}`
const setOptions = {
  user: USERNAME ?? undefined,
  pass: PASSWORD ?? undefined,
  authSource: AUTH_SOURCE,
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
}

const initialMongoDB = (): void => {
  // Connecting to the database
  mongoose
    .connect(setUri, setOptions)
    .then(() => {
      console.log(
        `${LOG_SERVER} Successfully connected to the ${chalk.cyan(
          'MongoDB database'
        )}`
      )
    })
    .catch((err) => {
      console.log(
        `${LOG_SERVER} Could not connect to the MongoDB database:`,
        err
      )
      process.exit()
    })
}

export default initialMongoDB
