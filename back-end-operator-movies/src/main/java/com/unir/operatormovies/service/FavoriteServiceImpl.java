package com.unir.operatormovies.service;

import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.unir.operatormovies.data.FavoriteRepository;
import com.unir.operatormovies.facade.MovieFacade;
import com.unir.operatormovies.model.pojo.Favorite;
import com.unir.operatormovies.model.pojo.Movie;
import com.unir.operatormovies.model.request.FavoriteRequest;

@Service
public class FavoriteServiceImpl implements FavoriteService {
	
	@Autowired
	private MovieFacade movieFacade;
	
	@Autowired
	private FavoriteRepository repository;

	@Override
	public Favorite registerFavorite(FavoriteRequest request) {
		Movie movie = movieFacade.getMovie(request.getIdMovie());
		if (movie != null) {
			if(movie.getId().equals(request.getIdMovie())) {
				Favorite favorite = Favorite.builder()
				.idMovie(request.getIdMovie())
				.date(request.getDate())
				.username(request.getUsername())
				.build();
				return repository.save(favorite);
			}
		}
		return null;		
	}

	@Override
	public List<Favorite> getFavorites(String username) {
		List<Favorite> favorites = null;
		if (!StringUtils.isEmpty(username)) {
			favorites = repository.findByUsername(username);
		}else {
			favorites = repository.findAll();
		}
		return favorites;
	}
	
	@Override
	public Favorite getFavoriteByIdMovieAndUsername(String idMovie, String username) {
		return repository.findByIdMovieAndUsername(idMovie, username);
	}

	@Override
	public Boolean removefavorite(Long favoriteId) {
		Favorite favorite = repository.findById(Long.valueOf(favoriteId)).orElse(null);
		if (favorite != null) {
			repository.delete(favorite);
			return Boolean.TRUE;
		} else {
			return Boolean.FALSE;
		}
	}

		

}
