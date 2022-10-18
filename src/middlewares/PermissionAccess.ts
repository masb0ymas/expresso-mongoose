import User, { UserLoginAttributes } from '@database/entities/User'
import { logErrServer } from '@expresso/helpers/Formatter'
import HttpResponse from '@expresso/modules/Response/HttpResponse'
import { NextFunction, Request, Response } from 'express'

function PermissionAccess(roles: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userLogin = req.getState('userLogin') as UserLoginAttributes
    const getUser = await User.findById(userLogin.uid)

    const errType = `Permission Access Error:`
    const message = 'You are not allowed'

    if (getUser && !roles.includes(getUser.Role)) {
      // log error
      console.log(logErrServer(errType, message))

      const httpResponse = HttpResponse.get({
        code: 403,
        message: `${errType} ${message}`,
      })

      return res.status(403).json(httpResponse)
    }

    next()
  }
}

export default PermissionAccess
