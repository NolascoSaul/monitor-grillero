import mqtt from 'mqtt';

let client: mqtt.MqttClient | null = null;

const brokerUrl = process.env.NEXT_PUBLIC_MQTT_BROKER!;

const options = {
    username: process.env.NEXT_PUBLIC_MQTT_USER,
    password: process.env.NEXT_PUBLIC_MQTT_PASSWORD,
    connectTimeout: 5000,
    reconnectPeriod: 3000,
}

export const connectMQTT = () => {
    if (!client) {
        client = mqtt.connect(brokerUrl, options);

        client.on("connect", () => {
            console.log("Connected to MQTT broker");
        });

        client.on("error", (err) => {
            console.error("MQTT connection error:", err);
            client?.end();
            client = null;
        });
    }
    return client;
}


export const sendFanCommand = (fanOn: boolean) => {
    if (!client) connectMQTT();
    client?.publish("fan/control", fanOn ? "on" : "off");
};