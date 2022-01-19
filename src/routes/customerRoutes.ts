import { Router } from 'express';
import * as customerController from '../controllers/customers';

const router = Router();

router.get('/customers', customerController.getCustomers);
router.post('/customers', customerController.postCustomer);
router.put('/customers/:id', customerController.editCustomer);
router.delete('/customers/:id', customerController.deleteCustomer);

export default router;
