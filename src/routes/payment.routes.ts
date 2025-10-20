import { Router } from "express";
import { createPayment } from "../controller/payment.controller";

const router = Router();
router.post("/", (req, res) => createPayment(req, res));

export default router;