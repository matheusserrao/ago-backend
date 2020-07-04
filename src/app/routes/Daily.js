import { Router } from 'express'

import DailyController from '../controllers/DailyController'

const routes = Router()

routes.post('/daily', DailyController.create)
routes.get('/daily', DailyController.getAll)
routes.delete('/daily/:id', DailyController.delete)
routes.patch('/daily/:id', DailyController.patch)

export default routes