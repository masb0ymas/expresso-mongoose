import { Schema, model, Document } from 'mongoose'

export interface RoleEntity {
  name: string
  createdAt?: Date
  updatedAt?: Date
}

export interface RoleInstance extends RoleEntity, Document {}

const RoleSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
)

const Role = model<RoleInstance>('Roles', RoleSchema)

export default Role
