import userSchema from '@controllers/User/schema'
import bcrypt from 'bcrypt'
import { Schema, model, Document } from 'mongoose'

const saltRounds = 10

export interface UserEntity {
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
}

export interface TokenAttributes {
  data: UserEntity
  message: string
}

export interface UserLoginAttributes {
  uid: string
}

export type LoginAttributes = Pick<UserEntity, 'email' | 'password'>

export type EmailAttributes = Pick<UserEntity, 'email' | 'fullName'>

/**
 *
 * @param instance
 * @returns
 */
export function setUserPassword(instance: UserEntity): string {
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

export interface UserInstance extends UserEntity, Document {}

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
