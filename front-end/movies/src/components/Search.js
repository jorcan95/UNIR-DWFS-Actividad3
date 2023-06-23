import React,{ useState} from 'react'
import { InputText } from 'primereact/inputtext';
import { useMovie } from '../hooks/useMovie';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { Card } from 'primereact/card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

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
  
  const [movie, setMovie] = useState('')
  const {movies, isLoading} = useMovie(movie);

  return (
    <Container>
      <div className="card" >
       <InputText value={movie} onChange={(e) => setMovie(e.target.value)} className='align-items-center' placeholder='Buscar pelicula ...'/>
      </div>
      <Row>    
        {movies.map(p => <CustomCard key={p.id} url={p.poster} id={p.id} title={p.title} genre={p.genre} premiereYear={p.premiereYear}/>)}
        {isLoading && <Loading />}
      </Row>   
    </Container>
  )
}

export default Search