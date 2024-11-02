import { Router } from 'express'
import AccountRoutes from './account.routes'
import AuthRoutes from './auth.routes'
import TypeSprindingRoutes from '../routes/typeSprinding.routes'
import ColorRoutes from './color.routes'
import IconRoutes from './icon.routes'
import ExpenditureRoutes from "./expenditure.routes"

const router = Router()
// router.get('/', (req: Request, res: Response) => {
//   res.render('index', {
//     title: 'Home Page',
//     message: 'Hello, welcome to the home page!'
//   })
// })

router.use('/account', AccountRoutes)
router.use('/auth', AuthRoutes)
router.use('/type-sprinding', TypeSprindingRoutes)
router.use('/color', ColorRoutes)
router.use('/icon', IconRoutes)
router.use('/expenditure', ExpenditureRoutes)

export default router
