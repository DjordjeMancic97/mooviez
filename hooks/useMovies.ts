import { useDrizzleDb } from "@/db/useDrizzleDb";
import { fetchMovies } from "@/services/api";
import { useEffect, useState } from "react";
import {Movie} from "@/types/interfaces";
import {getLocalMovies, saveMoviesToDb} from "@/services/movieRepository";

export const useMovies = () => {
    const db = useDrizzleDb();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const loadMovies = async () => {
        try {
            setLoading(true);
            const localMovies = await getLocalMovies(db);
            if (localMovies.length > 0) setMovies(localMovies);

            const remote = await fetchMovies({ query: "" });
            await saveMoviesToDb(db, remote);

            const freshMovies = await getLocalMovies(db);
            setMovies(freshMovies);
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Unknown error"));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMovies();
    }, []);

    return { movies, loading, error };
};