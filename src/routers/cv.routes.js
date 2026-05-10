import { Router } from "express";
import { getCV } from "../controllers/cv.controller.js";

const router = Router();

router.get("/", getCV);
export default router;