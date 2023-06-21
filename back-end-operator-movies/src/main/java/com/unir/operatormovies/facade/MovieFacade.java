package com.unir.operatormovies.facade;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.unir.operatormovies.model.pojo.Movie;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class MovieFacade {
	
	@Value("${getMovie.url}")
	private String getMovieUrl;
	
	private final RestTemplate restTemplate;
	
	public Movie getMovie(String id) {
	
	  try {
	    return restTemplate.getForObject(String.format(getMovieUrl, id), Movie.class);
	  } catch (HttpClientErrorException e) {
	    log.error("Client Error: {}, Movie with ID {}", e.getStatusCode(), id);
	    return null;
	  }
	}

}
