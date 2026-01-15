// modules/auth/auth.routes.ts
import { Router } from "express";

import catchAsync from "../../utils/catchAsync";
import * as AuthController from "./auth.controller";

const router = Router();

router.post("/signup", catchAsync(AuthController.signup));
router.post("/login", catchAsync(AuthController.login));

export default router;
