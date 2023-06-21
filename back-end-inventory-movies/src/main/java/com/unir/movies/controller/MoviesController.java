package com.unir.movies.controller;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.unir.movies.model.pojo.Movie;
import com.unir.movies.model.request.CreateMovieRequest;
import com.unir.movies.service.MoviesService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@Slf4j

public class MoviesController {
	
	private final MoviesService service;
	
	@PostMapping("/movies")
	public ResponseEntity<Movie> createtMovie(@RequestBody CreateMovieRequest request) {
		Movie createdMovie = service.createMovie(request);
		if (createdMovie != null) {
			return ResponseEntity.status(HttpStatus.CREATED).body(createdMovie);
		} else {
			return ResponseEntity.badRequest().build();
		}
	}
	
	@GetMapping("/movies")
	public ResponseEntity<List<Movie>> getMovies(
			@RequestHeader Map<String, String> headers,
			@RequestParam(required = false) String  title, 
			@RequestParam(required = false) String  director,
			@RequestParam(required = false) Integer premiereYear, 
			@RequestParam(required = false) String  genre, 
			@RequestParam(required = false) String  actors, 
			@RequestParam(required = false) String  synopsis, 
			@RequestParam(required = false) Integer duration, 
			@RequestParam(required = false) String  language, 
			@RequestParam(required = false) String  country, 
			@RequestParam(required = false) String  productionCompany, 
			@RequestParam(required = false) String  rating, 
			@RequestParam(required = false) Double  ratingValue, 
			@RequestParam(required = false) String  poster) {
		
		Movie movie = new Movie();
		movie.setTitle(title);
		movie.setDirector(director);
		movie.setPremiereYear(premiereYear);
		movie.setGenre(genre);
		movie.setActors(actors);		
		movie.setSynopsis(synopsis);
		movie.setDuration(duration);
		movie.setLanguage(language);
		movie.setCountry(country);
		movie.setProductionCompany(productionCompany);
		movie.setRating(rating);
		movie.setRatingValue(ratingValue);
		movie.setPoster(poster);

		log.info("headers: {}", headers);
		List<Movie> movies = service.getMovies(movie, false);

		if (movies != null) {
			return ResponseEntity.ok(movies);
		} else {
			return ResponseEntity.ok(Collections.emptyList());
		}
	}
	
	@GetMapping("/movies/{movieId}")
	public ResponseEntity<Movie> getMovie(@PathVariable String movieId) {
		log.info("Request received for product {}", movieId);
		Movie movie = service.getMovie(movieId);
		if (movie != null) {
			return ResponseEntity.ok(movie);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@PutMapping("/movies/{movieId}")
    public ResponseEntity<String> updateMovie(@PathVariable String movieId, @RequestBody CreateMovieRequest request) {
		Boolean updateMovie = service.updateMovie(movieId, request);        
		if (Boolean.TRUE.equals(updateMovie)) {
			return ResponseEntity.ok().build();
		} else {
            return ResponseEntity.notFound().build();
        }
    }
	
	@PatchMapping("/movies/{movieId}")
    public ResponseEntity<String> updateMoviePartial(@PathVariable String movieId, @RequestBody Map<String, Object> request) {
		Boolean updateMovie = service.updateMoviePartial(movieId, request);
        
		if (Boolean.TRUE.equals(updateMovie)) {
			return ResponseEntity.ok().build();
		} else {
            return ResponseEntity.notFound().build();
        }
    }
	
	@DeleteMapping("/movies/{movieId}")
	public ResponseEntity<Void> deleteMovie(@PathVariable String movieId) {
		Boolean removed = service.removeMovie(movieId);
		if (Boolean.TRUE.equals(removed)) {
			return ResponseEntity.ok().build();
		} else {
			return ResponseEntity.notFound().build();
		}
	}

}
