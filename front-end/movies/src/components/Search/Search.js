import React,{ useState} from 'react'
import { InputText } from 'primereact/inputtext';
import { useMovie } from '../../hooks/useMovie';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';

const CustomCard = ({id,url}) => { 

  return (   
    <Link to={`/detail/${id}`}>
      <img src={url} alt="poster" width="450" height="300" />
    </Link>
      
  )
}

const Search = ({handler}) => {
  const [movie, setMovie] = useState('')
  const {movies, isLoading} = useMovie(movie);

  return (
    <div>
      <div className="card" >
       <InputText value={movie} onChange={(e) => setMovie(e.target.value)} className='align-items-center' placeholder='Ingrese título'/>
      </div>
    
      {movies.map(p => <CustomCard key={p.id} url={p.poster} id={p.id}/>)}
     {isLoading && <Loading />}
    
    </div>
    
  )
}

export default Search