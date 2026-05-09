import crypto from "node:crypto";

function getRequiredEnv(name: string) {
    const value = process.env[name]?.trim();

    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }

    return value;
}

function parseCloudinaryUrl(url: string) {
    const match = url.match(/^cloudinary:\/\/([^:]+):([^@]+)@(.+)$/);

    if (!match) {
        throw new Error("CLOUDINARY_URL is not in a supported format. Use cloudinary://API_KEY:API_SECRET@CLOUD_NAME");
    }

    return {
        apiKey: match[1],
        apiSecret: match[2],
        cloudName: match[3],
    };
}

export function getCloudinaryConfig() {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();
    const apiKey = process.env.CLOUDINARY_API_KEY?.trim();
    const apiSecret = process.env.CLOUDINARY_API_SECRET?.trim();

    if (cloudName && apiKey && apiSecret) {
        return { cloudName, apiKey, apiSecret };
    }

    const cloudinaryUrl = process.env.CLOUDINARY_URL?.trim();
    if (cloudinaryUrl) {
        return parseCloudinaryUrl(cloudinaryUrl);
    }

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
