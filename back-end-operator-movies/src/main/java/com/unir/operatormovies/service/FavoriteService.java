package com.unir.operatormovies.service;

import java.util.List;

import com.unir.operatormovies.model.pojo.Favorite;
import com.unir.operatormovies.model.request.FavoriteRequest;

public interface FavoriteService {

	Favorite registerFavorite(FavoriteRequest request);
	
	List<Favorite> getFavorites(String username);
	
	Boolean removefavorite(Long favoriteId);
	
}
