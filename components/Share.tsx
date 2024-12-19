import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share, Platform } from 'react-native';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

export default function ShareApp() {
    const share = async () => {
        try {
            // Define la ruta del archivo en el directorio de caché
            const fileUri = `${FileSystem.cacheDirectory}app-link.txt`;
            await FileSystem.writeAsStringAsync(fileUri, 'OAAAAAAA: https://expo.dev');
            await Sharing.shareAsync(fileUri, { dialogTitle: 'Comparti la app' });
        } catch (error) {
            console.error('Error al compartir la app:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Compartir App</Text>
            <TouchableOpacity style={styles.button} onPress={share}>
                <Text style={styles.buttonText}>Comparta esta App</Text>
            </TouchableOpacity>
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
