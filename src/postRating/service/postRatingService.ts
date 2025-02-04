import { AppDataSource } from '../../config/data.source';
import { PostRating } from '../../entities/PostRating.entity';

const postRatingRepository = AppDataSource.getRepository(PostRating);

export const createPostRating = async (ratingData: Partial<PostRating>) => {
  return await postRatingRepository.save(ratingData);
};

export const getAllPostRatings = async () => {
  return await postRatingRepository.find({ relations: ['post', 'user'] });
};

export const deletePostRating = async (id: string) => {
  return await postRatingRepository.delete(id);
};
