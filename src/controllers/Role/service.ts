import Role, { RoleAttributes, RoleEntity } from '@database/entities/Role'
import { optionsYup } from '@expresso/helpers/Validation'
import { DtoFindAll } from '@expresso/interfaces/Dto'
import {
  FilterQueryAttributes,
  FilterQueryObject,
} from '@expresso/modules/MongoQuery/queryObject'
import ResponseError from '@expresso/modules/Response/ResponseError'
import { Request } from 'express'
import _ from 'lodash'
import roleSchema from './schema'

class RoleService {
  /**
   *
   * @param req
   * @returns
   */
  public static async findAll(req: Request): Promise<DtoFindAll<RoleEntity>> {
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
  public static async findById(id: string): Promise<RoleEntity> {
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
  public static async create(formData: RoleAttributes): Promise<RoleEntity> {
    const value = roleSchema.create.validateSync(formData, optionsYup)
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
    formData: RoleAttributes
  ): Promise<RoleEntity> {
    const data = await this.findById(id)

    const value = roleSchema.create.validateSync(
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
