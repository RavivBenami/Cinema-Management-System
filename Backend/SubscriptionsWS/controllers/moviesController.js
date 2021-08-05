var express = require('express')
var appRouter = express.Router()
var moviesBL = require('../models/movies/MoviesBL')

appRouter.route('/').get(async(req,resp)=>{
    var movies = await moviesBL.getAllMovies()
    return resp.json(movies)
})


appRouter.route('/:id').get(async(req,resp)=>{
    var id = req.params.id
    var movie = await moviesBL.getMovieById(id)
    return resp.json(movie)
})

appRouter.route('/').post(async(req,resp)=>{
    var movieObj = req.body;
    var movie = await moviesBL.addMovie(movieObj)
    return resp.json(movie)

})

appRouter.route('/:id').put(async(req, resp)=>{
    var id = req.params.id
    var movieObj = req.body
    var result = await moviesBL.updateMovie(id,movieObj)
    return resp.json(result)

})

appRouter.route('/:id').delete(async(req,resp)=>{
    var id = req.params.id
    var result = await moviesBL.deleteMovie(id)
    return resp.json(result)
})



module.exports = appRouter
