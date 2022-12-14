import express from 'express';
import { addOrderItems, getMyOrders, getOrderbyId, updateOrderToPaid } from '../controllers/orderController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderbyId);
router.route('/:id/pay').put(protect, updateOrderToPaid);

export default router;
