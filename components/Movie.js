import React from 'react';
import {motion} from 'framer-motion';

import classes from './Movie.module.scss';

// motion: fading-in (appear) - we are starting from opacity 0 as default and animating to opacity 1
// motion: fot fading-out (exit) we need additional component - AnimatePresence (in parent Component)
const Movie = ({movie}) => {
    return (
        <motion.div
            layout
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}
            className={classes['movies-page']}
        >
            <h2>{movie.title}</h2>
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                alt={movie.title}
            />
        </motion.div>
    );
};

export default Movie;
