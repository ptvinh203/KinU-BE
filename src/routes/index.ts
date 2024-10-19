import { Router, Request, Response } from 'express';
import AccountRoutes from "../routes/accountRoutes";

const router = Router()
// router.get('/', (req: Request, res: Response) => {
//   res.render('index', {
//     title: 'Home Page',
//     message: 'Hello, welcome to the home page!'
//   })
// })

router.use("/account", AccountRoutes);

export default router
