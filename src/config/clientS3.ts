import {
  GetBucketAclCommand,
  GetBucketAclCommandOutput,
  S3,
} from '@aws-sdk/client-s3'
import chalk from 'chalk'

const { AWS_ACCESS_KEY, AWS_SECRET_KEY }: any = process.env

export const clientS3 = new S3({
  credentials: {
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
  },
  region: 'ap-southeast-2',
})

export const BUCKET_NAME = process.env.AWS_BUCKET_NAME ?? 'terami'

// create bucket
function createS3Bucket(): void {
  clientS3.createBucket({ Bucket: BUCKET_NAME }, function (err, data) {
    if (err) {
      console.log(`${chalk.red('Aws S3 Err: ')}`, err)
    } else {
      console.log(
        `${chalk.cyan('Success create bucket')} ${chalk.green(BUCKET_NAME)}`,
        data?.Location
      )
    }
  })
}

// initial aws s3
export const initialAwsS3 = async (): Promise<
  GetBucketAclCommandOutput | undefined
> => {
  try {
    const data = await clientS3.send(
      new GetBucketAclCommand({ Bucket: BUCKET_NAME })
    )
    console.log(
      `${chalk.cyan('Success get bucket')} ${chalk.green(BUCKET_NAME)}`,
      data.Grants
    )
    return data
  } catch (err) {
    console.log(err)
    createS3Bucket()
  }
}

export default initialAwsS3
