import React,{ useEffect, useState }  from 'react';
import { useParams } from 'react-router'
import movieDB from '../../api/movieDB';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';

export const Detail = () => {
  const [movie, setMovie] = useState(null)
  const {movieId } = useParams();

  const getMovie = async () => {
    const { data } = await movieDB.get(`/movies/${movieId}`);

    setMovie(data);
  };

  useEffect(() => {
    getMovie();
  }, [movieId]);

  return (
    <div>
      {!movie && <Loading />}
      <Link to={`/search`}>
        Atras
      </Link>
      <h1>{movie?.title}</h1>
      <p>{movie?.synopsis}</p>
      <img src={movie?.poster} alt="poster" />
      <p>Genero: {`${movie?.genre}`}</p>
    </div>
  )
}