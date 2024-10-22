import { Router } from 'express'
import AccountRoutes from '../routes/accountRoutes'
import AuthRoutes from '../routes/authRoutes'
import TypeSprindingRoutes from '../routes/typeSprinding.routes'
import ColorRoutes from './color.routes'
import IconRoutes from './icon.routes'

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

export default router
