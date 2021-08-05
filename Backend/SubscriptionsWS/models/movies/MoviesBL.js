let axios = require('axios')
let Movie = require('./MoviesSchema')
const fetch = require('node-fetch')


var getAllMovies = ()=> {

    return new Promise((resolve, reject)=>{
        Movie.find({},(err, data)=>{
            if(err){
                reject(err)
            } 
            else{
                resolve(data)
            }
        })

    })
}

var getMovieById = (movieID)=> {
    return new Promise((resolve, reject)=>{
        Movie.findById(movieID,(err,data)=>{
            if(err){
                reject(err)
            }
            else {
                resolve(data)
            }
        })
    })
}



var addMovie = (newMovie)=> {
    return new Promise((resolve,reject)=> {

        var movie = new Movie({
            name : newMovie.name,
            genres : newMovie.genres,
            image : newMovie.image,
            premiered: newMovie.premiered

        })
        movie.save((err)=>{
            if(err){
                reject(err)
            }
            else {
                resolve(movie)
            }
        })
    })
}


var updateMovie = (movieID, updatedData) => {
    return new Promise((resolve, reject)=>{
        Movie.findByIdAndUpdate(movieID,{
            name : updatedData.name,
            genres : updatedData.genres,
            image : updatedData.image,
            premiered: updatedData.premiered
        },(err)=>{
            if(err){
                reject(err)
            }
            else {
                resolve("movie was updated!")
            }
        })

    })
}

var deleteMovie = (movieID)=> {
    return new Promise((resolve,reject)=>{
        Movie.findByIdAndDelete(movieID,(err)=>{
            if(err){
                reject(err)
            }
            else{
                resolve("Movie deleted!!!")
            }
        })
    })
}

var putMoviesFromApiToDB = async()=>{
       let resp = await fetch('https://api.tvmaze.com/shows')
       let moviesArr = await resp.json()

       moviesArr.forEach(movie=> {

           let newMovie = {
            name : movie.name,
            genres : movie.genres,
            image : movie.image.medium,
            premiered: movie.premiered
           }
           addMovie(newMovie)
       })
}

module.exports = {getAllMovies,getMovieById,addMovie,updateMovie,deleteMovie,putMoviesFromApiToDB}