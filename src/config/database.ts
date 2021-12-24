import { logErrServer, logServer } from '@expresso/helpers/Formatter'
import mongoose from 'mongoose'
import {
  MONGODB_AUTH,
  MONGODB_DATABASE,
  MONGODB_HOST,
  MONGODB_PASSWORD,
  MONGODB_PORT,
  MONGODB_USERNAME,
} from './env'

const setUri = `mongodb://${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}`
const setOptions = {
  user: MONGODB_USERNAME,
  pass: MONGODB_PASSWORD,
  authSource: MONGODB_AUTH,
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
        logServer(
          'mongodb',
          `Successfully connected to the database : ${MONGODB_DATABASE}`
        )
      )
    })
    .catch((err) => {
      console.log(
        logErrServer(
          'mongodb',
          `Could not connect to the MongoDB database : ${MONGODB_DATABASE}`
        ),
        err
      )

      process.exit()
    })
}

export default initialMongoDB
