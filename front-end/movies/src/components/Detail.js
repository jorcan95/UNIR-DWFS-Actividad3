import React,{ useEffect, useState }  from 'react';
import { useParams } from 'react-router'
import { Link } from 'react-router-dom';
import Loading from './Loading';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'primereact/button';
import { FavoriteService } from '../service/FavoriteService';
import { MovieService } from '../service/MovieService';

export const Detail = () => {
  const [movie, setMovie] = useState(null)
  const {movieId} = useParams();

  const [showAdd, setShowAdd] = useState(false)
  const [showRemove, setShowRemove] = useState(false)
  const [favoriteId, setFavoriteId] = useState(null)

  let favorite = {
    "idMovie":"",
    "id": "",
    "date": "23-06-2023",
    "username": "jcantillo"
  }

  const addFavorite = async () => {
    favorite.idMovie = movieId;
    const _favoriteId = await FavoriteService.addFavorite(favorite);
    console.log(_favoriteId);
    setFavoriteId(_favoriteId);   
    setShowAdd(false);
    setShowRemove(true); 
  };  

  const deleteFavorite = () => {
    FavoriteService.deleteFavorite(favoriteId);
    setShowAdd(true);
    setShowRemove(false);
  };

  useEffect(() => {

    const getMovie = async () => {
      const data = await MovieService.getMovieById(movieId);
      setMovie(data);
    };

    const getFavorite = async () => {
      const data = await FavoriteService.getFavorite();
      var array = data.filter(f => f.idMovie === movieId);
      
      if(array.length > 0){
        setShowAdd(false);
        setShowRemove(true);
        setFavoriteId(array[0].id);
      }else{
        setShowAdd(true);
        setShowRemove(false);
      }
    };

    getMovie();
    getFavorite();

  }, [movieId]);

  return (
    <div>
      {!movie && <Loading />}
      <Link to={`/search`}>
        <i className="pi pi-angle-double-left"></i> Regresar
      </Link>
      <Row> 
        <Col xs={6}>
          <h1>{movie?.title}</h1>
          <p><b>Genero:</b> {`${movie?.genre}`}</p>
          <p><b>Año:</b> {`${movie?.premiereYear}`}</p>
          <p><b>Director:</b> {`${movie?.director}`}</p>
          <p><b>Sinopsis:</b> {movie?.synopsis}</p> 
          <p>
          { showAdd && <Button label="Favorito" icon="pi pi-plus" iconPos="right" onClick={addFavorite}/> }
          { showRemove && <Button label="Remover favorito" severity="danger" icon="pi pi-times" iconPos="right" onClick={deleteFavorite}/> }
          </p>
        </Col> 
        <Col xs={6}>    
          <div className="d-flex justify-content-center align-items-center">
            <Image src={movie?.poster} alt="poster" className="img-detail" thumbnail />
          </div>
        </Col>
      </Row> 
    </div>
  )
}