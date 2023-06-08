import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "../../services/api";
import { toast } from 'react-toastify'

import Loader from "../../components/Loader/loader";
import Rating from "../../components/Rating";

import Icon from '@mdi/react';
import { mdiStarCircleOutline, mdiInformationOutline, mdiPlayCircleOutline } from '@mdi/js';
import './movie.css';

function Movie() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState(true);
    const [emptyP, setEmptyP] = useState(false);
    const [emptyG, setEmptyG] = useState(false);
    const [emptyProduction, setEmptyProduction] = useState({});
    const [emptyGenres, setEmptyGenres] = useState({});

    useEffect(() => {
        async function loadMovie() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: '492f6c0d577f9909a3881d0fcf83e208',
                    language: 'pt-br'
                }
            })
                .then((response) => {
                    setMovie(response.data);
                    setLoading(false);

                    if (response.data.production_companies.length === 0) {
                        setEmptyP(true)
                        setEmptyProduction('Sem informações.');
                    } else {
                        setEmptyP(false)
                        setEmptyProduction('')
                    }
                    if (response.data.genres.length === 0) {
                        setEmptyG(true)
                        setEmptyGenres('Sem informações.');
                    } else {
                        setEmptyG(false)
                        setEmptyGenres('')
                    }
                })
                .catch((error) => {
                    navigate('/error', { replace: true });
                    return;
                })
        }

        loadMovie();

        return;
    }, [id, navigate])

    function addToFavorites() {
        const myFavoritesMovies = localStorage.getItem("@filmarea");
        let savedMovies = JSON.parse(myFavoritesMovies) || [];

        const hasMovie = savedMovies.some((newFavoriteMovie) => newFavoriteMovie.id === movie.id);

        if (hasMovie) {
            toast.warn("Esse filme já está na sua lista!");
            return;
        }

        savedMovies.push(movie);
        localStorage.setItem("@filmarea", JSON.stringify(savedMovies))
        toast.success("Filme salvo com sucesso!");
    }

    if (loading) {
        return (
            <div className="page_center">
                <Loader />
            </div>
        )
    }

    return (
        <div className="container-movie">
            <div className="movie_backdrop">
                <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title} className="movie_backdrop_poster" />
                <div className="movie_backdrop_gradient"></div>
            </div>
            <div className="movie_main-info">
                <h2 className="movie_main-info_tagline">{movie.tagline}</h2>
                <h1 className="movie_main-info_title">{movie.title}</h1>
                <div className="movie_description">
                    <Rating estrelas={movie.vote_average} />
                    <h2>{movie.release_date.substr(0, 4)}</h2>
                    <h2>{movie.runtime} MIN</h2>
                </div>
            </div>
            <div className="movie_area_buttons">
                <button className="movie_buttons" onClick={addToFavorites}>
                    <a>
                        <Icon className="movie_button_text" path={mdiStarCircleOutline} size={1} color='#ffffffb3' />
                        <span className="movie_button_text">Adicionar aos favoritos</span>
                    </a>
                </button>
                <button className="movie_buttons">
                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${movie.title} Trailer`}>
                        <Icon className="movie_button_text" path={mdiPlayCircleOutline} size={1} color='#ffffffb3' />
                        <span className="movie_button_text">Assistir Trailer</span>
                    </a>
                </button>
            </div>
            <div className="movie_detail">
                <div className="movie_detail_left">
                    <div className="movie_overview">
                        <span className="movie_overview_text">&emsp;&emsp;{movie.overview}</span>
                    </div>
                </div>
                <div className="movie_detail_right">
                    <div className="movie_technical">
                        <div className="movie_technical_info">
                            <span className="info_title">Produção:</span>
                            <span className={emptyP ? "info_text" : "noinfo_text"}>{emptyProduction}</span>
                            {movie.production_companies.map((companie) => {
                                return (
                                    <div key={companie.id}>
                                        <span className="info_text">{companie.name};</span>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="movie_technical_info">
                            <span className="info_title">Gêneros:</span>
                            <span className={emptyG ? "info_text" : "noinfo_text"}>{emptyGenres}</span>
                            {movie.genres.map((genre) => {
                                return (
                                    <div key={genre.id}>
                                        <span className="info_text">{genre.name};</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Movie;