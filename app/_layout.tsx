import {Stack} from "expo-router";
import './globals.css';
import {ActivityIndicator, Platform, StatusBar, View} from "react-native";
import {Suspense} from "react";
import {openDatabaseSync, SQLiteProvider} from "expo-sqlite";
import {useMigrations} from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/drizzle/migrations";
import {drizzle} from "drizzle-orm/expo-sqlite";
import {useDrizzleStudio} from "expo-drizzle-studio-plugin";

export const DATABASE_NAME = 'mooviez_db'

export default function RootLayout() {
    const expoDb = openDatabaseSync(DATABASE_NAME);
    useDrizzleStudio(expoDb)
    const db = drizzle(expoDb);
    const {success, error} = useMigrations(db, migrations);

    return (
        <>
            <StatusBar hidden={true}/>
            <Suspense fallback={<ActivityIndicator size="large"/>}>
                <SQLiteProvider
                    databaseName={DATABASE_NAME}
                    options={{enableChangeListener: true}}
                    useSuspense>
                    <View className="bg-primary flex-1">
                        <Stack>
                            <Stack.Screen
                                name="(tabs)"
                                options={{
                                    headerShown: false,
                                    animation: Platform.OS === "ios" ? "ios_from_right" : "fade_from_bottom"
                                }}/>
                            <Stack.Screen
                                name="movies/[id]"
                                options={{
                                    headerShown: false,
                                    animation: Platform.OS === "ios" ? "ios_from_right" : "fade_from_bottom"
                                }}
                            />
                        </Stack>
                    </View>
                </SQLiteProvider>
            </Suspense>
        </>);
}
