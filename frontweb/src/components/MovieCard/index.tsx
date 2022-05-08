import { Movie } from "types/movie";

import './styles.css';

type Props = {
  movie: Movie;
}

const MovieCard = ({ movie } : Props) => {
  return (
    <div className="movie-card base-card">
      <img src={movie.imgUrl} alt="Imagem do filme"/>
      <div className="movie-information-container">
        <h3>{movie.title}</h3>
        <h5>{movie.year}</h5>
        <p>{movie.subTitle}</p>
      </div>
    </div>
  )
}

export default MovieCard;