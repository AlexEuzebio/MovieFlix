import './styles.css';

import ReviewStar from 'assets/images/review-star.png';
import { Review } from 'types/review';

type Props = {
  review: Review;
}

const MoviewReview = ( { review }: Props ) => {
  return (
    <div className="movie-review-container">
      <div className="top-container">
        <img src={ReviewStar} alt="Avaliação"/>
        <h6>{review.user.name}</h6>
      </div>
      <div className="description-container">
        <p>{review.text}</p>
      </div>
    </div>
  );
};

export default MoviewReview;