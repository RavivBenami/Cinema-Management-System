import React, { useState, useEffect } from "react";
import MovieComp from "./MovieComp";
import { useSelector } from "react-redux";
import ReactPagination from "react-paginate";

function AllMoviesComp(props) {
  const [find, setFind] = useState("");
  const [movies, setMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  let stateMovies = useSelector((state) => state.movies);

  useEffect(() => {
    setMovies(stateMovies);
  }, [stateMovies]);

  //reload when routing

  useEffect(() => {
    if (props.match.params.reload == 1) {
      props.history.push("/main/movies/allMovies/0");
      window.location.reload();
    }
  }, [props.match.params.reload]);

  const moviesPerPage = 10;
  const pageVisited = pageNumber * moviesPerPage;

  const displayMovies = movies.slice(pageVisited, pageVisited + moviesPerPage);

  let obj = <div>Loading...</div>;

  obj = displayMovies.map((movie, key) => {
    return <MovieComp movie={movie} key={key} />;
  });

  if (movies.length == 0) {
    obj = <div>There is no movie with this name. </div>;
  }

  const findMovie = () => {
    let movies = stateMovies.filter((movie) => {
      if (movie.name.includes(find)) {
        return movie;
      }
    });
    setMovies(movies);
  };

  const pageCount = Math.ceil(movies.length / moviesPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <center>
      <div>
        <br />
        <input type="text" onChange={(e) => setFind(e.target.value)} className="input-class" placeholder="Search" />
        <input type="button" value="Search" onClick={findMovie} style={{ marginLeft: "8px", marginBottom: "5px" }} className="btn btn-dark" />
        {obj}
        <br />
        <ReactPagination
          previousLabel={"<"}
          nextLabel={">"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBtns"}
          previousClassName={"previousBtn"}
          nextClassName={"nextBtn"}
          activeClassName={"paginationActive"}
        />
      </div>
    </center>
  );
}

export default AllMoviesComp;
