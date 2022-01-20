import { Router } from 'express';
import * as rentalController from '../controllers/rentals';

const router = Router();

router.get('/rentals', rentalController.getRentals);
router.post('/rentals', rentalController.postRental);
router.put('/rentals/:id', rentalController.editRental);
router.delete('/rentals/:id', rentalController.deleteRental);

export default router;
