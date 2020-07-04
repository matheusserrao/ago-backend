import { Router } from 'express'
import Daily from './Daily'
import RouteNotFound from '../middlewares/routeNotFound'

const routes = Router()

routes.use(Daily)
routes.use(RouteNotFound)

export default routes