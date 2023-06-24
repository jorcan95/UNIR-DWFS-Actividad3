import React,{ useState, useEffect} from 'react'
import { InputText } from 'primereact/inputtext';
//import { useMovie } from '../hooks/useMovie';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { Card } from 'primereact/card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { Dropdown } from 'primereact/dropdown';
import { MovieService } from '../service/MovieService';

const CustomCard = ({id, url, title, genre, premiereYear}) => { 

  return ( 
    <Col xs={4}>
      <Card title={title}>
          <p className="m-0">
             <b>Genero:</b> {genre}             
          </p>
          <p className="m-0">
             <b>Año:</b> {premiereYear}             
          </p>
          <Link to={`/detail/${id}`}>
            <Image src={url} alt="poster" thumbnail />
          </Link>
      </Card>
    </Col> 
  )
}

const Search = ({handler}) => {
/*
  let filter = {
    "title": "",
    "director": "",
    "premiereYear": 0,
    "genre": "",
    "actors": "",
    "synopsis": "",
    "duration": 0,
    "language": "",
    "country": "",
    "productionCompany": "",
    "rating": "",
    "ratingValue": 0,
    "poster": ""
}*/
  
  const [movie, setMovie] = useState('')
  const [filter, setFilter] = useState({})
  //const {movies, isLoading} = useMovie(movie);

  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const params =
    movie.length > 0
      ? {
          params: {
            title: movie
          },
        }
      : "";
    const getMovies = async () => {
      cleamFilter();
      const data = await MovieService.getMovieQueryParam(params);
      setMovies(data);  
      setIsLoading(false);
    };
    getMovies();
  }, [movie]);

  const [selectedOptionGenre, setSelectedOptionGenre] = useState(null);
  const [selectedOptionPremiereYear, setSelectedOptionPremiereYear] = useState(null);
  const [selectedOptionRatingValue, setSelectedOptionRatingValue] = useState(null); 
  const [selectedOptionDirector, setSelectedOptionDirector] = useState(null);  

  const cleamFilter = () => {
    setSelectedOptionGenre(null);
    setSelectedOptionPremiereYear(null);
    setSelectedOptionRatingValue(null);
    setSelectedOptionDirector(null);
  };

  const optionsGenre = [
    { label: 'Ciencia ficción', value: 'Ciencia ficción' },
    { label: 'Misterio', value: 'Misterio' },
    { label: 'Aventura', value: 'Aventura' },
    { label: 'Terror', value: 'Terror' },
    { label: 'Bélica', value: 'Bélica' },
    { label: 'Suspense', value: 'Suspense' },
    { label: 'Acción', value: 'Acción' },
    { label: 'Animación', value: 'Animación' },
  ];

  const optionsPremiereYear = [
    { label: '2023', value: '2023' },
    { label: '2022', value: '2022' },
  ];

  const optionsRatingValue = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
  ];

  const optionsDirector = [
    { label: 'Director1', value: 'Director1' },
    { label: 'Director2', value: 'Director2' },
    { label: 'Director3', value: 'Director3' },
    { label: 'Director4', value: 'Director4' },
    { label: 'Director5', value: 'Director5' },
  ];

  const handleOptionChangeGenre = async (event) => {
    //setMovie('');
    setSelectedOptionGenre(event.value);
    filter.genre = event.value;
    setFilter(filter);
    const params = {
      params: filter
    }
    const data = await MovieService.getMovieQueryParam(params);
    setMovies(data);
  };

  const handleOptionChangePremiereYear = async (event) => {
    setSelectedOptionPremiereYear(event.value);
    filter.premiereYear = event.value;
    const params = {
      params: filter
    }
    setFilter(filter);
    const data = await MovieService.getMovieQueryParam(params);
    setMovies(data);
  };

  const handleOptionChangeRatingValue = async (event) => {
    setSelectedOptionRatingValue(event.value);
    filter.ratingValue = event.value;
    const params = {
      params: filter
    }
    setFilter(filter);
    const data = await MovieService.getMovieQueryParam(params);
    setMovies(data);
  };

  const handleOptionChangeDirector = async (event) => {
    setSelectedOptionDirector(event.value);
    filter.director = event.value;
    const params = {
      params: filter
    }
    setFilter(filter);
    const data = await MovieService.getMovieQueryParam(params);
    setMovies(data);    
  };

  return (
    <Container>
      <div className="card" >
       <InputText value={movie} onChange={(e) => setMovie(e.target.value)} className='align-items-center' placeholder='Buscar pelicula ...'/>
      </div>
      <Row>
        <Col xs={2}>
        <h4>Genero</h4>
        <Dropdown
          value={selectedOptionGenre}
          options={optionsGenre}
          onChange={handleOptionChangeGenre}
          placeholder="Seleccionar"
        />
        <p>Opción seleccionada: {selectedOptionGenre}</p>
        </Col>
        <Col xs={2}>
        <h4>Año</h4>
        <Dropdown
          value={selectedOptionPremiereYear}
          options={optionsPremiereYear}
          onChange={handleOptionChangePremiereYear}
          placeholder="Seleccionar"
        />
        <p>Opción seleccionada: {selectedOptionPremiereYear}</p>
        </Col>
        <Col xs={2}>
        <h4>Calificación</h4>
        <Dropdown
          value={selectedOptionRatingValue}
          options={optionsRatingValue}
          onChange={handleOptionChangeRatingValue}
          placeholder="Seleccionar"
        />
        <p>Opción seleccionada: {selectedOptionRatingValue}</p>
        </Col>
        <Col xs={2}>
        <h4>Director</h4>
        <Dropdown
          value={selectedOptionDirector}
          options={optionsDirector}
          onChange={handleOptionChangeDirector}
          placeholder="Seleccionar"
        />
        <p>Opción seleccionada: {selectedOptionDirector}</p>
        </Col>
      </Row>
      <Row>    
        {movies.map(p => <CustomCard key={p.id} url={p.poster} id={p.id} title={p.title} genre={p.genre} premiereYear={p.premiereYear}/>)}
        {isLoading && <Loading />}
      </Row>   
    </Container>
  )
}

export default Search