import { Router } from 'express';
import { createPostRating, getAllPostRatings, deletePostRating } from '../service/postRatingService';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const rating = await createPostRating(req.body);
    res.status(201).json(rating);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
});

router.get('/', async (_req, res) => {
  try {
    const ratings = await getAllPostRatings();
    res.json(ratings);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await deletePostRating(req.params.id);
    res.status(204).send();
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
});

export default router;
