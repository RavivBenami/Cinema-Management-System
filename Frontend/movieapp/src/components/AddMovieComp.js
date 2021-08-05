import React, { useEffect, useState } from "react";
import axios from "axios";

function AddMovieComp(props) {
  const [name, setName] = useState("");
  const [genres, setGenres] = useState("");
  const [img, setImg] = useState("");
  const [premiered, setPremiered] = useState("");

  const addMovie = async () => {
    if (name.length == 0 || genres.length == 0 || img.length == 0 || premiered.length == 0) {
      alert("please fill all the fields");
    } else {
      let genresArr = genres.split(",");

      let newMovie = {
        name: name,
        genres: genresArr,
        image: img,
        premiered: premiered,
      };
      let token = window.localStorage.getItem("token");
      await axios.post(`http://localhost:8080/subscriptions/movies`, newMovie, { headers: { authorization: `Bearer ${token}` } });
      props.history.push("/main/movies/allMovies/1");
    }
  };
  const goBack = () => {
    props.history.push("/main/movies/allMovies/0");
  };

  return (
    <div>
      <div className="l-form">
        <div className="form">
          <h1 className="form-title">Add new movie</h1>
          Name: <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} />
          <br />
          Genres: <input type="text" className="form-control" onChange={(e) => setGenres(e.target.value)} />
          <br />
          Image Url: <input type="text" className="form-control" onChange={(e) => setImg(e.target.value)} />
          <br />
          Premiered: <input type="date" className="form-control" onChange={(e) => setPremiered(e.target.value)} />
          <br />
          <input type="button" value="Save" className="btn btn-class" onClick={addMovie} />
          <input type="button" value="cancel" className="btn btn-class" onClick={goBack} />
        </div>
      </div>
    </div>
  );
}

export default AddMovieComp;
