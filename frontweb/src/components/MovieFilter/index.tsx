import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { Genre } from "types/genre";
import { requestBackEnd } from "utils/requests";

import "./styles.css";

type GenreFilterData = {
  genre: Genre | null;
};

type Props = {
  onSubmitFilter: (data: GenreFilterData) => void;
};

const MovieFilter = ({ onSubmitFilter }: Props) => {

  const [selectGenres, setSelectGenres] = useState<Genre[]>([]);

  const { register, handleSubmit, setValue, getValues, control } =
    useForm<GenreFilterData>();

  useEffect(() => {
    const config: AxiosRequestConfig = {
      url: '/genres',
      withCredentials: true
    }
    requestBackEnd(config)
      .then((response) => {
        setSelectGenres(response.data);
      })
  },[]);

  const handleChangeGenre = (value: Genre) => {
    setValue('genre', value);
    const obj: GenreFilterData = {
      genre: getValues('genre')
    }
    onSubmitFilter(obj);
  }

  return (
    <div className="movie-filter-card base-card">
      <form>
        <Controller
          name="genre"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={selectGenres}
              isClearable
              placeholder="Gênero"
              classNamePrefix="genre-filter-select"
              onChange={(value) => handleChangeGenre(value as Genre)}
              getOptionLabel={(genre: Genre) => genre.name}
              getOptionValue={(genre: Genre) => String(genre.id)}
            />
          )}
        />
      </form>
    </div>
  );
};

export default MovieFilter;
