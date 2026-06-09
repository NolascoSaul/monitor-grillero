import { ref, push } from "firebase/database";
import { db } from "@/services/firebase-service";

export const sendData = () => {
    const historialRef = ref(db, "grillero/historial");

    for (let i = 0; i < 10; i++) {
        push(historialRef, {
            temperature: 23 + Math.floor(Math.random() * 15), // 23-38°C
            humidity: 35 + Math.floor(Math.random() * 30),    // 35-65%
            timestamp: Date.now() + i * 3600 * 1000,         // Cada hora
        });
    }
};