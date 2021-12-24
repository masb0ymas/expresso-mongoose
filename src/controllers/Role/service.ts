import Role, { RoleEntity, RoleInstance } from '@database/models/Role'
import useValidation from '@expresso/hooks/useValidation'
import { DtoFindAll } from '@expresso/interfaces/Dto'
import {
  FilterQueryAttributes,
  FilterQueryObject,
} from '@expresso/modules/MongoQuery/queryObject'
import ResponseError from '@expresso/modules/Response/ResponseError'
import { Request } from 'express'
import _ from 'lodash'
import roleSchema from './schema'

interface DtoPaginate extends DtoFindAll {
  data: RoleInstance[]
}

class RoleService {
  /**
   *
   * @param req
   * @returns
   */
  public static async findAll(req: Request): Promise<DtoPaginate> {
    let { page, pageSize, filtered }: FilterQueryAttributes = req.getQuery()

    if (!page) page = 0
    if (!pageSize) pageSize = 10

    const skip = Number(page) > 0 ? Number(Number(page) - 1) : 0
    const filterObject = filtered ? FilterQueryObject(JSON.parse(filtered)) : {}

    const data = await Role.find(filterObject)
      .limit(Number(pageSize))
      .skip(Number(pageSize) * skip)
      .sort({ createdAt: 'desc' })

    const total = await Role.countDocuments(filterObject)

    return { message: `${total} data has been received.`, data, total }
  }

  /**
   *
   * @param id
   * @returns
   */
  public static async findById(id: string): Promise<RoleInstance> {
    const data = await Role.findById(id)

    if (!data) {
      throw new ResponseError.NotFound(
        'role data not found or has been deleted'
      )
    }

    return data
  }

  /**
   *
   * @param formData
   * @returns
   */
  public static async create(formData: RoleEntity): Promise<RoleInstance> {
    const value = useValidation(roleSchema.create, formData)
    const data = await Role.create(value)

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
    formData: RoleEntity
  ): Promise<RoleInstance> {
    const data = await this.findById(id)

    const value = useValidation(roleSchema.create, {
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
    await Role.findByIdAndRemove(id)
  }

  /**
   *
   * @param ids
   */
  public static async multipleDelete(ids: string[]): Promise<void> {
    if (_.isEmpty(ids)) {
      throw new ResponseError.BadRequest('ids cannot be empty')
    }

    await Role.deleteMany({ _id: { $in: ids } })
  }
}

export default RoleService
