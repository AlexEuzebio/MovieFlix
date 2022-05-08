import { type } from "@testing-library/user-event/dist/type";
import MovieCard from "components/MovieCard";
import MovieFilter from "components/MovieFilter";
import Pagination from "components/Pagination";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Movie } from "types/movie";
import { SpringPage } from "types/vendor/spring";
import "./styles.css";

const Movies = () => {
  const genres = [
    {
      id: 1,
      name: "Comédia",
    },
    {
      id: 2,
      name: "Terror",
    },
    {
      id: 3,
      name: "Drama",
    },
  ];

  const page = { 
    content: [
    {
      id: 6,
      title: "A Voz do Silêncio",
      subTitle: "Koe no Katachi",
      year: 2016,
      imgUrl:
        "https://image.tmdb.org/t/p/w533_and_h300_bestv2/5lAMQMWpXMsirvtLLvW7cJgEPkU.jpg",
      synopsis: "",
      genre: {
        id: 1,
        name: "Teste"
      }
    },
    {
      id: 1,
      title: "Bob Esponja",
      subTitle: "O Incrível Resgate",
      year: 2020,
      imgUrl:
        "https://image.tmdb.org/t/p/w533_and_h300_bestv2/wu1uilmhM4TdluKi2ytfz8gidHf.jpg",
        synopsis: "",
        genre: {
          id: 1,
          name: "Teste"
        }
  
  
    },
    {
      id: 5,
      title: "Código de Conduta",
      subTitle: "",
      year: 2009,
      imgUrl:
        "https://image.tmdb.org/t/p/w533_and_h300_bestv2/mwlLjL3jTDmTdLWe2PyUVqYQTuK.jpg",
        synopsis: "",
        genre: {
          id: 1,
          name: "Teste"
        }
  
  
    },
    {
      id: 7,
      title: "Kingsman",
      subTitle: "Serviço Secreto",
      year: 2014,
      imgUrl:
        "https://image.tmdb.org/t/p/w533_and_h300_bestv2/qzUIOTk0E3F1zjvYjcBRTKUTgf9.jpg",
        synopsis: "",
        genre: {
          id: 1,
          name: "Teste"
        }
  
  
    },

  ],
  totalPages: 3
  };

  const handleSubmitFilter = () => {

  }

  return (
    <div className="movies-container">
      <MovieFilter onSubmitFilter={handleSubmitFilter}/>
      <div className="movies-list-container">
        <div className="row">
          {page.content.map((movie) =>
          <div className="col-sm-6 col-xl-3" key={movie.id}>
            <MovieCard movie={movie} />
          </div>
          )}
        </div>
      </div>
      <Pagination 
      pageCount={page.totalPages}
      range={3}
      />
    </div>
  );
};

export default Movies;
