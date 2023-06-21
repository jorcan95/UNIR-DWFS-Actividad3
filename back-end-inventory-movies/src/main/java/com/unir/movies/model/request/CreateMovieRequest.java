package com.unir.movies.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class CreateMovieRequest {
	
	private String title;
	private String director;
	private Integer premiereYear;
	private String genre;
	private String actors;
	private String synopsis;
	private Integer duration;
	private String language;
	private String country;
	private String productionCompany;
	private String rating;
	private Double ratingValue;
	private String poster;
	
	

}
