import { moviesTable } from "@/db/schema";
import {Movie} from "@/types/interfaces";
import {useDrizzleDb} from "@/db/useDrizzleDb";


export async function getLocalMovies(db: ReturnType<typeof useDrizzleDb>): Promise<Movie[]> {
    return db.select().from(moviesTable).all();
}

export async function saveMoviesToDb(
    db: ReturnType<typeof useDrizzleDb>,
    movies: Movie[]
): Promise<void> {
    await db
        .insert(moviesTable)
        .values(movies)
        .onConflictDoUpdate({
            target: [moviesTable.id],
            set: {
                title: moviesTable.title,
                poster_path: moviesTable.poster_path,
            },
        });
}