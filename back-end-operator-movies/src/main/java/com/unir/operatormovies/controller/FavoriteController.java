package com.unir.operatormovies.controller;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.apache.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.unir.operatormovies.model.pojo.Favorite;
import com.unir.operatormovies.model.request.FavoriteRequest;
import com.unir.operatormovies.service.FavoriteService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class FavoriteController {
	
	private final FavoriteService service;

	@PostMapping("/favorites")
	public ResponseEntity<Favorite> registerFavorite(@RequestBody FavoriteRequest request) {
	
      Favorite favoriteExist = service.getFavoriteByIdMovieAndUsername(request.getIdMovie(), request.getUsername());
      if(request != null && favoriteExist != null) {
    	  return ResponseEntity.status(HttpStatus.SC_CONFLICT).body(null);	  
      }else {
    	  Favorite favorite = service.registerFavorite(request);
    	  if(favorite != null) {
    	    return ResponseEntity.status(HttpStatus.SC_CREATED).body(favorite);
    	  } else {
    	    return ResponseEntity.status(HttpStatus.SC_NOT_FOUND).body(favorite);
    	  }
      }		
	}
	
	@GetMapping("/favorites")
	public ResponseEntity<List<Favorite>> getFavorites(@RequestHeader Map<String, String> headers, @RequestParam(required = false) String  username) {
		List<Favorite> movies = service.getFavorites(username);
		if (movies != null) {
			return ResponseEntity.ok(movies);
		} else {
			return ResponseEntity.ok(Collections.emptyList());
		}
	}
	
	@DeleteMapping("/favorites/{favoriteId}")
	public ResponseEntity<Void> removefavorite(@PathVariable Long favoriteId) {
		Boolean removed = service.removefavorite(favoriteId);
		if (Boolean.TRUE.equals(removed)) {
			return ResponseEntity.ok().build();
		} else {
			return ResponseEntity.notFound().build();
		}

	}

}
