import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const ADMIN_COOKIE_NAME = "jasmine_admin_session";

function getRequiredEnv(name: string) {
    const value = process.env[name];

    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }

    return value;
}

export function getAdminCredentials() {
    return {
        username: getRequiredEnv("ADMIN_USERNAME"),
        password: getRequiredEnv("ADMIN_PASSWORD"),
        sessionSecret: getRequiredEnv("ADMIN_SESSION_SECRET"),
    };
}

export function isValidAdminCredentials(username: string, password: string) {
    const admin = getAdminCredentials();
    return username === admin.username && password === admin.password;
}

export function isAdminSessionValue(value: string | undefined) {
    if (!value) return false;
    return value === getAdminCredentials().sessionSecret;
}

export async function isAdminAuthenticated() {
    const store = await cookies();
    return isAdminSessionValue(store.get(ADMIN_COOKIE_NAME)?.value);
}

export async function requireAdmin() {
    const authenticated = await isAdminAuthenticated();

    if (!authenticated) {
        redirect("/admin/login");
    }
}
