import { LOG_SERVER } from '@config/baseURL'
import User, { UserLoginAttributes } from '@entity/User'
import HttpResponse from '@expresso/modules/Response/HttpResponse'
import chalk from 'chalk'
import { NextFunction, Request, Response } from 'express'

function NotPermittedAccess(roles: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userLogin = req.getState('userLogin') as UserLoginAttributes
    const getUser = await User.findById(userLogin.uid)

    // @ts-expect-error
    if (roles.includes(getUser?.Role)) {
      const errType = `Not Permitted Access Error:`
      const message = 'You are not allowed'
      console.log(LOG_SERVER, chalk.red(errType), chalk.green(message))

      const httpResponse = HttpResponse.get({
        code: 403,
        message: `${errType} ${message}`,
      })

      return res.status(403).json(httpResponse)
    }

    next()
  }
}

export default NotPermittedAccess
