import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

export default function UserLocation() {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);

    // Espera por los permisos y luego guarda la ubicacion.
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    let text = 'Waiting...';
    if (location) {
        text = `Latitude: ${location.coords.latitude}\nLongitude: ${location.coords.longitude}`;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>User Location</Text>
            <Text style={styles.paragraph}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color: 'white'
    },
    paragraph: {
        fontSize: 18,
        textAlign: 'center',
        color: 'white'
    },
});