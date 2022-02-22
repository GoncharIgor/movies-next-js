import React, {useEffect} from 'react';
import classes from './Filter.module.scss';

const Filter = ({
                    setActiveGenre,
                    activeGenre,
                    popularMovies,
                    setFilteredMovies,
                }) => {
    useEffect(() => {
        if (activeGenre === 0) {
            setFilteredMovies(popularMovies);
            return;
        }

        const filteredMovies = popularMovies.filter((movie) => {
            return movie.genre_ids.includes(activeGenre);
        });
        setFilteredMovies(filteredMovies);
    }, [activeGenre]); // run useEffect every time "activeGenre" changes

    return (
        <div className={classes['filter-container']}>
            <button
                className={activeGenre === 0 ? classes.active : ''}
                onClick={() => setActiveGenre(0)}
            >
                All
            </button>
            <button
                className={activeGenre === 35 ? classes.active : ''}
                onClick={() => setActiveGenre(35)}
            >
                Comedy
            </button>
            <button
                className={activeGenre === 28 ? classes.active : ''}
                onClick={() => setActiveGenre(28)}
            >
                Action
            </button>
        </div>
    );
};

export default Filter;
