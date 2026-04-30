import crypto from "node:crypto";

function getRequiredEnv(name: string) {
    const value = process.env[name];

    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }

    return value;
}

export function getCloudinaryConfig() {
    return {
        cloudName: getRequiredEnv("CLOUDINARY_CLOUD_NAME"),
        apiKey: getRequiredEnv("CLOUDINARY_API_KEY"),
        apiSecret: getRequiredEnv("CLOUDINARY_API_SECRET"),
    };
}

export function signCloudinaryParams(params: Record<string, string>) {
    const { apiSecret } = getCloudinaryConfig();
    const toSign = Object.entries(params)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, value]) => `${key}=${value}`)
        .join("&");

    return crypto.createHash("sha1").update(`${toSign}${apiSecret}`).digest("hex");
}
