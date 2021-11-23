import Express from 'express'

const route = Express.Router()

export default route

require('@controllers/User/controller')
require('@controllers/Role/controller')
