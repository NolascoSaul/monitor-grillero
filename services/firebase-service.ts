// src/services/firebaseService.ts
import { initializeApp } from "firebase/app";
import {
    getDatabase,
    ref,
    onValue,
    push,
    Database,
    off,
} from "firebase/database";
import type { HabitatReading } from "@/types/habitat";
import type { FirebaseReading } from "@/types/firebase";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL!,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
    measurementId: "G-8C4V49XQ8N",
};

const app = initializeApp(firebaseConfig);
export const db: Database = getDatabase(app);

export const subscribeReadings = (
    callback: (data: HabitatReading[]) => void,
    errorCallback?: (err: any) => void
) => {
    try {
        const readingsRef = ref(db, "grillero/historial");

        const listener = onValue(readingsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const readings: HabitatReading[] = Object.values<FirebaseReading>(
                    data
                ).map((item) => ({
                    timestamp: new Date(item.timestamp),
                    temperature: item.temperature,
                    humidity: item.humidity,
                }));
                callback(readings);
            } else {
                callback([]);
            }
        });

        return () => off(readingsRef, "value", listener);
    } catch (err) {
        console.error("Error al subscribirse a Firebase:", err);
        if (errorCallback) errorCallback(err);
        return () => { };
    }
};

export const addReading = (reading: HabitatReading, errorCallback?: (err: any) => void) => {
    try {
        const readingsRef = ref(db, "grillero/historial");
        push(readingsRef, {
            temperatura: reading.temperature,
            humedad: reading.humidity,
            timestamp: reading.timestamp.getTime(),
        });
    } catch (err) {
        console.error("Error al agregar lectura a Firebase:", err);
        if (errorCallback) errorCallback(err);
    }
};