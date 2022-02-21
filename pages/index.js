import React, {useEffect, useLayoutEffect, useState} from 'react';
import Head from 'next/head'
import {AnimatePresence, isBrowser, motion} from 'framer-motion';

import {Header} from '../components/Header';
import Movie from '../components/Movie';
import Filter from '../components/Filter';

import styles from '../styles/Home.module.css'

export default function Home() {
    const [popularMovies, setPopularMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [activeGenre, setActiveGenre] = useState(0); // 0 - All

    // motion "AnimatePresence" gives error "useLayoutEffect does nothing on the server" with next.js
    // this fix not helps, but gives idea where to look further
    // https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
    const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;

    const fetchPopularMovies = async () => {
        const data = await fetch(
            'https://api.themoviedb.org/3/movie/popular?api_key=1b3b83579925bcd497cd1216c635fe43&language=en-US&page=1'
        );

        const movies = await data.json();
        setPopularMovies(movies.results);
        setFilteredMovies(movies.results);
    };

    const renderMovies = () => {
        return filteredMovies.map((movie) => {
            return <Movie key={movie.id} movie={movie}/>;
        });
    };

    useIsomorphicLayoutEffect(() => {
        fetchPopularMovies();
    }, []);

    return (
        <>
            <Head>
                <title>Movies List</title>
                <meta name="description" content="The list of currently popular movies"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <Header/>

            <main className={styles['popular-movies']}>
                <Filter
                    popularMovies={popularMovies}
                    setFilteredMovies={setFilteredMovies}
                    activeGenre={activeGenre}
                    setActiveGenre={setActiveGenre}
                />
                {/* motion - doesn't work with <styles jsx>. css have to live in separate file */}
                <motion.div layout className={styles['movies-grid']}>
                    <AnimatePresence>{renderMovies()}</AnimatePresence>
                </motion.div>
            </main>

        </>
    )
}
