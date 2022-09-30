import React, {useState} from 'react';
import Head from 'next/head'
import {AnimatePresence, isBrowser, motion} from 'framer-motion';

import {Header} from '../components/Header';
import Movie from '../components/Movie';
import Filter from '../components/Filter';

import styles from '../styles/Home.module.css'

export default function Home({movies}) {
    const [filteredMovies, setFilteredMovies] = useState(movies);
    const [activeGenre, setActiveGenre] = useState(0); // 0 - All

    const renderMovies = () => {
        return filteredMovies.map((movie) => {
            return <Movie key={movie.id} movie={movie}/>;
        });
    };

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
                    popularMovies={movies}
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

const getPopularMovies = async () => {
    const data = await fetch(
        'https://api.themoviedb.org/3/movie/popular?api_key=1b3b83579925bcd497cd1216c635fe43&language=en-US&page=1'
    );

    const movies = await data.json();
    return movies.results;
};

export async function getStaticProps() {
    const popularMovies = await getPopularMovies();

    return {
        // props - the props, that will be received in HomePage component
        props: {
            movies: popularMovies
        },
        revalidate: 30
        // 30 - number of seconds next.js will wait until it regenerates this page when server receives request for this page
        // thus, this page will not be generated only once during build process, but will be generated every 30 seconds
        // it means - our data on UI will be never older than 30 secs
    }
}
