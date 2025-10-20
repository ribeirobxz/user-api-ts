import { Router } from "express";
import { createOrder, deleteOrder, getAllOrders, getOrderById } from "../controller/order.conntroller";

const router = Router();

router.post('/', (req, res) => createOrder(req, res));
router.get('/', (req, res) => getAllOrders(req, res));
router.get('/:id', (req, res) => getOrderById(req, res));
router.delete('/:id', (req, res) => deleteOrder(req, res));

export default router;