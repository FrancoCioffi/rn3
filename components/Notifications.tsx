import React, { useEffect, useRef } from 'react';
import { View, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

const NotificationWithStorage = () => {
    const notificationListener = useRef<any>();
    const responseListener = useRef<any>();

    useEffect(() => {
        // Solicitar permisos para notificaciones
        const requestPermissions = async () => {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            if (status !== 'granted') {
                Alert.alert('Permisos requeridos', 'Por favor, habilita las notificaciones en la configuración.');
                return;
            }
        };

        requestPermissions();

        // Manejar notificaciones recibidas
        notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
            console.log('Notificación recibida:', notification);
        });

        // Manejar respuesta a notificaciones
        responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
            console.log('Respuesta a notificación:', response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    // Función para cargar datos de AsyncStorage y mostrar la notificación
    const showNotification = async () => {
        try {
            const name = await AsyncStorage.getItem('name');
            const email = await AsyncStorage.getItem('email');

            if (!name || !email) {
                Alert.alert('Datos faltantes', 'No se encontraron datos de perfil guardados.');
                return;
            }

            // Programar notificación local
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: `Hola, ${name}!`,
                    body: `Tu correo registrado es ${email}.`,
                },
                trigger: {
                    seconds: 1, // Mostrar notificación 1 segundo después
                },
            });
        } catch (error) {
            console.error('Error al cargar datos de AsyncStorage:', error);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button title="Mostrar Notificación" onPress={showNotification} />
        </View>
    );
};

export default NotificationWithStorage;
