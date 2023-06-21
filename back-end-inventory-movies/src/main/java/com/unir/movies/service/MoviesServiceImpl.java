package com.unir.movies.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.unir.movies.data.DataAccessRepository;
import com.unir.movies.model.pojo.Movie;
import com.unir.movies.model.request.CreateMovieRequest;

@Service
public class MoviesServiceImpl implements MoviesService{
	
	@Autowired
	private DataAccessRepository repository;
	
	@Override
	public Movie createMovie(CreateMovieRequest request) {		
		//if (request != null && StringUtils.hasLength(request.getName().trim())
		//		&& StringUtils.hasLength(request.getDescription().trim())
		//		&& StringUtils.hasLength(request.getCountry().trim()) && request.getVisible() != null) {

		Movie movie = Movie.builder()
				.title(request.getTitle())
				.director(request.getDirector())
				.premiereYear(request.getPremiereYear())
				.genre(request.getGenre())
				.actors(request.getActors())
				.synopsis(request.getSynopsis())
				.duration(request.getDuration())
				.language(request.getLanguage())
				.country(request.getCountry())
				.productionCompany(request.getProductionCompany())
				.rating(request.getRating())
				.ratingValue(request.getRatingValue())
				.poster(request.getPoster())
				.build();

		return repository.save(movie);
		
		//} else {
		//	return null;
		//}
	}

	@Override
	public List<Movie> getMovies(Movie movie, Boolean aggregate) {
		//Ahora por defecto solo devolvera productos visibles
		List<Movie> movies = repository.findProducts(movie, aggregate);
		return movies.isEmpty() ? null : movies;
	}
	

	@Override
	public Movie getMovie(String movieId) {
		return repository.findById(movieId).orElse(null);
	}	
	
	@Override
	public Boolean updateMovie(String movieId, CreateMovieRequest request) {		
		if (request != null) {
			java.util.Optional<Movie> movieOptional = repository.findById(movieId);			
			if (movieOptional.isPresent()) {
				System.out.print("ID encontrado");
	            Movie movie = movieOptional.get();
	            movie.setTitle(request.getTitle());
	    		movie.setDirector(request.getDirector());
	    		movie.setPremiereYear(request.getPremiereYear());
	    		movie.setGenre(request.getGenre());
	    		movie.setActors(request.getActors());		
	    		movie.setSynopsis(request.getSynopsis());
	    		movie.setDuration(request.getDuration());
	    		movie.setLanguage(request.getLanguage());
	    		movie.setCountry(request.getCountry());
	    		movie.setProductionCompany(request.getProductionCompany());
	    		movie.setRating(request.getRating());
	    		movie.setRatingValue(request.getRatingValue());
	    		movie.setPoster(request.getPoster());
	            repository.save(movie);
	        }else {
	        	System.out.print("ID NO encontrado");
	        }
			return Boolean.TRUE;
		} else {
			return Boolean.FALSE;
		}
	}
	
	@Override
	public Boolean updateMoviePartial(String movieId, Map<String, Object> request) {
		if (request != null) {
			java.util.Optional<Movie> movieOptional = repository.findById(movieId);			
			if (movieOptional.isPresent()) {
				Movie movie = movieOptional.get();	            
				request.forEach((campo, valor) -> {
	                switch (campo) {
	                    case "title":
	                    	movie.setTitle((String) valor);
	                        break;
	                    case "director":
	                    	movie.setDirector((String) valor);
	                        break;
	                    case "premiereYear":
	                    	movie.setPremiereYear((Integer) valor);
	                        break;
	                    case "genre":
	                    	movie.setGenre((String) valor);
	                        break;
	                    case "actors":
	                    	movie.setActors((String) valor);
	                        break;
	                    case "synopsis":
	                    	movie.setSynopsis((String) valor);
	                        break;
	                    case "duration":
	                    	movie.setDuration((Integer) valor);
	                        break;
	                    case "language":
	                    	movie.setLanguage((String) valor);
	                        break;
	                    case "country":
	                    	movie.setCountry((String) valor);
	                        break;
	                    case "productionCompany":
	                    	movie.setProductionCompany((String) valor);
	                        break;
	                    case "rating":
	                    	movie.setRating((String) valor);
	                        break;
	                    case "ratingValue":
	                    	movie.setRatingValue((Double) valor);
	                        break;
	                    case "poster":
	                    	movie.setPoster((String) valor);
	                        break;
	                }
	            });				
	            repository.save(movie);
	        }			
			return Boolean.TRUE;
		} else {
			return Boolean.FALSE;
		}
	}
	
	@Override
	public Boolean removeMovie(String movieId) {

		Movie movie = repository.findById(movieId).orElse(null);

		if (movie != null) {
			repository.delete(movie);
			return Boolean.TRUE;
		} else {
			return Boolean.FALSE;
		}
	}
	

}
