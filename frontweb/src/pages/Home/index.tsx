import "./styles.css";

import BaseButton from "components/BaseButton";
import { ReactComponent as MainImage } from "assets/images/main-image.svg";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { requestBackEndLogin } from "utils/requests";
import { saveAuthData } from "utils/storage";
import { useHistory, useLocation } from "react-router-dom";
import { AuthContext } from "AuthContext";

type FormData = {
  username: string;
  password: string;
};

type LocationState = {
  from: string;
}

const Home = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const [hasError, setHasError] = useState(false);
  const history = useHistory();
  const { setAuthContextData } = useContext(AuthContext);
  const location = useLocation<LocationState>();
  const { from } = location.state || { from: { pathname: "/movies" } }

  const onSubmit = (formdata: FormData) => {
    requestBackEndLogin(formdata)
      .then((response) => {
        setHasError(false);
        saveAuthData(response.data);
        setAuthContextData({
          authenticated: true
        })
        history.replace(from);
      })
      .catch((error) => {
        setHasError(true);
      });
  };

  return (
    <div className="home-container">
      <div className="home-content-container">
        <h2>Avalie Filmes</h2>
        <p>Diga o que você achou do seu filme favorito</p>
        <div className="image-container">
          <MainImage />
        </div>
      </div>

      <div className="login-card base-card">
        <div className="login-title">
          <h1>Login</h1>
        </div>
        {hasError && (
          <div className="error-message alert alert-danger">
            Ocorreu um erro. Tente novamente.
          </div>
        )}
        <div className="form-container">
          <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="username" hidden>
              Email
            </label>
            <input
              {...register("username", {
                required: "Campo obrigatório",
              })}
              id="username"
              name="username"
              type="text"
              className="form-control base-input base-input-username"
              placeholder="Email"
            />
            <div className="invalid-feedback d-block">
              {errors.username?.message}
            </div>
            <input
              {...register("password", {
                required: "Campo obrigatório",
              })}
              id="password"
              name="password"
              type="password"
              className="form-control base-input"
              placeholder="Senha"
            />
            <div className="invalid-feedback d-block">
              {errors.password?.message}
            </div>
            <div className="login-submit">
              <BaseButton text="Fazer login" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
