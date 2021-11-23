import 'module-alias/register'
import './pathAlias'

import initialAwsS3 from '@config/clientS3'
import initialMongoDB from '@config/database'
import dotenv from 'dotenv'
import App from './app'
import initialJobs from './jobs'

dotenv.config()

const { AWS_ACCESS_KEY, AWS_SECRET_KEY } = process.env

const Server = new App()

// initial database
initialMongoDB()

// initial Aws S3
if (AWS_ACCESS_KEY && AWS_SECRET_KEY) {
  void initialAwsS3()
}

// initial jobs
initialJobs()

Server.run()
