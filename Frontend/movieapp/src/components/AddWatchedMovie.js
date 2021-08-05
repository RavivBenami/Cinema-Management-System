import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function AddWatchedMovie(props) {
  const [date, setDate] = useState("");
  const [selected, setSelected] = useState("");

  let movies = useSelector(state=>state.movies)

  let token = window.localStorage.getItem("token")

  let selectMovie = movies.map((movie, key) => {
    let counter = 0;
    props.moviesWatched.forEach((item) => {
      if (movie._id == item.id) {
        counter++;
      }
    });
    if (counter == 0) {
      return <option key={key} value={movie._id}>{movie.name}</option>;
    }
  });

  useEffect(()=>{
    let counter = 0;
    let index = 0;
    while(counter == 0){
      if(typeof selectMovie[index] !== 'undefined'){
        counter++
        setSelected(selectMovie[index].props.value)
      }
      else{
        index++;
      }
    }
  },[])
  


  const subscribeMovie = async () => {
    if (props.moviesWatched.length == 0) {
      let subscriber = {
        memberId: props.memberId,
        movies: [
          {
            movieId: selected,
            date: date,
          },
        ],
      };
      await axios.post("http://localhost:8080/subscriptions/subscriptions", subscriber,{headers:{authorization:`Bearer ${token}`}});
      window.location.reload()
    } else {
      if (date.length !== 0) {
        let moviesObj = props.sub[0].movies;

        moviesObj.push({ movieId: selected, date: date });

        let sub = {
          memberId: props.sub[0].memberId,
          movies: moviesObj,
        };
        await axios.put(`http://localhost:8080/subscriptions/subscriptions/${props.sub[0]._id}`, sub,{headers:{authorization:`Bearer ${token}`}});
        window.location.reload()
      } else {
        alert("please fill all the fields");
      }
    }
  };

  return (
    <center>
      <div>
        <select className="input-class" onChange={(e) => setSelected(e.target.value)}>{selectMovie}</select>
        <input type="text" className="input-class" style={{marginBottom:"5px",marginTop:"5px"}} placeholder="Date dd/mm/yy" onChange={(e) => setDate(e.target.value)} />
        <br />
        <input type="button" className="btn btn-dark" value="subscribe" onClick={subscribeMovie} />
      </div>
    </center>
  );
}

export default AddWatchedMovie;
