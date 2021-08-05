import axios from "axios";
import React, { useEffect, useState } from "react";

function EditMovieComp(props) {
  const [movie, setMovie] = useState({ name: "", premiered: "", image: "", genres: "" });

  let token = window.localStorage.getItem("token");

  useEffect(async () => {
    let movieResp = await axios.get(`http://localhost:8080/subscriptions/movies/${props.match.params.id}`, { headers: { authorization: `Bearer ${token}` } });
    let movieData = movieResp.data;
    let genres = movieData.genres.toString();
    let movie = {
      name: movieData.name,
      premiered: movieData.premiered,
      image: movieData.image,
      genres: genres,
    };
    setMovie(movie);
  }, []);

  const editMovie = async () => {
    let copyGenres = movie.genres;
    let genresLength = movie.genres.length;
    let genresArr = [];
    let counter = 0;
    let x = 0;
    for (let i = 0; i < genresLength; i++) {
      if (movie.genres.charAt(i) == ",") {
        if (x == 0) {
          genresArr[counter] = copyGenres.slice(x, i);
          x = i;
          counter++;
        } else {
          console.log("hello");
          genresArr[counter] = copyGenres.slice(x + 1, i);
          x = i;
          counter++;
        }
      }
      if (i + 1 == genresLength) {
        genresArr[counter] = copyGenres.slice(x + 1, i + 1);
      }
    }
    let updatedMovie = {
      name: movie.name,
      genres: genresArr,
      image: movie.image,
      premiered: movie.premiered,
    };
    await axios.put(`http://localhost:8080/subscriptions/movies/${props.match.params.id}`, updatedMovie, { headers: { authorization: `Bearer ${token}` } });
    props.history.push("/main/movies/allMovies/1");
  };
  const goBack = () => {
    props.history.push("/main/movies/allMovies/0");
  };

  return (
    <div>
      <div className="l-form">
        <div className="form">
          <h1 className="form-title">Edit User</h1>
          Name: <input type="text" value={movie.name} className="form-control" onChange={(e) => setMovie({ ...movie, name: e.target.value })} />
          <br />
          Genres: <input type="text" value={movie.genres} className="form-control" onChange={(e) => setMovie({ ...movie, genres: e.target.value })} />
          <br />
          Image Url: <input type="text" value={movie.image} className="form-control" onChange={(e) => setMovie({ ...movie, image: e.target.value })} />
          <br />
          Premiered: <input type="text" value={movie.premiered.slice(0, 10)} className="form-control" onChange={(e) => setMovie({ ...movie, premiered: e.target.value })} />
          <br />
          <input type="button" value="Save" className="btn btn-class" onClick={editMovie} />
          <input type="button" value="cancel" className="btn btn-class" onClick={goBack} />
        </div>
      </div>
    </div>
  );
}

export default EditMovieComp;
