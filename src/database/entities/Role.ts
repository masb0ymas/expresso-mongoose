import { Schema, model, Document } from 'mongoose'

interface RoleInstance {
  name: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

export type RoleAttributes = Omit<
  RoleInstance,
  '_id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>

export interface RoleEntity extends RoleInstance, Document {}

const RoleSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
)

const Role = model<RoleInstance>('role', RoleSchema)

export default Role
