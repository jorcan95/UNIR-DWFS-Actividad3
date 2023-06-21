package com.unir.operatormovies.model.request;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FavoriteRequest {
	
	@Column(name = "idMovie")
	private String idMovie;
	
	@Column(name = "date")
	private String date;
	
	@Column(name = "username")
	private String username;
	
}
