import { Router } from 'express';
import * as movieController from '../controllers/movies';

const router = Router();

router.get('/movies', movieController.getMovies);
router.post('/movies', movieController.postMovie);
router.put('/movies/:id', movieController.editMovie);
router.delete('/movies/:id', movieController.deleteMovie);

export default router;
