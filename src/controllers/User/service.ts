import User, { UserAttributes, UserEntity } from '@database/entities/User'
import { optionsYup } from '@expresso/helpers/Validation'
import { DtoFindAll } from '@expresso/interfaces/Dto'
import {
  FilterQueryAttributes,
  FilterQueryObject,
} from '@expresso/modules/MongoQuery/queryObject'
import ResponseError from '@expresso/modules/Response/ResponseError'
import { Request } from 'express'
import _ from 'lodash'
import userSchema from './schema'

class UserService {
  /**
   *
   * @param req
   * @returns
   */
  public static async findAll(req: Request): Promise<DtoFindAll<UserEntity>> {
    let { page, pageSize, filtered }: FilterQueryAttributes = req.getQuery()

    if (!page) page = 0
    if (!pageSize) pageSize = 10

    const skip = Number(page) > 0 ? Number(Number(page) - 1) : 0
    const filterObject = filtered ? FilterQueryObject(JSON.parse(filtered)) : {}

    const data = await User.find(filterObject)
      .limit(Number(pageSize))
      .skip(Number(pageSize) * skip)
      .sort({ createdAt: 'desc' })

    const total = await User.countDocuments(filterObject)

    return { message: `${total} data has been received.`, data, total }
  }

  /**
   *
   * @param id
   * @returns
   */
  public static async findById(id: string): Promise<UserEntity> {
    const data = await User.findById(id)

    if (!data) {
      throw new ResponseError.NotFound(
        'user data not found or has been deleted'
      )
    }

    return data
  }

  /**
   *
   * @param formData
   * @returns
   */
  public static async create(formData: UserAttributes): Promise<UserEntity> {
    const value = userSchema.create.validateSync(formData, optionsYup)
    const data = await User.create(value)

    return data
  }

  /**
   *
   * @param id
   * @param formData
   * @returns
   */
  public static async update(
    id: string,
    formData: UserAttributes
  ): Promise<UserEntity> {
    const data = await this.findById(id)

    const value = userSchema.create.validateSync(
      { ...data, ...formData },
      optionsYup
    )

    await data.updateOne(value ?? {})

    const newData = await this.findById(id)

    return newData
  }

  /**
   *
   * @param id
   */
  public static async delete(id: string): Promise<void> {
    await User.findByIdAndRemove(id)
  }

  /**
   *
   * @param ids
   */
  public static async multipleDelete(ids: string[]): Promise<void> {
    if (_.isEmpty(ids)) {
      throw new ResponseError.BadRequest('ids cannot be empty')
    }

    await User.deleteMany({ _id: { $in: ids } })
  }
}

export default UserService
