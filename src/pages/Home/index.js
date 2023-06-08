import { useEffect, useState } from "react";
import api from '../../services/api';
import { Link } from 'react-router-dom';
import Loader from "../../components/Loader/loader";
import './home.css'

function Home() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadMovies() {
            const response = await api.get('movie/now_playing', {
                params: {
                    api_key: '492f6c0d577f9909a3881d0fcf83e208',
                    language: 'pt-br',
                    page: 1,
                }
            })
            setMovies(response.data.results);
            setLoading(false);
        }

        loadMovies();
    })

    if (loading) {
        return (
            <div className="page_center">
                <Loader />
            </div>
        )
    }

    return (
        <div className="container">
            <div className="movies_list">
                {movies.map((movie) => {
                    return (
                        <article key={movie.id} className="movie_card">
                            <Link to={`/movie/${movie.id}`} className="movie_link">
                                <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} className="movie_poster" />
                                <div className="movie_gradient"></div>
                                <div className="movie_info">
                                    <strong className="movie_title">{movie.title}</strong>
                                </div>
                            </Link>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}

export default Home;