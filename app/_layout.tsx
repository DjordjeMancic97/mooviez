import {Stack} from "expo-router";
import './globals.css';
import {Platform, StatusBar, View} from "react-native";

export default function RootLayout() {
    return (
        <>
            <StatusBar hidden={true}/>
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
        </>);
}
