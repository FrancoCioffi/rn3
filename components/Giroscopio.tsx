import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Gyroscope } from 'expo-sensors';

export default function Giroscopio() {
    const [data, setData] = useState({ x: 0, y: 0, z: 0 });

    useEffect(() => {
        // Suscribirse al giroscopio
        const subscription = Gyroscope.addListener(gyroscopeData => {
            setData(gyroscopeData);
        });
        Gyroscope.setUpdateInterval(100); // Milisegundos
        // Limpiar la suscripción al desmontar el componente
        return () => subscription.remove();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Giroscopio</Text>
            <Text style={styles.data}>
                x: {data.x.toFixed(2)} | y: {data.y.toFixed(2)} | z: {data.z.toFixed(2)}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
    },
    data: {
        fontSize: 18,
        color: 'white',
    },
});