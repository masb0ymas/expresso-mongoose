import userSchema from '@controllers/User/schema'
import bcrypt from 'bcrypt'
import { Schema, model, Document } from 'mongoose'

const saltRounds = 10

interface UserInstance {
  fullName: string
  email: string
  password: string
  phone?: string | null
  isActive?: boolean | null
  isBlocked?: boolean | null
  tokenVerify?: string | null
  picturePath?: string | null
  newPassword?: string
  confirmNewPassword?: string
  Role: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

export interface TokenAttributes {
  data: UserInstance
  message: string
}

export interface UserLoginAttributes {
  uid: string
}

export type UserAttributes = Omit<
  UserInstance,
  '_id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>

export type LoginAttributes = Pick<UserInstance, 'email' | 'password'>

export type EmailAttributes = Pick<UserInstance, 'email' | 'fullName'>

/**
 *
 * @param instance
 * @returns
 */
export function setUserPassword(instance: UserInstance): string {
  const { newPassword, confirmNewPassword } = instance
  const fdPassword = { newPassword, confirmNewPassword }
  const validPassword = userSchema.createPassword.validateSyncAt(
    'confirmNewPassword',
    fdPassword
  )

  // @ts-expect-error
  const password = bcrypt.hashSync(validPassword, saltRounds)
  return password
}

export interface UserEntity extends UserInstance, Document {}

const UserSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, default: null },
    isActive: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    tokenVerify: { type: String, default: null },
    picturePath: { type: String, default: null },
    Role: { type: Schema.Types.ObjectId, required: true, ref: 'Roles' },
  },
  { timestamps: true }
)

UserSchema.methods.comparePassword = async function (
  candidatePassword: string,
  password: string
): Promise<boolean> {
  return await new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, password, function (err, isMatch) {
      if (err) reject(err)
      resolve(isMatch)
    })
  })
}

const User = model<UserInstance>('Users', UserSchema)

export default User
