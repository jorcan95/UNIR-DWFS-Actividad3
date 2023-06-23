package com.unir.movies.data;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import com.unir.movies.model.pojo.Movie;
import org.apache.commons.lang.StringUtils;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.MultiMatchQueryBuilder.Type;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.aggregations.Aggregation;
import org.elasticsearch.search.aggregations.AggregationBuilders;
import org.elasticsearch.search.aggregations.bucket.terms.ParsedStringTerms;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.data.elasticsearch.core.query.Query;
import org.springframework.stereotype.Repository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j; 

@Repository
@RequiredArgsConstructor
@Slf4j
public class DataAccessRepository {

	// Esta clase (y bean) es la unica que usan directamente los servicios para
	// acceder a los datos.
	private final MovieRepository movieRepository;
	private final ElasticsearchOperations elasticClient;

	private final String[] synopsisSearchFields = { "synopsis", "synopsis._2gram", "synopsis._3gram" };
	private final String[] titleSearchFields = { "title", "title._2gram", "title._3gram" };

	public Movie save(Movie movie) {
		return movieRepository.save(movie);
	}	

	public List<Movie> findMovies(Movie movie, Boolean aggregate) {

		BoolQueryBuilder querySpec = QueryBuilders.boolQuery();

		if (!StringUtils.isEmpty(movie.getTitle())) {
			querySpec.must(QueryBuilders.multiMatchQuery(movie.getTitle(), titleSearchFields).type(Type.BOOL_PREFIX));
		}

		if (!StringUtils.isEmpty(movie.getDirector())) {
			querySpec.must(QueryBuilders.matchQuery("director", movie.getDirector()));
		}
		
		if (!StringUtils.isEmpty(movie.getGenre())) {
			querySpec.must(QueryBuilders.matchQuery("genre", movie.getGenre()));
		}
		
		if (movie.getPremiereYear() != null) {
			querySpec.must(QueryBuilders.termQuery("premiereYear", movie.getPremiereYear()));
		}		
		
		if (!StringUtils.isEmpty(movie.getActors())) {
			querySpec.must(QueryBuilders.matchQuery("actors", movie.getActors()));
		}
		
		if (!StringUtils.isEmpty(movie.getSynopsis())) {
			querySpec.must(QueryBuilders.multiMatchQuery(movie.getSynopsis(), synopsisSearchFields).type(Type.BOOL_PREFIX));
		}
		
		if (movie.getDuration() != null) {
			querySpec.must(QueryBuilders.termQuery("duration", movie.getDuration()));
		}
		
		if (!StringUtils.isEmpty(movie.getLanguage())) {
			querySpec.must(QueryBuilders.termQuery("language", movie.getLanguage()));
		}
		
		if (!StringUtils.isEmpty(movie.getCountry())) {
			querySpec.must(QueryBuilders.termQuery("country", movie.getCountry()));
		}
		
		if (!StringUtils.isEmpty(movie.getProductionCompany())) {
			querySpec.must(QueryBuilders.matchQuery("productionCompany", movie.getProductionCompany()));
		}
		
		if (!StringUtils.isEmpty(movie.getRating())) {
			querySpec.must(QueryBuilders.matchQuery("rating", movie.getRating()));
		}
		
		if (movie.getRatingValue() != null) {
			querySpec.must(QueryBuilders.termQuery("ratingValue", movie.getRatingValue()));
		}
		
		if (!StringUtils.isEmpty(movie.getPoster())) {
			querySpec.must(QueryBuilders.matchQuery("poster", movie.getPoster()));
		}

		//Si no he recibido ningun parametro, busco todos los elementos.
		if (!querySpec.hasClauses()) {
			querySpec.must(QueryBuilders.matchAllQuery());
			log.info("Sin filtros");
		}
		
		//Filtro implicito
		//No le pido al usuario que lo introduzca pero lo aplicamos proactivamente en todas las peticiones
		//En este caso, que los productos sean visibles (estado correcto de la entidad)
		//querySpec.must(QueryBuilders.termQuery("visible", true));

		NativeSearchQueryBuilder nativeSearchQueryBuilder = new NativeSearchQueryBuilder().withQuery(querySpec);
		
		if(aggregate.booleanValue()) {
			nativeSearchQueryBuilder.addAggregation(AggregationBuilders.terms("Country Aggregation").field("country"));
		}
		
		Query query = nativeSearchQueryBuilder.build();
		SearchHits<Movie> result = elasticClient.search(query, Movie.class);
		
		if(result.hasAggregations()) {
			
			Map<String, Aggregation> aggs = result.getAggregations().asMap();
			ParsedStringTerms countryAgg = (ParsedStringTerms) aggs.get("Country Aggregation");
			countryAgg.getBuckets().forEach(bucket -> log.info("Bucket {} tiene {} elementos", bucket.getKey(), bucket.getDocCount()));
		}
		return result.getSearchHits().stream().map(SearchHit::getContent).toList();
	}

	public Optional<Movie> findById(String id) {
		return movieRepository.findById(id);
	}
	
	public Boolean delete(Movie movie) {
		movieRepository.delete(movie);
		return Boolean.TRUE;
	}
}
