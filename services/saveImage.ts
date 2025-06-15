import * as FileSystem from 'expo-file-system';

export const saveImage = async (url: string, movieId: string): Promise<string | undefined> => {
    try {
        const localUri = `${FileSystem.documentDirectory}/poster_${movieId}`;
        const {exists} = await FileSystem.getInfoAsync(localUri);

        if (!exists) {
            const downloaded = await FileSystem.downloadAsync(`https://image.tmdb.org/t/p/w500${url}`, localUri);
            return downloaded.uri;
        }

        return localUri;
    } catch (err) {
        console.error(err);
        return undefined;
    }
}