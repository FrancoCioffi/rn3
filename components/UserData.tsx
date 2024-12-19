import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserDataProps {
    onProfileSave?: (name: string, email: string) => void; // Callback al guardar
}

const UserData: React.FC<UserDataProps> = ({ onProfileSave }) => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async (): Promise<void> => {
        try {
            const storedName = await AsyncStorage.getItem('name');
            const storedEmail = await AsyncStorage.getItem('email');
            if (storedName) setName(storedName);
            if (storedEmail) setEmail(storedEmail);
        } catch (e) {
            console.error('Error al cargar el perfil:', e);
        }
    };

    const saveProfile = async (): Promise<void> => {
        try {
            await AsyncStorage.setItem('name', name);
            await AsyncStorage.setItem('email', email);
            if (onProfileSave) onProfileSave(name, email); // Llamada al callback si existe
            alert('Perfil guardado correctamente');
        } catch (e) {
            console.error('Error al guardar el perfil:', e);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Datos del Perfil</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Correo Electrónico"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TouchableOpacity style={styles.button} onPress={saveProfile}>
                <Text style={styles.buttonText}>Guardar Perfil</Text>
            </TouchableOpacity>
        </View>
    );
};

export default UserData;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: 'white',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        color: 'white',
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});
