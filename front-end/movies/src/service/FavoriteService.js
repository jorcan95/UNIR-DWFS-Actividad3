import axios from 'axios';

export const FavoriteService = {

    async addFavorite(favorite) {
        try {
            const respuesta = await axios.post(process.env.REACT_APP_API_FAVORITE, favorite);
            return respuesta.data.id;
          } catch (error) {
            console.error('Error al consumir el servicio web:', error);
          }
    },

    async getFavorite() {
        try {
            const respuesta = await axios.get(process.env.REACT_APP_API_FAVORITE);
            return respuesta.data;
        } catch (error) {
            console.error('Error al consumir el servicio web:', error);
        }
    },

    deleteFavorite(favoriteId) {
        try {
            axios.delete(process.env.REACT_APP_API_FAVORITE + '/' + favoriteId);
        } catch (error) {
            console.error('Error al consumir el servicio web:', error);
        }
    }

}