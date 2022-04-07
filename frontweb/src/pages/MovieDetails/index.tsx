import "./styles.css";

import BaseButton from "components/BaseButton";
import MoviewReview from "components/MovieReview";
import { AxiosRequestConfig } from "axios";
import { requestBackEnd } from "utils/requests";
import { useEffect, useState } from "react";
import { hasAnyHoles } from "utils/auth";
import { ReviewList } from "types/reviewlist";
import { Movie } from "types/movie";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

type UrlParams = {
  movieId: string;
};

type FormData = {
  review: string;
};

const MovieDetails = () => {
  const {movieId} = useParams<UrlParams>();
  const [showForm, setShowForm] = useState(false);
  const [movie, setMovie] = useState<Movie>();
  const [reviewList, setReviewList] = useState<ReviewList>();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const [hasError, setHasError] = useState(false);
  const [refreshReviews, setRefreshReviews] = useState(false);

  //habilita o form de avaliação
  useEffect(() => {
    setShowForm(hasAnyHoles(["ROLE_MEMBER"]));
  }, []);

  //requisição do filme selecionado para exibir os dados do filme
  useEffect(() => {
    const config: AxiosRequestConfig = {
      method: "GET",
      withCredentials: true,
      url: `/movies/${movieId}`,
    };
    requestBackEnd(config).then((response) => {
      setMovie(response.data);
    });
  }, [movieId]);

  //requisição da lista de reviews
  useEffect(() => {
    const config: AxiosRequestConfig = {
      method: "GET",
      withCredentials: true,
      url: `/movies/${movieId}/reviews`,
    };
    requestBackEnd(config).then((response) => {
      setReviewList(response.data);
    });
  }, [movieId, refreshReviews]);

  const onSubmit = (formData: FormData) => {
    setHasError(false);
    const config: AxiosRequestConfig = {
      method: "POST",
      withCredentials: true,
      url: "/reviews",
      data: {
        text: formData.review,
        movieId: parseInt(movieId)
      }
    }    

    requestBackEnd(config)
    .then(() => {
      setHasError(false);
      setRefreshReviews(!refreshReviews);
    })
    .catch(() => {
      setHasError(true);
    })

  };

  return (
    <div className="movie-details-container">
      <h2>Tela detalhes do filme id: {movieId}</h2>
      <div className="movie-data-container base-card">
        <h5>{movie?.title}</h5>
        <p>{movie?.subTitle}</p>
      </div>
      {showForm && (
        <div className="review-form-card base-card">
          {hasError && (
            <div className="alert alert-danger">Ocorreu um erro</div>
          )}
          <form className="review-form" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="review" hidden>
              Avaliação
            </label>
            <input
              {...register("review", {
                required: "Campo obrigatório",
              })}
              className="form-control input-review base-input"
              type="text"
              id="review"
              name="review"
              placeholder="Deixe sua avaliação aqui"
            />
            <div className="invalid-feedback d-block">
              {errors.review?.message}
            </div>
            <div className="save-submit">
              <BaseButton text="Salvar avaliação" />
            </div>
          </form>
        </div>
      )}
      <div className="review-details-card base-card">
        {reviewList?.map((review) => (
          <div className="review-list-item" key={review.id}>
            <MoviewReview review={review} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetails;
