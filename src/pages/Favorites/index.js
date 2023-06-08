import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Icon from '@mdi/react';
import { mdiInformationOutline, mdiDelete } from '@mdi/js';
import './favorites.css'

function Favorites() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const myFavoritesMovies = localStorage.getItem("@filmarea");
        setMovies(JSON.parse(myFavoritesMovies) || []);

    }, [])

    function deleteMovie(id) {
        let filteredMovies = movies.filter((movie) => {
            return (movie.id !== id)
        });

        setMovies(filteredMovies);
        localStorage.setItem('@filmarea', JSON.stringify(filteredMovies));
        toast.success("Filme removido com sucesso!")
    }

    return (
        <div className='container_favorites'>
            <div className='fav_title'>
                <h2>Meus Filmes Favoritos</h2>
            </div>
            <div className='fav_list'>
                {movies.length === 0 &&
                    <div>
                        <h1 className='fav_empty_list'>
                            Você não tem nenhum filme salvo.
                        </h1>
                    </div>
                }
                {movies.map((movie) => {
                    return (
                        <article key={movie.id} className="movie_card">
                            <div className="movie_link">
                                <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} className="movie_poster" />
                                <div className='hover_fav'>
                                    <div className='hover_fav_actions'>
                                        <Link to={`/movie/${movie.id}`} >
                                            <Icon path={mdiInformationOutline} size={2} color='#ffffffb3' className='hover_fav_actions_icon' />
                                        </Link>
                                        <br />
                                        <Icon onClick={(() => deleteMovie(movie.id))} path={mdiDelete} size={2} color='#ffffffb3' className='hover_fav_actions_icon' />
                                    </div>
                                </div>
                                <div className="movie_gradient_fav"></div>
                                <div className="movie_info_fav">
                                    <strong className="movie_title">{movie.title}</strong>
                                </div>
                            </div>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}

export default Favorites;