import { AccountController } from './../controllers/account.controller';
import express from 'express';

const router = express.Router();

router.route('/').post(AccountController.createUser);

export default router;