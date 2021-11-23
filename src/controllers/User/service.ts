import User, { UserEntity, UserInstance } from '@entity/User'
import useValidation from '@expresso/hooks/useValidation'
import { DtoFindAll } from '@expresso/interfaces/Dto'
import {
  FilterQueryAttributes,
  FilterQueryObject,
} from '@expresso/modules/MongoQuery/queryObject'
import ResponseError from '@expresso/modules/Response/ResponseError'
import { Request } from 'express'
import _ from 'lodash'
import userSchema from './schema'

interface DtoPaginate extends DtoFindAll {
  data: UserInstance[]
}

class UserService {
  /**
   *
   * @param req
   * @returns
   */
  public static async findAll(req: Request): Promise<DtoPaginate> {
    let { page, pageSize, filtered }: FilterQueryAttributes = req.getQuery()

    if (!page) page = 0
    if (!pageSize) pageSize = 10

    const skip = page > 0 ? Number(Number(page) - 1) : 0
    const filterObject = filtered ? FilterQueryObject(JSON.parse(filtered)) : {}

    const data = await User.find(filterObject)
      .limit(Number(pageSize))
      .skip(Number(pageSize) * Number(skip))
      .sort({ createdAt: 'asc' })

    const total = await User.countDocuments(filterObject)

    return { message: `${total} data has been received.`, data, total }
  }

  /**
   *
   * @param id
   * @returns
   */
  public static async findById(id: string): Promise<UserInstance> {
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
  public static async create(formData: UserEntity): Promise<UserInstance> {
    const value = useValidation(userSchema.create, formData)
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
    formData: UserEntity
  ): Promise<UserInstance> {
    const data = await this.findById(id)

    const value = useValidation(userSchema.create, {
      ...data.toJSON(),
      ...formData,
    })

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
