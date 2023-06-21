package com.unir.movies.data;

import java.util.List;
import java.util.Optional;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import com.unir.movies.model.pojo.Movie;

public interface MovieRepository extends ElasticsearchRepository<Movie, String>{
	
	List<Movie> findByTitle(String titlle);
	
	Optional<Movie> findById(String id);
	
	Movie save(Movie product);
	
	void delete(Movie product);
	
	List<Movie> findAll();
	
}
