package com.unir.movies.service;

import java.util.List;
import java.util.Map;

import com.unir.movies.model.pojo.Movie;
import com.unir.movies.model.request.CreateMovieRequest;

public interface MoviesService {
	
	Movie createMovie(CreateMovieRequest request);
	
    List<Movie> getMovies(Movie movie, Boolean aggregate);
	
	Movie getMovie(String productId);
	
	Boolean updateMovie(String movieId, CreateMovieRequest request);
	
	Boolean updateMoviePartial(String movieId, Map<String, Object> request);
	
	Boolean removeMovie(String productId);
}
