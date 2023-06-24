import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MovieService } from '../service/MovieService';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import 'primeflex/primeflex.css';

export default function Movie() {

    let emptyMovie = {
        "id": null,
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
    }

    const [movies, setMovies] = useState(null);
    const [movieDialog, setMovieDialog] = useState(false);
    const [deleteMovieDialog, setDeleteMovieDialog] = useState(false);
    const [deleteMoviesDialog, setDeleteMoviesDialog] = useState(false);
    const [movie, setMovie] = useState(emptyMovie);
    const [selectedMovies, setSelectedMovies] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

        MovieService.getMovie();
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(process.env.REACT_APP_API_MOVIE);
                if (response.ok) {
                    const json = await response.json();
                    setMovies(json);
                } else {
                    setError('Error al obtener los datos');
                }
            } catch (error) {
                setError('Error de conexión');
            }
            setIsLoading(false);
        };
        fetchData();
    }, []);

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Ocurrió un error: {error}</div>;
    }

    const openNew = () => {
        setMovie(emptyMovie);
        setSubmitted(false);
        setMovieDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setMovieDialog(false);
    };

    const hideDeleteMovieDialog = () => {
        setDeleteMovieDialog(false);
    };

    const hideDeleteMoviesDialog = () => {
        setDeleteMoviesDialog(false);
    };

    const saveMovie = async () => {
        setSubmitted(true);

        if (movie.title.trim()) {
            let _movies = [...movies];
            let _movie = { ...movie };

            if (movie.id) {

                MovieService.updateMovie(movie);
                const index = findIndexById(movie.id);
                _movies[index] = _movie;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Movie Updated', life: 3000 });

            } else {

                const idMovie = await MovieService.createMovie(movie);
                console.log(idMovie);
                _movie.id = idMovie;
                _movies.push(_movie);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Movie Created', life: 3000 });

            }

            setMovies(_movies);
            setMovieDialog(false);
            setMovie(emptyMovie);
        }
    };

    const editMovie = (movie) => {
        setMovie({ ...movie });
        setMovieDialog(true);
    };


    const confirmDeleteMovie = (movie) => {
        setMovie(movie);
        setDeleteMovieDialog(true);
    };

    const deleteMovie = () => {
        MovieService.deleteMovie(movie);

        let _movies = movies.filter((val) => val.id !== movie.id);

        setMovies(_movies);
        setDeleteMovieDialog(false);
        setMovie(emptyMovie);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Movie Deleted', life: 3000 });
    };

    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < movies.length; i++) {
            if (movies[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const deleteSelectedMovies = () => {
        let _movies = movies.filter((val) => !selectedMovies.includes(val));

        setMovies(_movies);
        setDeleteMoviesDialog(false);
        setSelectedMovies(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Movies Deleted', life: 3000 });
    };

    const onInputChange = (e, name) => {

        const val = (e.target && e.target.value) || '';

        let _movie = { ...movie };

        _movie[`${name}`] = val;

        setMovie(_movie);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _movie = { ...movie };

        _movie[`${name}`] = val;

        setMovie(_movie);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="Nuevo" icon="pi pi-plus" className="mr-2" severity="success" onClick={openNew} />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="CSV" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };

    const imageBodyTemplate = (rowData) => {
        return <img src={`${rowData.poster}`} alt={rowData.image} className="shadow-2 border-round mini-img-table" />;
    };

    const ratingBodyTemplate = (rowData) => {
        return <Rating value={rowData.ratingValue} readOnly cancel={false} />;
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editMovie(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteMovie(rowData)} />
            </React.Fragment>
        );
    };

    const header = (
        <div >
            <h1 className="m-0">Administrador de películas</h1>
            <div className="flex flex-wrap gap-2 align-items-center justify-content-initial">
                <div>
                    <h4>Palabra clave</h4>
                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
                    </span>
                </div>
                {/*<div>
                    <h4>Seleccione un Genero</h4>
                    <AutoComplete
                        value={selectedValue}
                        suggestions={options}
                        field="name"
                        dropdown forceSelection
                        completeMethod={filterData}
                        onChange={(e) => handleOptionSelect(e, 'genre')}
                        placeholder="Seleccione una opción"
                    />
                </div> */}
                
            </div>

        </div>
    );
    const movieDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveMovie} />
        </React.Fragment>
    );
    const deleteMovieDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteMovieDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteMovie} />
        </React.Fragment>
    );
    const deleteMoviesDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteMoviesDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedMovies} />
        </React.Fragment>
    );

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">

                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={movies} selection={selectedMovies} onSelectionChange={(e) => setSelectedMovies(e.value)}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Listando {first} - {last} de {totalRecords} peliculas" globalFilter={globalFilter} header={header}>
                    <Column body={actionBodyTemplate} exportable={false}></Column>
                    <Column field="poster" header="Poster" body={imageBodyTemplate}></Column>
                    <Column field="title" header="Título" sortable></Column>
                    <Column field="ratingValue" header="Calificación" body={ratingBodyTemplate} sortable></Column>
                    <Column field="director" header="Director" sortable></Column>
                    <Column field="premiereYear" header="Año" sortable></Column>
                    <Column field="genre" header="Genero" sortable></Column>
                    <Column field="actors" header="Actores" sortable></Column>
                    <Column field="duration" header="Duración" sortable></Column>
                    <Column field="language" header="Lenguaje" sortable></Column>
                    <Column field="country" header="País" sortable></Column>
                    <Column field="productionCompany" header="Compañia" sortable></Column>
                    <Column field="rating" header="Clasificación" sortable></Column>
                </DataTable>
            </div>

            <Dialog visible={movieDialog} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Movie Details" modal className="p-fluid" footer={movieDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="title" className="font-bold">
                        Título
                    </label>
                    <InputText id="title" name="title" value={movie.title} onChange={(e) => onInputChange(e, 'title')} required autoFocus className={classNames({ 'p-invalid': submitted && !movie.title })} />
                    {submitted && !movie.title && <small className="p-error">Título es requiredo.</small>}
                </div>
                <div className="field">
                    <label htmlFor="director" className="font-bold">
                        Director
                    </label>
                    <InputText id="director" name="director" value={movie.director} onChange={(e) => onInputChange(e, 'director')} required autoFocus className={classNames({ 'p-invalid': submitted && !movie.director })} />
                    {submitted && !movie.director && <small className="p-error">Director es requiredo.</small>}
                </div>
                <div className="field">
                    <label htmlFor="premiereYear" className="font-bold">
                        Año
                    </label>
                    <InputNumber id="premiereYear" name="premiereYear" value={movie.premiereYear} onValueChange={(e) => onInputNumberChange(e, 'premiereYear')} required autoFocus className={classNames({ 'p-invalid': submitted && !movie.premiereYear })} />
                    {submitted && !movie.premiereYear && <small className="p-error">Año es requiredo.</small>}
                </div>
                <div className="field">
                    <label htmlFor="genre" className="font-bold">
                        Genero
                    </label>
                    <InputText id="genre" name="genre" value={movie.genre} onChange={(e) => onInputChange(e, 'genre')} required autoFocus className={classNames({ 'p-invalid': submitted && !movie.genre })} />
                    {submitted && !movie.genre && <small className="p-error">Genero es requiredo.</small>}
                </div>
                <div className="field">
                    <label htmlFor="actors" className="font-bold">
                        Actores
                    </label>
                    <InputText id="actors" name="actors" value={movie.actors} onChange={(e) => onInputChange(e, 'actors')} required autoFocus className={classNames({ 'p-invalid': submitted && !movie.actors })} />
                    {submitted && !movie.actors && <small className="p-error">Actores es requiredo.</small>}
                </div>
                <div className="field">
                    <label htmlFor="synopsis" className="font-bold">
                        Descripción
                    </label>
                    <InputText id="synopsis" name="synopsis" value={movie.synopsis} onChange={(e) => onInputChange(e, 'synopsis')} required autoFocus className={classNames({ 'p-invalid': submitted && !movie.synopsis })} />
                    {submitted && !movie.synopsis && <small className="p-error">Descripción es requiredo.</small>}
                </div>
                <div className="field">
                    <label htmlFor="duration" className="font-bold">
                        Duración
                    </label>
                    <InputNumber id="duration" name="duration" value={movie.duration} onValueChange={(e) => onInputNumberChange(e, 'duration')} required autoFocus className={classNames({ 'p-invalid': submitted && !movie.duration })} />
                    {submitted && !movie.duration && <small className="p-error">Duración es requiredo.</small>}
                </div>
                <div className="field">
                    <label htmlFor="language" className="font-bold">
                        Lenguaje
                    </label>
                    <InputText id="language" name="language" value={movie.language} onChange={(e) => onInputChange(e, 'language')} required autoFocus className={classNames({ 'p-invalid': submitted && !movie.language })} />
                    {submitted && !movie.language && <small className="p-error">Lenguaje es requiredo.</small>}
                </div>
                <div className="field">
                    <label htmlFor="country" className="font-bold">
                        País
                    </label>
                    <InputText id="country" name="country" value={movie.country} onChange={(e) => onInputChange(e, 'country')} required autoFocus className={classNames({ 'p-invalid': submitted && !movie.country })} />
                    {submitted && !movie.country && <small className="p-error">País es requiredo.</small>}
                </div>
                <div className="field">
                    <label htmlFor="productionCompany" className="font-bold">
                        Compañia
                    </label>
                    <InputText id="productionCompany" name="productionCompany" value={movie.productionCompany} onChange={(e) => onInputChange(e, 'productionCompany')} required autoFocus className={classNames({ 'p-invalid': submitted && !movie.productionCompany })} />
                    {submitted && !movie.productionCompany && <small className="p-error">Compañia es requiredo.</small>}
                </div>
                <div className="field">
                    <label htmlFor="rating" className="font-bold">
                        Clasificación
                    </label>
                    <InputText id="rating" name="rating" value={movie.rating} onChange={(e) => onInputChange(e, 'rating')} required autoFocus className={classNames({ 'p-invalid': submitted && !movie.rating })} />
                    {submitted && !movie.rating && <small className="p-error">Clasificación es requiredo.</small>}
                </div>
                <div className="field">
                    <label htmlFor="ratingValue" className="font-bold">
                        Calificación
                    </label>
                    <InputNumber id="ratingValue" name="ratingValue" value={movie.ratingValue} onValueChange={(e) => onInputNumberChange(e, 'ratingValue')} required autoFocus className={classNames({ 'p-invalid': submitted && !movie.ratingValue })} />
                    {submitted && !movie.ratingValue && <small className="p-error">Calificación es requiredo.</small>}
                </div>
                <div className="field">
                    <label htmlFor="poster" className="font-bold">
                        Poster
                    </label>
                    <InputText id="poster" name="poster" value={movie.poster} onChange={(e) => onInputChange(e, 'poster')} required autoFocus className={classNames({ 'p-invalid': submitted && !movie.poster })} />
                    {submitted && !movie.poster && <small className="p-error">Poster es requiredo.</small>}
                </div>
            </Dialog>

            <Dialog visible={deleteMovieDialog} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirmación" modal footer={deleteMovieDialogFooter} onHide={hideDeleteMovieDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" />
                    {movie && (
                        <span>
                            Estas seguro de eliminar <b>{movie.title}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteMoviesDialog} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirmación" modal footer={deleteMoviesDialogFooter} onHide={hideDeleteMoviesDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" />
                    {movie && <span>Are you sure you want to delete the selected movies?</span>}
                </div>
            </Dialog>
        </div>
    );
}