import axios from 'axios';

export const MovieService = {

    async createMovie(movie) {
        try {
            const response = await axios.post(process.env.REACT_APP_API_MOVIE, movie);
            return response.data.id;
          } catch (error) {
            console.error('Error al consumir el servicio web:', error);
          }
    },

    async getMovieParam(value, param) {
        try {
            const respuesta = await axios.get(process.env.REACT_APP_API_MOVIE+'?'+param+'='+value);
            return respuesta.data;
        } catch (error) {
            console.error('Error al consumir el servicio web:', error);
        }
    },

    getMovie() {
        try {
            const respuesta = axios.get(process.env.REACT_APP_API_MOVIE);
            return respuesta.data;
        } catch (error) {
            console.error('Error al consumir el servicio web:', error);
        }
    },

    updateMovie(movie) {
        try {
            axios.put(process.env.REACT_APP_API_MOVIE + '/' + movie.id, movie);
        } catch (error) {
            console.error('Error al consumir el servicio web:', error);
        }
    },

    deleteMovie(movie) {
        try {
            axios.delete(process.env.REACT_APP_API_MOVIE + '/' + movie.id);
        } catch (error) {
            console.error('Error al consumir el servicio web:', error);
        }
    }


}