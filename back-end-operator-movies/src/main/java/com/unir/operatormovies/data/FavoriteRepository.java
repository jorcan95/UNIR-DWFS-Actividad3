package com.unir.operatormovies.data;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.unir.operatormovies.model.pojo.Favorite;

public interface FavoriteRepository extends JpaRepository<Favorite, Long>{
	
	List<Favorite> findByUsername(String username);

	Favorite findByIdMovieAndUsername(String idMovie, String username);

}
