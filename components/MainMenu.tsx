import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Biometric from '@/components/Biometric';
import Camera from '@/components/Camera';
import UserLocation from '@/components/Location';
import Share from '@/components/Share';
import Giroscopio from '@/components/Giroscopio';
import Notification from '@/components/Notifications';
import UserData from '@/components/UserData';

export default function MainMenu() {
    const [componente, setComponente] = useState<React.ComponentType | null>(null);

    const menuItems = [
        {
            title: 'Verificacion Biometrica',
            id: 'Biometric',
            icon: 'finger-print',
            component: Biometric
        },
        {
            title: 'Camera Profile',
            id: 'Camera',
            icon: 'camera',
            component: Camera
        },
        {
            title: 'Ubicacion del Usuario',
            id: 'User',
            icon: 'location',
            component: UserLocation
        },
        {
            title: 'Compartir App',
            id: 'ShareApp',
            icon: 'share-social',
            component: Share
        },
        {
            title: 'Detencion del Giroscopio',
            id: 'Giroscopio',
            icon: 'compass',
            component: Giroscopio
        },
        {
            title: 'Notificaciones',
            id: 'Notifications',
            icon: 'notifications',
            component: Notification
        },
        {
            title: 'Datos del Usuario',
            id: 'UserData',
            icon: 'save',
            component: UserData
        },
    ];
    if (componente) {
        // Si hay un componente seleccionado, renderízalo
        const SelectedComponent = componente;
        return (
            <View style={styles.componentContainer}>
                <TouchableOpacity onPress={() => setComponente(null)} style={styles.backButton}>
                    <Text style={styles.backButtonText}>Volver</Text>
                </TouchableOpacity>
                <SelectedComponent />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.menu}>
                {menuItems.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.button}
                        onPress={() => setComponente(() => item.component)} // Seleccionar el componente
                    >
                        <View style={styles.buttonContent}>
                            <Ionicons
                                name={item.icon as any}
                                size={30}
                                color="white"
                                style={styles.icon}
                            />
                            <Text style={styles.text}>{item.title}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212', 
    },
    menu: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        paddingTop: 10,
    },
    button: {
        backgroundColor: '#1E88E5', 
        borderRadius: 10,
        width: '80%', 
        margin: '10%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContent: {
        alignItems: 'center',
    },
    icon: {
        marginBottom: 10,
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    componentContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#121212',
    },
    backButton: {
        padding: 10,
        marginTop: '10%',
        backgroundColor: '#1E88E5',
        borderRadius: 10,
        alignItems: 'center',
    },
    backButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});