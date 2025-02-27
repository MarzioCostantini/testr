import { useEffect, useState } from "react";

export interface IMovies {
    page: number;
    results: Result[];
    total_pages: number;
    total_results: number;
}

export interface Result {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: OriginalLanguage;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: Date;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export enum OriginalLanguage {
    En = "en",
    Ta = "ta",
    Th = "th",
    Zh = "zh",
}



const Home = () => {
    const [movies, setMovies] = useState<IMovies | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1)

    const apiKey = import.meta.env.VITE_API_KEY;

    console.log("Mein API-Key:", apiKey);

    useEffect(() => {
        setLoading(true)
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=${page}`)
            .then((data) => data.json())
            .then((pizza) => setMovies(pizza))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false))
    }, [page])

    console.log(movies);


    return (
        <>
            {loading ? (
                <p>loading</p>
            ) : (
                <>
                    <h1>home</h1>
                    <section className="grid">
                        {movies?.results?.map((item, index) => (
                            <article key={index}>
                                <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title} />
                                <h3>{item.title}</h3>
                            </article>
                        ))}
                    </section>
                    <div>
                        <button onClick={() => setPage(page + 1)}>Weiter </button>
                        <h3>{page}</h3>
                        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>zurück </button>
                    </div>

                </>
            )}




        </>
    );
}

export default Home;