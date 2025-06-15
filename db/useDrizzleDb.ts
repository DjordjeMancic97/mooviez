import {useSQLiteContext} from "expo-sqlite";
import {drizzle} from "drizzle-orm/expo-sqlite";

export const useDrizzleDb = () => {
    const expoDb = useSQLiteContext();
    return drizzle(expoDb)
}