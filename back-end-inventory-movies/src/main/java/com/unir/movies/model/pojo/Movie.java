package com.unir.movies.model.pojo;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Document(indexName = "movies", createIndex = true)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Movie {
	
	@Id
	private String id;
	
	@Field(type = FieldType.Search_As_You_Type, name = "title")
	private String title;
	
	@Field(type = FieldType.Text, name = "director")
	private String director;
	
	@Field(type = FieldType.Integer, name = "premiereYear")
	private Integer premiereYear;
	
	@Field(type = FieldType.Keyword, name = "genre")
	private String genre;
	
	@Field(type = FieldType.Text, name = "actors")
	private String actors;
	
	@Field(type = FieldType.Search_As_You_Type, name = "synopsis")
	private String synopsis;
	
	@Field(type = FieldType.Integer, name = "duration")
	private Integer duration;
	
	@Field(type = FieldType.Keyword, name = "language")
	private String language;
	
	@Field(type = FieldType.Keyword, name = "country")
	private String country;
	
	@Field(type = FieldType.Text, name = "productionCompany")
	private String productionCompany;
	
	@Field(type = FieldType.Text, name = "rating")
	private String rating;
	
	@Field(type = FieldType.Double, name = "ratingValue")
	private Double ratingValue;
	
	@Field(type = FieldType.Text, name = "poster")
	private String poster;

}
