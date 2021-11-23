import asyncHandler from '@expresso/helpers/asyncHandler'
import { arrayFormatter } from '@expresso/helpers/Formatter'
import HttpResponse from '@expresso/modules/Response/HttpResponse'
import Authorization from '@middlewares/Authorization'
import route from '@routes/v1'
import { Request, Response } from 'express'
import UserService from './service'

route.get(
  '/user',
  Authorization,
  asyncHandler(async function findAll(req: Request, res: Response) {
    const data = await UserService.findAll(req)

    const httpResponse = HttpResponse.get(data)
    res.status(200).json(httpResponse)
  })
)

route.get(
  '/user/:id',
  Authorization,
  asyncHandler(async function findById(req: Request, res: Response) {
    const { id } = req.getParams()

    const data = await UserService.findById(id)

    const httpResponse = HttpResponse.get({ data })
    res.status(200).json(httpResponse)
  })
)

route.post(
  '/user',
  Authorization,
  asyncHandler(async function createData(req: Request, res: Response) {
    const formData = req.getBody()

    const data = await UserService.create(formData)

    const httpResponse = HttpResponse.created({ data })
    res.status(201).json(httpResponse)
  })
)

route.put(
  '/user/:id',
  Authorization,
  asyncHandler(async function updateData(req: Request, res: Response) {
    const { id } = req.getParams()
    const formData = req.getBody()

    const data = await UserService.update(id, formData)

    const httpResponse = HttpResponse.updated({ data })
    res.status(200).json(httpResponse)
  })
)

route.delete(
  '/user/:id',
  Authorization,
  asyncHandler(async function deleteData(req: Request, res: Response) {
    const { id } = req.getParams()

    await UserService.delete(id)

    const httpResponse = HttpResponse.deleted({})
    res.status(200).json(httpResponse)
  })
)

route.post(
  '/user/multiple/delete',
  asyncHandler(async function multipleDelete(req: Request, res: Response) {
    const formData = req.getBody()
    const arrayIds = arrayFormatter(formData.ids)

    await UserService.multipleDelete(arrayIds)

    const httpResponse = HttpResponse.deleted({})
    res.status(200).json(httpResponse)
  })
)
