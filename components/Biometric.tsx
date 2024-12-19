import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication'; // Importa el módulo para autenticación biométrica de Expo

export default function BiometricAuthentication() {
    // Estado para almacenar si el usuario está autenticado
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const authenticate = async () => {
        try {
            const auth = await LocalAuthentication.authenticateAsync();
            setIsAuthenticated(auth.success);
        } catch (error) {
            console.error('Error de Auntenticacion:', error);
        }
    };

    useEffect(() => {
        // Inicia automáticamente la autenticación al cargar la pantalla
        authenticate();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Aunteticacion Biometrica</Text>
            {isAuthenticated ? (
                <Text style={styles.status}>Efectivamente sos vos!</Text>
            ) : (
                <TouchableOpacity style={styles.button} onPress={authenticate}>
                    <Text style={styles.buttonText}>Aunteticado</Text>
                </TouchableOpacity>
            )}
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
        color: 'white',
    },
    status: {
        fontSize: 18,
        color: 'green',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
});